import { Component, HostListener, Input, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { User } from '../../../shared/interfaces/user';
import { WishlistService } from '../../../shared/services/wishlist.service';
import { SessionStorageService } from '../../../shared/services/session-storage.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [RouterLink, NgIf, RouterLinkActive],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  @Input() header__white: string | undefined;

  headerSticky: boolean = false;
  cartCount = 0;

  // sticky nav
  user: User | null = null;
  @HostListener('window:scroll', ['$event']) onscroll() {
    if (window.scrollY > 80) {
      this.headerSticky = true;
    } else {
      this.headerSticky = false;
    }
  }

  constructor(
    private wishlistService: WishlistService,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit(): void {
    this.getCartCount();
    this.user = this.sessionStorageService.getCurrentUser();

    // overlay
    window.addEventListener('click', () => {
      this.isOverlayOpen = false;
    });
  }

  getCartCount() {
    const wishlist = this.wishlistService.getWishlist();
    this.cartCount = wishlist.length; // Set cartCount to the length of the wishlist
  }

  getUserInitials(): string {
    if (this.user) {
      const firstNameInitial = this.user.firstname.charAt(0).toUpperCase();
      const lastNameInitial = this.user.lastname.charAt(0).toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`;
    }
    return '';
  }
  logout() {
    this.sessionStorageService.logout();
    window.location.reload();
  }

  isOverlayOpen = false;
  // handleOverlay
  handleOverlay(event: MouseEvent) {
  event.stopPropagation(); // Prevent the click from bubbling up to the window
  this.isOverlayOpen = !this.isOverlayOpen;
}
}
