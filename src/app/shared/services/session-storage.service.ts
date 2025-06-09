import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'; // Correct import for BehaviorSubject
import { EncryptStorage } from 'encrypt-storage';
import { environment } from '../../../environments/environment';

const esr = new EncryptStorage(environment.APPX_SESSION_KEY.toString(), {
  prefix: '@app',
  encAlgorithm: 'AES',
  stateManagementUse: true,
  storageType: 'sessionStorage',
});

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly USER_KEY = 'eud17';
  private currentUserSubject = new BehaviorSubject<any | null>(this.getCurrentUser());

  currentUser$ = this.currentUserSubject.asObservable(); // Observable to subscribe to current user changes

  setItem<T>(key: string, data: T): void {
    try {
      esr.setItem(key, data);
      if (key === this.USER_KEY) {
        this.currentUserSubject.next(data); // Emit new current user data
      }
    } catch (error) {
      console.error('Error While Saving:', error);
    }
  }

  getItem(key: string): string | null {
    try {
      const item = esr.getItem(key);
      return item !== undefined ? item : null; // Ensure this returns null if undefined
    } catch (error) {
      console.error('Error getting item:', error);
      return null;
    }
  }

  removeItem(key: string): void {
    try {
      esr.removeItem(key);
      if (key === this.USER_KEY) {
        this.currentUserSubject.next(null); // Emit null when user is removed
      }
    } catch (error) {
      console.error('Error removing item:', error);
    }
  }

  clearAll(): void {
    try {
      sessionStorage.clear(); // Clear all session storage data
      this.currentUserSubject.next(null); // Emit null when user data is removed
      console.log('All session storage data cleared.');
    } catch (error) {
      console.error('Error clearing session storage:', error);
    }
  }


  getCurrentUser(): any | null { // Change 'any' to your User interface
    const userDataString = this.getItem(this.USER_KEY);
    const userData = userDataString ? JSON.parse(userDataString) : null; // Parse string if not null
    return userData && userData.token ? userData : null; // Ensure userData is parsed correctly
  }

  changeUserDetails(user: any): void { // Change 'any' to your User interface
    this.setItem(this.USER_KEY, user);
    this.currentUserSubject.next(user);
  }

  logout(): void {
    try {
      esr.clear();
      this.changeUserDetails(null);
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  }

  updateUserDetails(partialUser: Partial<any>): void { // Change 'any' to your User interface
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...partialUser };
      this.changeUserDetails(updatedUser);
    }
  }

  getCurrentUserAsJson(): string {
    const currentUser = this.getCurrentUser();
    return currentUser ? JSON.stringify(currentUser) : '{}';
  }
}
