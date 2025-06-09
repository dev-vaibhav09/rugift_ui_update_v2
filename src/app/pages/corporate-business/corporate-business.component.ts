import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, UntypedFormGroup, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-corporate-business',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    FormsModule
  ],
  templateUrl: './corporate-business.component.html',
  styleUrl: './corporate-business.component.scss'
})
export class CorporateBusinessComponent  implements OnInit {
  selectedTab: 'registration' | 'api' = 'registration';
  registrationForm!: FormGroup;
  apiKey = '';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initRegistrationForm();
  }

  /**
   * Initialize the registration form with validators
   */
  private initRegistrationForm(): void {
    this.registrationForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      name: ['', Validators.required],
      designation: ['', Validators.required],
      brand: ['', Validators.required],
      denomination: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }


  /**
   * Switch between registration and login tabs
   */
  switchTab(tab: 'registration' | 'api'): void {
    this.selectedTab = tab;
  }

  /**
   * Handle registration form submission
   */
  onSubmit(): void {
    if (this.registrationForm.valid) {
      console.log('Registration form submitted:', this.registrationForm.value);
      // Implement your registration logic here
      // For example:
      // this.authService.register(this.registrationForm.value).subscribe(
      //   response => {
      //     console.log('Registration successful', response);
      //     // Handle successful registration
      //   },
      //   error => {
      //     console.error('Registration failed', error);
      //     // Handle error
      //   }
      // );
    } else {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.registrationForm.controls).forEach(key => {
        const control = this.registrationForm.get(key);
        control?.markAsTouched();
      });
    }
  }

}
