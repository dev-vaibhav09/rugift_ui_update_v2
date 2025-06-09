import {Component, HostListener, Input, OnInit} from '@angular/core';
import {NgClass, NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {User} from "../../../shared/interfaces/user";
import {WishlistService} from "../../../shared/services/wishlist.service";
import {SessionStorageService} from "../../../shared/services/session-storage.service";
import {BreadcrumbComponent} from "../../../pages/common/breadcrumb/breadcrumb.component";
import {DisableCopyPasteDirective} from "../../../shared/directives/disable-copy-paste.directive";
import {HeaderComponent} from "../../../pages/common/header/header.component";
import {MobileNumberValidatorDirective} from "../../../shared/directives/mobile_mumber_validator_directive";
import {NumberOnlyDirective} from "../../../shared/directives/number-only.directive";
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../../shared/services/api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    RouterLink,
    BreadcrumbComponent,
    DisableCopyPasteDirective,
    HeaderComponent,
    MobileNumberValidatorDirective,
    NumberOnlyDirective,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  signInForm!: UntypedFormGroup;
  showOtpField = false;
  verified = false;
  ref_no="";
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
  ) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      otp: ['', Validators.required],
    });

    const currentUser = this.sessionStorageService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['/checkout']);
    }
  }

  generate() {
    const phoneNumber = this.signInForm.get('phoneNumber')?.value;

    this.apiService.post('auth/generate_register_otp', { "mobile_no": phoneNumber ,"mode":"login"}).subscribe({
      next: (res) => {
        this.ref_no = res.data.ref_id
        this.showOtpField = true;
      },
      error: (error) => {
        this.toastr.error(error.error.error);
      },
    });
  }

  onResend() {
    this.generate();
  }

  onVerifyAgain() {
    const phoneNumber = this.signInForm.get('phoneNumber')?.value;
    const otp = this.signInForm.get('otp')?.value;
    const ref_no =  this.ref_no
    this.apiService.post('auth/verify_otp', { 'mobile_no': phoneNumber, 'otp': otp ,'ref_id':ref_no,}).subscribe({
      next: (res: any) => {
        this.sessionStorageService.changeUserDetails(res.data)
        if (res.success) {
          this.verified = true;
          this.router.navigate(['admin/dashboard']);
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(error.error?.message || 'OTP verification failed');
      },
    });
  }

}
