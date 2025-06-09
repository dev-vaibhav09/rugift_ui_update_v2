import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, switchMap} from 'rxjs';
import {inject} from '@angular/core';
import {SessionStorageService} from '../services/session-storage.service';
import {RucardsRSAHelperService} from '../services/rucards-rsaHelper.service';
import {AesHelperService} from '../services/rucards-res-decoder.service';

export const requestResponseInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const sessionStorage: SessionStorageService = inject(SessionStorageService);
  const rsaHelper: RucardsRSAHelperService = inject(RucardsRSAHelperService);
  const aesHelper: AesHelperService = inject(AesHelperService);

  // Encrypt request payload before sending
  // if (req.method === 'POST') {
  //   const encryptedText = rsaHelper.encryptText(JSON.stringify(req.body));
  //   const payload = {payload: encryptedText};
  //   encryptedReq = req.clone({body: payload});
  //
  // } else if (req.method === 'GET') {
  //   const encryptedText = rsaHelper.encryptText(JSON.stringify(req.params));
  //   encryptedReq = req.clone({setParams: {payload: encryptedText}});
  // }

  return next(req).pipe(
    switchMap(async (event: HttpEvent<any>) => {

      if (event instanceof HttpResponse && event.body) {
        const encryptedRes = event.body;

        if (encryptedRes?.data) {
          try {
            const decryptedData = await aesHelper.decrypt(encryptedRes.data);
            const newBody = {
              ...event.body,
              data: JSON.parse(decryptedData)
            };
            return event.clone({body: newBody});
          } catch (error) {
            // console.error('Decryption failed');
          }
        }
      }
      return event;
    })
  );
};
