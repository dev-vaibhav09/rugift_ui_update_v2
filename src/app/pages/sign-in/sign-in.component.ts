import { Component, Inject, OnInit } from '@angular/core';
import {ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {ApiService} from "../../shared/services/api.service";
import {SessionStorageService} from "../../shared/services/session-storage.service";
import {NgClass, NgIf} from "@angular/common";
import {FooterComponent} from "../common/footer/footer.component";
import {HeaderComponent} from "../common/header/header.component";
import {NumberOnlyDirective} from "../../shared/directives/number-only.directive";
import {MobileNumberValidatorDirective} from "../../shared/directives/mobile_mumber_validator_directive";
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {DisableCopyPasteDirective} from "../../shared/directives/disable-copy-paste.directive";
import {User} from "../../shared/interfaces/user";
import {RucardsRSAHelperService} from "../../shared/services/rucards-rsaHelper.service";
import {json} from "node:stream/consumers";


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    FooterComponent,
    HeaderComponent,
    NgIf,
    MobileNumberValidatorDirective,
    BreadcrumbComponent,
    DisableCopyPasteDirective,
    NumberOnlyDirective,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent implements OnInit {
  signInForm!: UntypedFormGroup;
  showOtpField = false;
  verified = false;
  ref_no="";
  user : User | null = null;
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private sessionStorageService: SessionStorageService,
    private rsaHelper : RucardsRSAHelperService
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
    this.make_resp()
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
        this.sessionStorageService.currentUser$.subscribe(value => this.user = value);
        if (res.success) {
          this.verified = true;
          this.router.navigate(['/checkout']);
        } else {
        }
      },
      error: (error: any) => {
        this.toastr.error(error.error?.message || 'OTP verification failed');
      },
    });
  }

  make_resp() {
    const data = [{
        "BrandCode": "SIGREEmtlZTwTZicxG7vOa",
        "BrandName": "SIGREE",
        "Brandtype": "Fixed",
        "Category": "Food & Beverages",
        "DenominationList": "250,500,1000,1500,2000,2500,3000,5000",
        "Description": "Experience the lost art of slow and smoked cooking at Sigree. This metropolitan restaurant chain is bound to refresh your taste buds with fresh flavors. Experience the flavors of Sigree with great offers using Gift Cards and Gift Vouchers.",
        "Discount": "12.00",
        "Images": "https://at.valuedesign.co.in/media/uploads/products/Sigree.png",
        "ImportantInstruction": {
          "0": " ",
          "1": "Gift Vouchers CANNOT be used Online.",
          "2": "Multiple Gift Vouchers CAN be used in one bill.",
          "3": "Gift Vouchers CANNOT be used for Meal Combos.",
          "4": "Gift Vouchers are ACCEPTED at all Listed Outlets."
        },
        "RedeemSteps": [
          {
            "image": "https://at.valuedesign.co.in/media/uploads/products/SIGREE/1.png",
            "title": "Visit the restaurant as per your Gift Voucher!! Inform the cashier about the Gift Voucher before ordering food."
          },
          {
            "image": "https://at.valuedesign.co.in/media/uploads/products/SIGREE/2.png",
            "title": "Order food & enjoy your meal!"
          },
          {
            "image": null,
            "title": "Provide the Gift Voucher to the cashier at the time of billing & pay remaining amount by card or cash if any"
          }
        ],
        "StockAvailable": "",
        "TnC": "1.This is a Speciality Restaurants (Mainland China, Machaan, Sigree, Oh! Calcutta and Sweet Bengal) Insta Gift Voucher (GV) / Gift Card (GC) and would be accepted at listed outlets. (For Outlet List, please visit www.gyftr.com ) <br/>2.The person who has the Speciality Restaurants GV / GC Code is deemed to be the beneficiary. <br/>3.Speciality Restaurants GV / GC cannot be clubbed with any other offer or voucher. <br/>4.Do inform the cashier that you plan to use the GV / GC for making payments before billing. <br/>5.Only the listed Speciality Restaurants outlets at its sole discretion accept the GV / GC. Speciality Restaurants may add or remove an outlet without giving any prior notice. <br/>6.More than one GV / GC can be used in one bill. <br/>7.This is a ONE time use GV / GC. <br/>8.No Credit note / Refund for the unused amount of the GV / GC will be given. <br/>9.Speciality Restaurants GV / GC CANNOT be revalidated once expired. <br/>10.Speciality Restaurants GV / GC is valid only on Food & Non-Alcoholic beverages <br/>11.Speciality Restaurants GV / GC cannot be redeemed on specific block out dates. Speciality Restaurants may add or delete any date on its sole discretion. <br/>12.Any dispute related to the GV / GC should be referred to the issuing company and the decision of the issuing company shall be final. <br/>13.Speciality Restaurants makes full efforts to accept Insta Gift Vouchers (GV) / Gift Card (GC), but on account of any technical / administrative reasons an outlet may refuse to accept the same. <br/>14.If an Insta Gift Voucher (GV) /Gift Card (GC) gets blocked on account of technical issue, it would get enabled in 72 hours. <br/>15.For any queries / issues related to GV / GC, raise a request at www.gvhelpdesk.com",
        "maxPrice": "0",
        "minPrice": "0"
      },
      {
        "BrandCode":
        "SIGREEmtlZTwTZicxG7vOa",
        "BrandName":
        "SIGREE",
        "Brandtype":
        "Fixed",
        "Category":
        "Food & Beverages",
        "DenominationList":
        "250,500,1000,1500,2000,2500,3000,5000",
        "Description":
        "Experience the lost art of slow and smoked cooking at Sigree. This metropolitan restaurant chain is bound to refresh your taste buds with fresh flavors. Experience the flavors of Sigree with great offers using Gift Cards and Gift Vouchers.",
        "Discount":
        "12.00",
        "Images":
        "https://at.valuedesign.co.in/media/uploads/products/Sigree.png",
        "ImportantInstruction": {
          "0": " ",
          "1": "Gift Vouchers CANNOT be used Online.",
          "2": "Multiple Gift Vouchers CAN be used in one bill.",
          "3": "Gift Vouchers CANNOT be used for Meal Combos.",
          "4": "Gift Vouchers are ACCEPTED at all Listed Outlets."
        },
        "RedeemSteps": [
          {
            "image":
            "https://at.valuedesign.co.in/media/uploads/products/SIGREE/1.png",
            "title":
            "Visit the restaurant as per your Gift Voucher!! Inform the cashier about the Gift Voucher before ordering food."
          },
          {
            "image": "https://at.valuedesign.co.in/media/uploads/products/SIGREE/2.png",
            "title": "Order food & enjoy your meal!"
          },
          {
            "image":
            null,
            "title":
            "Provide the Gift Voucher to the cashier at the time of billing & pay remaining amount by card or cash if any"
          }
        ],
        "StockAvailable":
        "",
        "TnC":
        "1.This is a Speciality Restaurants (Mainland China, Machaan, Sigree, Oh! Calcutta and Sweet Bengal) Insta Gift Voucher (GV) / Gift Card (GC) and would be accepted at listed outlets. (For Outlet List, please visit www.gyftr.com ) <br/>2.The person who has the Speciality Restaurants GV / GC Code is deemed to be the beneficiary. <br/>3.Speciality Restaurants GV / GC cannot be clubbed with any other offer or voucher. <br/>4.Do inform the cashier that you plan to use the GV / GC for making payments before billing. <br/>5.Only the listed Speciality Restaurants outlets at its sole discretion accept the GV / GC. Speciality Restaurants may add or remove an outlet without giving any prior notice. <br/>6.More than one GV / GC can be used in one bill. <br/>7.This is a ONE time use GV / GC. <br/>8.No Credit note / Refund for the unused amount of the GV / GC will be given. <br/>9.Speciality Restaurants GV / GC CANNOT be revalidated once expired. <br/>10.Speciality Restaurants GV / GC is valid only on Food & Non-Alcoholic beverages <br/>11.Speciality Restaurants GV / GC cannot be redeemed on specific block out dates. Speciality Restaurants may add or delete any date on its sole discretion. <br/>12.Any dispute related to the GV / GC should be referred to the issuing company and the decision of the issuing company shall be final. <br/>13.Speciality Restaurants makes full efforts to accept Insta Gift Vouchers (GV) / Gift Card (GC), but on account of any technical / administrative reasons an outlet may refuse to accept the same. <br/>14.If an Insta Gift Voucher (GV) /Gift Card (GC) gets blocked on account of technical issue, it would get enabled in 72 hours. <br/>15.For any queries / issues related to GV / GC, raise a request at www.gvhelpdesk.com",
        "maxPrice":
        "0",
        "minPrice":
        "0"
      }
  ]
    const encrypt_data = this.rsaHelper.encryptText(btoa(data.toString()))
    console.log('data is encrypted',encrypt_data)
  }

}
