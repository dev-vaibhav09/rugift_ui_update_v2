import {HttpInterceptorFn, HttpErrorResponse} from '@angular/common/http';
import {inject} from "@angular/core";
import {Router} from "@angular/router";
import {SessionStorageService} from "../services/session-storage.service";
import {User} from "../interfaces/user";
import {catchError, throwError} from "rxjs";


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionStorageService: SessionStorageService = inject(SessionStorageService);
  const router: Router = inject(Router);
  const user: User | null = sessionStorageService.getCurrentUser();

  if (user && user.token) {
    const authReq = req.clone({ setHeaders: { Authorization: `Bearer ${user.token}` } });
    return next(authReq).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Clear the user session and redirect to the login page
          sessionStorageService.clearAll();
          router.navigate(['/sign-in']);
        }
        return throwError(() => error); // Rethrow the error to be handled elsewhere if needed
      })
    );
  } else {
    return next(req).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          // Handle unauthenticated access if required
          router.navigate(['/sign-in']);
        }
        return throwError(() => error);
      })
    );
  }
};
