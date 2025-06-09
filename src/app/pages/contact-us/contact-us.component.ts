import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { BreadcrumbComponent } from "../common/breadcrumb/breadcrumb.component";
import { HeaderComponent } from "../common/header/header.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {NgIf} from "@angular/common";
import {ApiService} from "../../shared/services/api.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [
    RouterLink,
    BreadcrumbComponent,
    HeaderComponent,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'] // Fixed this
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]],
      terms: [false, Validators.requiredTrue],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.getRawValue();
      this.apiService.post(`contact/contact_us_email`,formData).subscribe({
        next: (res: any) => {
          this.toastr.success(res.message);
          this.contactForm.reset();
        },
        error: (error: any) => {
          this.toastr.error(error.error?.message || 'OTP verification failed');
        },
      });

    } else {
      console.error('Form is invalid:', this.contactForm.errors);
    }
  }
}
