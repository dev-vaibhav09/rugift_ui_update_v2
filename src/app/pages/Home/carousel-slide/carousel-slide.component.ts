import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import {CarouselModule, OwlOptions} from "ngx-owl-carousel-o";
import { NgClass, NgForOf, NgIf, NgOptimizedImage, NgStyle } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-carousel-slide',
  standalone: true,
  imports: [
    CarouselModule,
    NgForOf,
    NgOptimizedImage,
    NgStyle,
    NgClass,
    NgIf,
    RouterLink
  ],
  templateUrl: './carousel-slide.component.html',
  styleUrl: './carousel-slide.component.scss'
})
export class CarouselSlideComponent {
  // @ViewChild('owlCarousel', { static: false }) owlCarousel!: owlCarousel;


  slides = [
    { image: 'img/banner/banner_01.jpg',link:'https://valuedesign.co.in/' },
    { image: 'img/banner/banner_02.jpg',link:'https://valuedesign.co.in/' },
    { image: 'img/banner/banner_03.jpg',link:'https://valuedesign.co.in/' },
    { image: 'img/banner/banner_03.jpg',link:'https://valuedesign.co.in/' },
    { image: 'img/banner/banner_03.jpg',link:'https://valuedesign.co.in/' },
    { image: 'img/banner/banner_03.jpg',link:'https://valuedesign.co.in/' },
  ];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 50,
    autoplay: true,
    autoplayTimeout:3000,
    autoWidth: true,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
        slideBy: 1
      },
      576: {
        items: 2,
        slideBy: 2
      },
      768: {
        items: 3,
        slideBy: 3
      },
      992: {
        items: 4,
        slideBy: 4
      },
      1200: {
        items: 5,
        slideBy: 5
      },
      1400: {
        items: 6,
        slideBy: 6
      }
    },
    nav: false
  }
}
