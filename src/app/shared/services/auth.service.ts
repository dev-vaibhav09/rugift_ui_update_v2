import {Injectable} from '@angular/core';
import {User} from "../interfaces/user";
import {SessionStorageService} from "./session-storage.service";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    user : User|null= null;

    constructor(private sessionStorage: SessionStorageService) {
      this.sessionStorage.currentUser$.subscribe(user => {
        if (user) {
          this.user = user;
        }
      });
    }

    isAuthenticated(): boolean {
      return !!(this.user && this.user.token);
    }

    hasRole(role: string): boolean {
      return !!(this.user && this.user.role.includes(role));
    }

}
