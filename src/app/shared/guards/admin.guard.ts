import {CanActivateFn, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";
import {inject} from "@angular/core";
import {Roles} from "../enums/roles";

export const adminGuard: CanActivateFn = () => {
  const authService:AuthService = inject(AuthService)
  const router: Router = inject(Router)
  if (authService.isAuthenticated() && authService.hasRole(Roles.admin)) {
    return true
  }
  router.navigate(['auth/login']);
  return false;
};
