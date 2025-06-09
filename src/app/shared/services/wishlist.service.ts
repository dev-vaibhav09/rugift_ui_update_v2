import { Injectable, EventEmitter } from '@angular/core';
import { SessionStorageService } from './session-storage.service';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  totalPriceChanged: EventEmitter<number> = new EventEmitter<number>(); // EventEmitter to notify total price changes
  private countSource = new BehaviorSubject<number>(0);
  count$ = this.countSource.asObservable()

  constructor(private sessionStorage: SessionStorageService) {}

  // Function to add/update item in the wishlist
  updateWishlist(item: any, price?: number) {
    const wishlistString = this.sessionStorage.getItem('wishlist');
    let wishlist: any[] = wishlistString ? JSON.parse(wishlistString) : [];

    // Ensure that item has a valid BrandCode
    if (!item || !item.brand_code) {
      console.error('Item is invalid or missing BrandCode.');
      return;
    }

    // If a price is provided, update the item with this price
    if (price !== undefined) {
      item.selectedDenomination = price; // Assign the provided price to the item
    }

    // Check if item is already in the wishlist
    const index = wishlist.findIndex((i: any) => i.brand_code === item.brand_code);

    if (index === -1) {
      // Add item to wishlist if not present
      wishlist.push(item);
    } else {
      // Update item if it already exists, ensuring to update selectedDenomination
      wishlist[index] = { ...wishlist[index], ...item }; // Update with new values
    }

    // Update session storage only if the wishlist has valid data
    if (wishlist.length > 0) {
      this.sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
      this.updateCount(wishlist.length)
    } else {
      this.sessionStorage.removeItem('wishlist'); // Clean up empty list from sessionStorage
    }

    // Emit the new total price
    this.totalPriceChanged.emit(this.getTotalPrice());
  }

  // Function to remove a specific item from the wishlist
  removeItemFromWishlist(brand_code: string) {
    const wishlistString = this.sessionStorage.getItem('wishlist');
    let wishlist: any[] = wishlistString ? JSON.parse(wishlistString) : [];

    // Find the index of the item to be removed
    const index = wishlist.findIndex((i: any) => i.brand_code === brand_code);
    if (index !== -1) {
      wishlist.splice(index, 1); // Remove the item
    }

    // Update the session storage
    if (wishlist.length > 0) {
      this.sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
    } else {
      this.sessionStorage.removeItem('wishlist'); // Clean up empty list from sessionStorage
    }

    // Correctly update the count after removal
    this.updateCount(wishlist.length);

    // Emit the new total price
    this.totalPriceChanged.emit(this.getTotalPrice());
  }


  // Function to get the wishlist from sessionStorage
  getWishlist() {
    const wishlistString = this.sessionStorage.getItem('wishlist');
    return wishlistString ? JSON.parse(wishlistString) : [];
  }

  // Function to get the total price based on selected prices from slider
  getTotalPrice() {
    const wishlist: { brand_code: string; subtotal?: number }[] = this.getWishlist();

    const totalPrice = wishlist.reduce((total: number, item: { subtotal?: number }) => {
      return total + (item.subtotal || 0); // Summing up selected prices
    }, 0);

    return totalPrice;
  }

  updateCount(new_number:number){
      this.countSource.next(new_number);
  }
}
