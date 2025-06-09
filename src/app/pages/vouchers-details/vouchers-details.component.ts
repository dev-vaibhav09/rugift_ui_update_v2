import {AfterContentInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {NgxSliderModule, Options} from "@angular-slider/ngx-slider";
import {WishlistService} from "../../shared/services/wishlist.service";
import {SanitizeService} from "../../shared/services/sanitize.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../common/footer/footer.component";
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {HeaderComponent} from "../common/header/header.component";
import {FormsModule} from "@angular/forms";
import {ProgressSpinnerComponent} from "../progress-spinner/progress-spinner.component";
import {NgScrollbar} from "ngx-scrollbar";

export interface ItemDetails {
  selectedDenomination: number;
  id: number;
  brand_code: string;
  brand_name: string;
  brand_type: string;
  category: string;
  denomination_list: string;
  description: string;
  image_url: string;
  important_instruction: any;
  redeem_steps: any;
  terms_and_conditions: string;
  outward_discount  :string;
  max_price:string;
  min_price:string;
  is_discount_applicable:boolean;

}


@Component({
  selector: 'app-vouchers-details',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf,
    FooterComponent,
    BreadcrumbComponent,
    HeaderComponent,
    NgxSliderModule,
    FormsModule,
    CommonModule,
    ProgressSpinnerComponent,
    NgScrollbar
  ],
  templateUrl: './vouchers-details.component.html',
  styleUrl: './vouchers-details.component.scss'
})
export class VouchersDetailsComponent  implements AfterContentInit {
  selectedCardValue: number = 0;
  totalPay: number = 0;
  sliderValue: number = 100;

  options: Options = {
    floor: 0,
    ceil: 10000,
    step: 1,
    showSelectionBar: true,
  };

  matchingProducts: ItemDetails[] = [];
  brandCode?: string;
  category?: string;
  denominationArray: string[] = [];
  error_message= "";
  is_loading: boolean = false;
  inputValue : number = 1;
  valueNotInRange:string="";
  valueVerify:boolean=true;

  constructor(
    private wishlistService: WishlistService,
    private sanitizer: SanitizeService,
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngAfterContentInit(): void {
    this.route.params.subscribe(params => {
      this.brandCode = params['brand_code'];
      this.get_brand_details(); // Move this call here to ensure brand details are fetched after getting the brandCode
    });

  }

  get_brand_details() {
    this.is_loading=true;
    this.apiService.post('vd/brands_details', { 'brand_code': this.brandCode}).subscribe({
      next: (res: any) => {
        if (res.success) { // Check if the response indicates success
          this.matchingProducts = res.data;
          this.loadMatchingProducts();
          this.is_loading = false;
        }
      },
      error: (error: any) => {
        setTimeout(()=>{
          this.error_message = error.error.error;
          this.is_loading = false;
        },10000)
      },
    });
  }

  loadMatchingProducts() {
    if (this.matchingProducts.length > 0) {
      const firstProduct = this.matchingProducts[0];
      if (firstProduct?.denomination_list) { // Use optional chaining to avoid errors
        this.denominationArray = firstProduct.denomination_list.split(',')
          .map((item: string) => item.trim());
        this.options.floor = Number(firstProduct.min_price);
        this.options.ceil = Number(firstProduct.max_price);
        this.inputValue = Number(firstProduct.min_price);
        this.selectCardValue(String(this.options.floor))
        if (firstProduct.brand_type.toLowerCase() === 'fixed'){
          this.selectCardValue(this.denominationArray[0]);
        }else{
          this.sliderValue = this.inputValue
          this.selectCardValue(String(this.inputValue))

        }
        this.cdr.detectChanges();
      } else {
        console.warn('Denomination list not found in the first product.');
      }
    } else {
      console.warn('No matching products found.');
    }
  }

  selectCardValue(selectedValue: string) {
    this.totalPay = Number(selectedValue) ;
  }

  toggleWishlist(item: ItemDetails) {
    // Ensure the selected denomination value is set before adding to the wishlist
    if (this.totalPay <= 0) {
      this.toastr.error('Please select a valid denomination.');
      return;
    }
    item.selectedDenomination = this.totalPay;

    this.wishlistService.updateWishlist(item, this.totalPay);

    this.router.navigate(['cart']);
  }


  updatedValue(selectedValue: number) {
    this.totalPay = Number(selectedValue);
    this.inputValue = selectedValue;
    this.cdr.detectChanges();  // Ensure view updates
  }

  protected readonly Number = Number;
  protected readonly Object = Object;

  setCustomAmount(item: ItemDetails) {
    if (this.inputValue >= +item.min_price && this.inputValue <= +item.max_price) {
      this.sliderValue = this.inputValue;
      this.valueNotInRange = '';
      this.valueVerify = true;
    } else {
      this.valueVerify = false;
      this.valueNotInRange = `Please enter a value between ${item.min_price} and ${item.max_price}.`;
    }
  }

  renderHtml(terms_and_conditions: string) {
    terms_and_conditions = terms_and_conditions.replace(/\r?\n/g, '<br>');
    return this.sanitizer.sanitizeHtml(terms_and_conditions);
  }

  protected readonly toString = toString;
  protected readonly String = String;
}
