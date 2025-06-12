import {Component, OnInit} from '@angular/core';
import {User} from "../../shared/interfaces/user";
import {WishlistService} from "../../shared/services/wishlist.service";
import {AuthService} from "../../shared/services/auth.service";
import {SessionStorageService} from "../../shared/services/session-storage.service";
import {Router} from "@angular/router";
import {ApiService} from "../../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {GatewayHashService} from "../../shared/services/gateway-hash.service";
import {DecimalPipe, NgForOf, NgIf, PercentPipe} from "@angular/common";
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {HeaderComponent} from "../common/header/header.component";
import {FooterComponent} from "../common/footer/footer.component";
import {ProgressSpinnerComponent} from "../progress-spinner/progress-spinner.component";

interface Customer {
  first_name: string;
  last_name: string;
  mobile: string;
  email: string;
}

interface OrderData {
  product_title: string;
  short_description: string;
  order_amount: string;
  biller_id: string;
  device_unique_id: string | null;
  client_ip: string;
  source_device: string;
  customer: Customer;
  hashed_data: string;
}

interface CartItem {
  image_url: string,
  brand_name: string;
  selectedDenomination: number;
  outward_discount:string;
  no_of_card:number;
  subtotal: number;
  brand_code:string;
  is_discount_applicable:boolean;
}


@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    NgForOf,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    NgIf,
    ProgressSpinnerComponent,
    PercentPipe,
    DecimalPipe
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  user: User | null = null;
  carts: CartItem[] = [];
  payload:CartItem[] = [];
  actualValue = 0;
  discountedAmount = 0;
  totaldiscountedAmount = 0;
  totalWishlistPrice = 0;
  link:string = '/'
  is_loading:boolean=false;
  isButtonDisabled : boolean =false;

  constructor(
    private wishlistService: WishlistService,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private apiService: ApiService,
    private toastr: ToastrService,
  ) {  }

  ngOnInit(): void {
    this.cartProducts(); // Fetch cart products on initialization
    this.getTotalWishlist();

    this.user = this.sessionStorageService.getCurrentUser();
    if (this.user) {
      this.router.navigateByUrl('/checkout');
    } else {
      // If the user is not authenticated, redirect to the sign-up page
      this.router.navigateByUrl('/sign-up');
    }
  }

  // Fetch the products in the cart (wishlist)
  cartProducts() {
    this.carts = this.wishlistService.getWishlist();
    this.carts.forEach((item: any) => {

      if (item.is_discount_applicable){
        const discount = (item.outward_discount / 100) * item.subtotal; // Discounted amount for the item
        this.discountedAmount += item.subtotal - discount;
      }else{
        this.discountedAmount += item.subtotal;
      }

      this.payload.push({
        "image_url": item.image_url,
        "brand_code": item.brand_code,
        "no_of_card": item.no_of_card,
        "subtotal": item.subtotal,
        "selectedDenomination": item.selectedDenomination, brand_name: "", outward_discount: "",
        "is_discount_applicable":item.is_discount_applicable
      })
    });

  }

  getTotalWishlist() {
    const price = this.wishlistService.getTotalPrice();
    this.actualValue = price !== undefined && price !== null ? price : 0;
    this.totaldiscountedAmount = this.actualValue - this.discountedAmount;
    this.totaldiscountedAmount = parseFloat(this.totaldiscountedAmount.toFixed(2));
    this.totalWishlistPrice = this.discountedAmount
  }

  placeOrder() {
    this.is_loading=true
    const cp_payload = this.payload
    cp_payload.forEach((item: any) => {
      delete item.brand_name;
      delete item.outward_discount;
      delete item.subtotal;
      delete item.is_discount_applicable
    })
    this.apiService.post('cart/cart_checkout', { payload: cp_payload}).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.link = res.data.link; // Use 'payment_link' from backend response
          // Redirect to the payment link
          window.location.href = this.link;
          this.is_loading = false
        } else {
          this.is_loading = false
        }
      },
      error: (error) => {
        this.toastr.error(error.error.error);
        this.is_loading = false
      }
    });
  }
}
