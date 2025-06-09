import {Component, OnInit} from '@angular/core';
import {Options} from "@angular-slider/ngx-slider";
import {WishlistService} from "../../shared/services/wishlist.service";
import {SanitizeService} from "../../shared/services/sanitize.service";
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {FooterComponent} from "../common/footer/footer.component";
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {HeaderComponent} from "../common/header/header.component";
import {AuthService} from "../../shared/services/auth.service";


interface CartItem {
  id: number;
  brand_code: string;
  brand_name: string;
  denomination_list: string;
  image_url: string;
  brand_type: string;
  selectedDenomination?: number;
  denominationValues: any;
  no_of_card: number;  // Quantity of cards
  subtotal: number;  // Subtotal for this item
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    FooterComponent,
    BreadcrumbComponent,
    HeaderComponent,
    NgIf
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  carts: CartItem[] = [];
  total: number = 0;
  totalWishlistPrice: number = 0;
  quantity : number = 1;
  wishlist: any[] = [];
  valueMap: { [key: string]: number } = {}; // To hold the slider values for each BrandCode
  optionsMap: { [key: string]: Options } = {}; // Slider options for each BrandCode
  isButtonDisabled:boolean= false;

  constructor(
    private wishlistService: WishlistService,
    private sanitizer: SanitizeService,
    private authService: AuthService,
    private router: Router,
    // private spinner: spi
  ) {
  }

  ngOnInit() {
    this.wishlist = this.wishlistService.getWishlist();
    // Subscribe to the totalPriceChanged event to update the total price dynamically
    this.wishlistService.totalPriceChanged.subscribe((price: number) => {
      this.totalWishlistPrice = price;
    });

    // Initialize the total price at the start
    this.totalWishlistPrice = this.wishlistService.getTotalPrice();

    this.cartProducts();
    this.calculateTotal()
  }

  cartProducts() {
    const cartData = this.wishlistService.getWishlist();  // Get data from wishlist service
    this.carts =  cartData.map((item: any, index: number) => {
      // Parse DenominationList into an array of numbers
      const denominationValues = item.denomination_list.split(',');
      // Handle the quantity of cards and calculate the subtotal
      const no_of_card = 1;
      const selectedDenomination = item.selectedDenomination || denominationValues[0];
      const subtotal = selectedDenomination * no_of_card;

      return {
        id: index + 1,
        brand_code: item.brand_code,
        denomination_list: item.denomination_list,
        brand_name: item.brand_name,
        image_url: item.image_url,
        brand_type: item.brand_type,
        selectedDenomination,
        denominationValues,
        no_of_card,
        subtotal,
      };
    });
  }


  removeItem(item: CartItem) {
    this.wishlistService.removeItemFromWishlist(item.brand_code);
    this.cartProducts();
    const count = this.wishlistService.getWishlist().count;
    setTimeout(() => {
      location.reload();
      this.wishlistService.updateCount(count)
    }, 0);

  }


  onCheckout() {
    this.carts.forEach(item => {
      this.wishlistService.updateWishlist(item); // Send updated item to the service
    });
    const is_authenticated = this.authService.isAuthenticated();
    if(is_authenticated) {
      this.router.navigateByUrl('/checkout')
    }else{
      this.router.navigateByUrl('/sign-up')
    }
  }

// Recalculate the subtotal of an item
  calculate_subtotal(item: CartItem, quantity: number): void {
    if (item.selectedDenomination !== undefined) {
      item.subtotal = quantity * item.selectedDenomination; // Recalculate subtotal
    }
  }

// Decrease quantity
  decreaseQuantity(item: CartItem): void {
    if (item.no_of_card > 1) {
      item.no_of_card--;
      this.calculate_subtotal(item, item.no_of_card); // Recalculate subtotal
      this.calculateTotal(); // Update total
      this.wishlistService.updateWishlist(item); // Send updated item to the service

    }
  }

// Increase quantity
  increaseQuantity(item: CartItem): void {
    item.no_of_card++;
    this.calculate_subtotal(item, item.no_of_card); // Recalculate subtotal
    this.calculateTotal(); // Update total
    this.wishlistService.updateWishlist(item); // Send updated item to the service

  }

// Recalculate the total for the cart
  calculateTotal() {
    this.total = this.carts.reduce((acc, item) => acc + item.subtotal, 0); // Sum all subtotals
    this.wishlistService.totalPriceChanged.emit(this.total); // Emit total price change
  }

}

