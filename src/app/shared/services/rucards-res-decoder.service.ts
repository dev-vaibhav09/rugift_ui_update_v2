import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AesHelperService {
  private static HEX_KEY = '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef'; // 256-bit key (hex)
  private static HEX_IV = 'abcdef1234567890abcdef1234567890'; // 128-bit IV (hex)

  private static hexToBytes(hex: string): Uint8Array {
    return new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)));
  }

  private static base64Encode(data: Uint8Array): string {
    return btoa(String.fromCharCode(...data));
  }

  private static base64Decode(base64: string): Uint8Array {
    return new Uint8Array([...atob(base64)].map(char => char.charCodeAt(0)));
  }

  async encrypt(data: string): Promise<string> {
    if (!data) throw new Error('Data cannot be empty or null');

    try {
      const key = await crypto.subtle.importKey(
        'raw',
        AesHelperService.hexToBytes(AesHelperService.HEX_KEY),
        { name: 'AES-GCM' },
        false,
        ['encrypt']
      );
      const iv = AesHelperService.hexToBytes(AesHelperService.HEX_IV);
      const encodedData = new TextEncoder().encode(data);

      const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encodedData);
      return AesHelperService.base64Encode(new Uint8Array(encrypted));
    } catch (error) {
      throw new Error(`Encryption error: ${error}`);
    }
  }

  async decrypt(encryptedData: string): Promise<string> {
    if (!encryptedData) throw new Error('Encrypted data cannot be empty or null');

    try {
      const key = await crypto.subtle.importKey(
        'raw',
        AesHelperService.hexToBytes(AesHelperService.HEX_KEY),
        { name: 'AES-GCM' },
        false,
        ['decrypt']
      );
      const iv = AesHelperService.hexToBytes(AesHelperService.HEX_IV);
      const decodedData = AesHelperService.base64Decode(encryptedData);

      const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, decodedData);
      return new TextDecoder().decode(decrypted);
    } catch (error) {
      throw new Error(`Decryption error: ${error}`);
    }
  }
}
