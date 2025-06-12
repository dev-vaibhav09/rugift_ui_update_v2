import {AfterContentInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {WishlistService} from "../../../shared/services/wishlist.service";
import {SessionStorageService} from "../../../shared/services/session-storage.service";
import {User} from "../../../shared/interfaces/user";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements AfterContentInit {

  @Input () header__white : string | undefined
  headerSticky : boolean = false;
  cartCount:number = 0;
  @ViewChild('hamburgerMenu') hamburgerMenu!: ElementRef<HTMLElement>;
  @ViewChild('headerNav') headerNav!: ElementRef<HTMLElement>;
  private mobileBreakpoint = 767;
// sticky nav
  user: User | null = null;
  @HostListener('window:scroll',['$event']) onscroll () {
    if(window.scrollY > 80){
      this.headerSticky = true
    }
    else{
      this.headerSticky = false
    }
  }

  constructor(
    private wishlistService: WishlistService,
    private sessionStorageService :SessionStorageService
  ) {
  }

  ngAfterContentInit(): void {
    this.sessionStorageService.currentUser$.subscribe(value => this.user = value);
    this.wishlistService.count$.subscribe(updatedCount => {
      this.cartCount = updatedCount;
    })
  }


  getUserInitials(): string {
    if (this.user) {
      const firstNameInitial = this.user.firstname.charAt(0).toUpperCase();
      const lastNameInitial = this.user.lastname.charAt(0).toUpperCase();
      return `${firstNameInitial}${lastNameInitial}`;
    }
    return '';
  }
  logout(){
    this.sessionStorageService.logout();
    window.location.reload();
  }
  toggleMenu(): void {
    this.hamburgerMenu.nativeElement.classList.toggle('active');
    this.headerNav.nativeElement.classList.toggle('active');
  }

  /**
   * Closes the mobile menu if on mobile viewport
   */
  closeMenuIfMobile(): void {
    if (window.innerWidth <= this.mobileBreakpoint) {
      this.hamburgerMenu.nativeElement.classList.remove('active');
      this.headerNav.nativeElement.classList.remove('active');
    }
  }

  /**
   * Listens for window resize events to close mobile menu if screen becomes larger
   */
  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    if (window.innerWidth > this.mobileBreakpoint) {
      this.hamburgerMenu.nativeElement.classList.remove('active');
      this.headerNav.nativeElement.classList.remove('active');
    }
  }
}
