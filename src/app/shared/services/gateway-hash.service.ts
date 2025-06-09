import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

// Example config key (replace with your actual key)
const APPX_INTERFACE_KEY = 'rjfzAN_cVK6eWo9UqQlLirE7XCTvlyb-sJMA8e7BaNQ';

@Injectable({
  providedIn: 'root',
})
export class GatewayHashService {
  constructor() {}

  private generatePayloadToHash(data: { [key: string]: any }): string {
    // Sort keys to ensure consistent order with backend
    const sortedKeys = Object.keys(data).sort();

    return sortedKeys
      .map((key) => {
        const value = data[key];
        if (Array.isArray(value)) {
          // Convert array to a string representation (e.g., JSON.stringify)
          return `${key}=${JSON.stringify(value)}`;
        }
        // Handle nulls and ensure consistent string conversion
        return `${key}=${value !== null ? String(value) : ''}`;
      })
      .join('|');
  }

  public generateGatewayHash(data: { [key: string]: any }): string | null {
    try {
      const dataCopy = { ...data };
      delete dataCopy['hashed_data']; // Ensure consistent logic with backend

      // Generate the payload to hash
      const payloadToHash = this.generatePayloadToHash(dataCopy);
      const fullPayload = `${payloadToHash}|${APPX_INTERFACE_KEY}`;

      // Generate SHA-256 hash in hex format (consistent with Python)
      const hashResult = CryptoJS.SHA256(fullPayload).toString(CryptoJS.enc.Hex);



      return hashResult;
    } catch (error) {
      return null;
    }
  }
}
