import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {provideToastr, ToastrModule} from "ngx-toastr";
import {authInterceptor} from "./shared/interceptors/auth.interceptor";
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {SpinnerComponent} from "./shared/components/spinner/spinner.component";
import {requestResponseInterceptor} from "./shared/interceptors/requestResponseInterceptor";


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
      closeButton: true,
      timeOut: 5000,
      progressBar: true,
      progressAnimation: "decreasing",
      maxOpened: 2,
      toastClass: 'toast-upper',
      autoDismiss: true
    }),
    SpinnerComponent,
  ],
  providers: [
    provideAnimationsAsync(),
    provideAnimations(),
    provideToastr(),
    provideHttpClient(
      withInterceptors([requestResponseInterceptor, authInterceptor]),
    ),

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
