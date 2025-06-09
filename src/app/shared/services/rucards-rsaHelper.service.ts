import {Injectable} from '@angular/core';
import * as forge from 'node-forge';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RucardsRSAHelperService {
  private publicKey: forge.pki.rsa.PublicKey | null = null;

  constructor() {
    this.setPublicKey(environment.APP_PUBLIC_KEY)
  }

  private setPublicKey(publicKeyPem: string) {
    this.publicKey = forge.pki.publicKeyFromPem(publicKeyPem);
  }

  encryptText(data: string | object): string {
    if (!this.publicKey) {
      throw new Error("Public key not set. Use setPublicKey() first.");
    }

    const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
    const encrypted = this.publicKey.encrypt(dataString, 'RSA-OAEP', {
      md: forge.md.sha256.create(),
      mgf1: {
        md: forge.md.sha256.create()
      }
    });
    // Base64 encode the encrypted data
    return forge.util.encode64(encrypted);
  }
}


