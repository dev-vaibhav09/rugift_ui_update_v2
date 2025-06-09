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
  outward_discount:number;
  image_url: string;
  is_discount_applicable:boolean;
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
    // this.apiService.get('vd/get_favourite_brands_list').subscribe({
    //   next: (res) => {
    //     this.trending_voucher_list = res.data;
    //   },
    //   error: (error) => {
    //     this.error_message = error.error.error;
    //   },
    // });

    this.trending_voucher_list = [
        {
            "brand_code": "EGCGBETSR005",
            "brand_name": "Behrouz Biryani E-Gift Card - B2C",
            "category": "food_beverages",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGCGBETSR005.jpg",
            "is_discount_applicable": true,
            "outward_discount": 5.0
        },
        {
            "brand_code": "MAX2namhndbgDsLpE9c",
            "brand_name": "MAX",
            "category": "fashion_lifestyle",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/MAX2namhndbgDsLpE9c.png",
            "is_discount_applicable": true,
            "outward_discount": 5.0
        },
        {
            "brand_code": "ArchiesGalleryoy7sgTiiLKxmLJuQ",
            "brand_name": "Archies Gallery",
            "category": "fashion_lifestyle",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/ArchiesGalleryoy7sgTiiLKxmLJuQ.png",
            "is_discount_applicable": true,
            "outward_discount": 10.0
        },
        {
            "brand_code": "YatracomFDzvIJ7CzqqCI8Qv",
            "brand_name": "Yatra.com",
            "category": "travels",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/YatracomFDzvIJ7CzqqCI8Qv.png",
            "is_discount_applicable": true,
            "outward_discount": 5.0
        },
        {
            "brand_code": "DominosPizzaYHZmQBb7cqJuhFCI",
            "brand_name": "Domino's Pizza",
            "category": "food_beverages",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/DominosPizzaYHZmQBb7cqJuhFCI.jpg",
            "is_discount_applicable": true,
            "outward_discount": 10.0
        },
        {
            "brand_code": "BataQFIm94RD31hzEYSC",
            "brand_name": "Bata",
            "category": "fashion_lifestyle",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/BataQFIm94RD31hzEYSC.jpg",
            "is_discount_applicable": true,
            "outward_discount": 10.0
        },
        {
            "brand_code": "MakeMyTripHolidayePayVsqfbtIyGTZDxcSM",
            "brand_name": "MakeMyTrip Holiday e-Pay",
            "category": "travels",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/MakeMyTripHolidayePayVsqfbtIyGTZDxcSM.jpg",
            "is_discount_applicable": true,
            "outward_discount": 5.0
        },
        {
            "brand_code": "MyntraU4fUI3oXLTCrjW4j",
            "brand_name": "Myntra",
            "category": "e_commerce",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/MyntraU4fUI3oXLTCrjW4j.jpg",
            "is_discount_applicable": true,
            "outward_discount": 5.0
        },
        {
            "brand_code": "EGVGBBMSCLPS001",
            "brand_name": "BookMyShow Instant Voucher",
            "category": "entertainment",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGVGBBMSCLPS001.jpg",
            "is_discount_applicable": true,
            "outward_discount": 3.0
        },
        {
            "brand_code": "EGCGBTSQ002",
            "brand_name": "Tanishq Studded E-Gift Card",
            "category": "jewellery",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGCGBTSQ002.jpg",
            "is_discount_applicable": true,
            "outward_discount": 3.0
        },
        {
            "brand_code": "EGVGBPVRC001",
            "brand_name": "PVR Cinemas E-Gift Card",
            "category": "entertainment",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGVGBPVRC001.jpg",
            "is_discount_applicable": true,
            "outward_discount": 10.0
        },
        {
            "brand_code": "FernsNPetalsexQfDcyfUkvLKlk8",
            "brand_name": "Ferns N Petals",
            "category": "e_commerce",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/FernsNPetalsexQfDcyfUkvLKlk8.png",
            "is_discount_applicable": true,
            "outward_discount": 10.0
        },
        {
            "brand_code": "KalyanGoldJewelleryFi6AX86BP5zlKHzG",
            "brand_name": "Kalyan Gold Jewellery",
            "category": "jewellery",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/KalyanGoldJewelleryFi6AX86BP5zlKHzG.png",
            "is_discount_applicable": true,
            "outward_discount": 3.0
        },
        {
            "brand_code": "EGCGBNYKA006",
            "brand_name": "Nykaa Fashion E-Gift Card",
            "category": "fashion_lifestyle",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGCGBNYKA006.jpg",
            "is_discount_applicable": true,
            "outward_discount": 5.0
        },
        {
            "brand_code": "EGCGBREL001",
            "brand_name": "Reliance Digital E-Gift Voucher",
            "category": "e_commerce",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGCGBREL001.jpg",
            "is_discount_applicable": true,
            "outward_discount": 3.0
        },
        {
            "brand_code": "EGCGBTANISHQMIA002",
            "brand_name": "Mia By Tanishq E-Gift Card",
            "category": "fashion_lifestyle",
            "image_url": "https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/EGCGBTANISHQMIA002.jpg",
            "is_discount_applicable": true,
            "outward_discount": 3.0
        }
    ]
  }

  router_link(brand_code: string) {
    this.router.navigate(['vouchers/details',brand_code]);
  }

  protected readonly untracked = untracked;
}
