import {AfterContentInit, Component, ElementRef, OnInit, Renderer2, untracked} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgForOf, NgIf, NgOptimizedImage, UpperCasePipe} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";
import {ProgressSpinnerComponent} from "../../progress-spinner/progress-spinner.component";
import {CarouselSlideComponent} from "../carousel-slide/carousel-slide.component";
import {CategoryComponent} from "../category/category.component";


export interface TrendingVoucherList {
  brand_code: string;
  brand_name: string;
  category: string;
  outward_discount:string;
  image_url: string;
}

@Component({
  selector: 'app-trending-voucher',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgOptimizedImage,
    NgIf,
    ProgressSpinnerComponent,
    UpperCasePipe,
    CarouselSlideComponent,
    CategoryComponent
  ],
  templateUrl: './trending-voucher.component.html',
  styleUrl: './trending-voucher.component.scss'
})
export class TrendingVoucherComponent implements AfterContentInit{

  error_message = '';
  trending_voucher_list: TrendingVoucherList[] = []

  constructor(
    private router: Router,
    private apiService : ApiService,
    private el: ElementRef, private renderer: Renderer2
  ) { }

  ngAfterContentInit(): void {
      this.get_favourite_brands_list()
  }


  get_favourite_brands_list(){
    this.apiService.get('vd/get_favourite_brands_list').subscribe({
      next: (res) => {
        this.trending_voucher_list = res.data;
      },
      error: (error) => {
        this.error_message = error.error.error;
      },
    });
  }

  router_link(brand_code: string) {
    this.router.navigate(['vouchers/details',brand_code]);
  }

  protected readonly untracked = untracked;
}
