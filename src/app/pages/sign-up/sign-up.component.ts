import {Component, NgZone, OnInit} from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import { ToastrService } from "ngx-toastr";
import {User} from "../../shared/interfaces/user";
import {ApiService} from "../../shared/services/api.service";
import {SessionStorageService} from "../../shared/services/session-storage.service";
import {NgIf} from "@angular/common";
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {HeaderComponent} from "../common/header/header.component";
import {FooterComponent} from "../common/footer/footer.component";
import {MobileNumberValidatorDirective} from "../../shared/directives/mobile_mumber_validator_directive";
import {DisableCopyPasteDirective} from "../../shared/directives/disable-copy-paste.directive";
import {NumberOnlyDirective} from "../../shared/directives/number-only.directive";
import {AlphabeticInputDirective} from "../../shared/directives/alphabetic-input.directive";


@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    ReactiveFormsModule,
    MobileNumberValidatorDirective,
    DisableCopyPasteDirective,
    NumberOnlyDirective,
    AlphabeticInputDirective,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  signUpForm!: UntypedFormGroup;
  showOtpField = false;
  verified = false;
  user : User | null = null;
  ref_no="";

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private ngZone: NgZone

  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile_no: ['', Validators.required],
      otp: ['', Validators.required],
      agree: [false, Validators.requiredTrue]
    });

    const currentUser = this.sessionStorageService.getCurrentUser();
    if (currentUser) {
      this.router.navigate(['/checkout']);
    }
  }

  sign_up(): void {
    if (this.signUpForm.valid) {
      const data = {
        firstname: this.signUpForm.value.firstname,
        lastname: this.signUpForm.value.lastname,
        email: this.signUpForm.value.email,
        mobile_no: this.signUpForm.value.mobile_no,
      };

    }
  }

  onSendOtp(): void {
    const phoneNumber = this.signUpForm.get('mobile_no')?.value;

    this.apiService.post('auth/generate_register_otp', { "mobile_no": phoneNumber, "mode":"register" }).subscribe({
      next: (res) => {
        this.ref_no = res.data.ref_id
        this.showOtpField = true;
      },
      error: (error) => {
        this.toastr.error(error.error.error || 'OTP generation failed');
      },
    });
  }

  onResend(): void {
    this.onSendOtp();
  }

  onVerifyOtp(): void {
    const phoneNumber = this.signUpForm.get('mobile_no')?.value; // Use correct form control name
    const otp = this.signUpForm.get('otp')?.value;
    const payload = {
      "mobile_no": phoneNumber,
      "otp": otp,
      "ref_id": this.ref_no,
      "firstname": this.signUpForm.get('firstname')?.value,
      "lastname": this.signUpForm.get('lastname')?.value,
      "email": this.signUpForm.get('email')?.value,
    }
    this.apiService.post('auth/verify_register_otp', {payload}).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.sessionStorageService.changeUserDetails(res.data)
          this.sessionStorageService.currentUser$.subscribe(value => this.user = value);
          this.verified = true; // Set verified to true only on success
          this.ngZone.run(() => {
            this.router.navigate(['/checkout']);
          });
        } else {
        }
      },
      error: (error) => {
        this.toastr.error(error.error?.message || 'OTP verification failed');
      },
    });
  }

}
