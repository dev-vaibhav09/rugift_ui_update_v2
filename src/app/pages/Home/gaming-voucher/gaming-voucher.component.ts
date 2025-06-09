import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";
import {Router} from "@angular/router";

export interface DigitalVoucherList {
  brand_code: string;
  brand_name: string;
  category: string;
  outward_discount:string;
  image_url: string;
}

@Component({
  selector: 'app-gaming-voucher',
  standalone: true,
    imports: [
        NgForOf
    ],
  templateUrl: './gaming-voucher.component.html',
  styleUrl: './gaming-voucher.component.scss'
})
export class GamingVoucherComponent implements  OnInit {
  currentCardIndex = 0;
  digital_voucher_list: DigitalVoucherList[] = [] ;
  error_message : string = '';

  constructor(
    private apiService : ApiService,
    private router : Router,
  ) {
  }

  ngOnInit(): void {
    this.get_brand_list('digital_play')
  }

  get_brand_list(category:string) {
    this.apiService.post('vd/brands_by_category', {'category':category}).subscribe({
      next: (res: any) => {
        this.digital_voucher_list = res.data || [];
      },
      error: (error: any) => {
        setTimeout(()=>{
          this.error_message = error.error.error;
        },1000)
      },complete: () => {
      }
    });
  }

  router_link(brand_code: string) {
    this.router.navigate(['vouchers/details',brand_code]);
  }

  nextSlide(): void {
    if (this.currentCardIndex < this.digital_voucher_list.length - 5) {
      this.currentCardIndex++;
      this.updateCarouselPosition();
    }
  }

  prevSlide(): void {
    if (this.currentCardIndex > 0) {
      this.currentCardIndex--;
      this.updateCarouselPosition();
    }
  }

  private updateCarouselPosition(): void {
    const wrapper = document.querySelector('.gift-cards-wrapper') as HTMLElement;
    if (wrapper) {
      const cardWidth = wrapper.offsetWidth / 5;
      wrapper.style.transform = `translateX(-${this.currentCardIndex * cardWidth}px)`;
    }
  }
}
