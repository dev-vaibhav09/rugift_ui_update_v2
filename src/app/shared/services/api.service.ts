import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Accept: 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {
  }

  get(url: string, type = 'get', params: Object = {}): Observable<any> {
    const path = this.getPath(params);
    if (type === 'get') {
      return this.http.get<any>(`${environment.api_url}${url}` + (path ? '?' + path : ''), this.setHeaders());
    } else {
      return this.http.delete<any>(`${environment.api_url}${url}` + (path ? '?' + path : ''), this.setHeaders());
    }
  }

  post(url: string, data: any, type = 'post', params: Object = {}): Observable<any> {
    const path = this.getPath(params);
    if (type === 'post') {
      return this.http.post<any>(`${environment.api_url}${url}` + (path ? '?' + path : ''), data, this.setHeaders());
    } else {
      return this.http.put<any>(`${environment.api_url}${url}` + (path ? '?' + path : ''), data, this.setHeaders());
    }
  }

  post_multipart(url: string, data: FormData, params: Object = {}) {
    const path = this.getPath(params);
    return this.http.post<any>(`${environment.api_url}${url}` + (path ? '?' + path : ''), data, this.setHeaders_multipart());
  }

  put_multipart(url: string, data: FormData, params: Object = {}) {
    const path = this.getPath(params);
    return this.http.put<any>(`${environment.api_url}${url}` + (path ? '?' + path : ''), data, this.setHeaders_multipart());
  }

  setHeaders_multipart() {
    if (httpOptions.headers.get('Content-Type')) {
      httpOptions.headers = httpOptions.headers.delete('Content-Type');
    }
    return httpOptions;
  }


  download(url: string, params: Object = {}, download_format: string = 'pdf') {
    const path = this.getPath(params);
    return this.http.get(`${environment.api_url}${url}` + (path ? '?' + path : ''), {
      headers: {
        Accept: `application/${download_format}`,
        // key: environment.key
      },
      responseType: 'arraybuffer'
    });
  }

  preview(url: string, type = 'get', params: Object = {}, options: { responseType: 'text' | 'json' } = { responseType: 'json' }): Observable<any> {
    const path = this.getPath(params);
    const httpOptions = {
      ...this.setHeaders(),
      responseType: options.responseType as 'text'  // Explicitly cast responseType
    };

    if (type === 'get') {
      return this.http.get(`${environment.api_url}${url}` + (path ? '?' + path : ''), httpOptions);
    } else {
      return this.http.delete(`${environment.api_url}${url}` + (path ? '?' + path : ''), httpOptions);
    }
  }

  private getPath(params: Object = {}): string {
    return Object.keys(params).map(function (k) {
      // @ts-ignore
      return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    }).join('&');
  }

  private setHeaders(): { headers: HttpHeaders } {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    return {headers};
  }


}
