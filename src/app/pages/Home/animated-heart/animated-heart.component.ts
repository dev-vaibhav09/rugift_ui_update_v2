import {AfterContentInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NgForOf} from "@angular/common";
import {CarouselSlideComponent} from "../carousel-slide/carousel-slide.component";
import {TrendingVoucherComponent} from "../trending-voucher/trending-voucher.component";
import {CategoryComponent} from "../category/category.component";

@Component({
  selector: 'app-animated-heart',
  standalone: true,
  imports: [
    NgForOf,
    CarouselSlideComponent,
    TrendingVoucherComponent,
    CategoryComponent
  ],
  templateUrl: './animated-heart.component.html',
  styleUrl: './animated-heart.component.scss'
})
export class AnimatedHeartComponent  implements AfterContentInit{

  ngAfterContentInit(): void {
    this.randomizeAnimations();
  }
  constructor(
    private el: ElementRef, private renderer: Renderer2
  ) {
  }  randomizeAnimations() {
    const heartsContainer = this.el.nativeElement.querySelector('.hearts-container');
    if (!heartsContainer) return;

    const numHearts = 100; // Increased number of hearts
    const heartImage = '/img/IMG.png'; // Path to your heart image

    for (let i = 0; i < numHearts; i++) {
      const heart = this.renderer.createElement('div');
      this.renderer.addClass(heart, 'heart');

      const size = Math.random() * 40 + 20; // Adjusted size range
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const delay = Math.random() * 15; // Shorter max delay
      const duration = Math.random() * 15 + 10; // Random duration

      this.renderer.setStyle(heart, 'width', `${size}px`);
      this.renderer.setStyle(heart, 'height', `${size}px`);
      this.renderer.setStyle(heart, 'left', `${x}vw`);
      this.renderer.setStyle(heart, 'top', `${y}vh`);
      this.renderer.setStyle(heart, 'animation-delay', `${delay}s`);
      this.renderer.setStyle(heart, 'animation-duration', `${duration}s`);
      this.renderer.setStyle(heart, 'opacity', '0');
      this.renderer.setStyle(heart, 'background-image', `url('${heartImage}')`);
      this.renderer.setStyle(heart, 'background-size', 'cover');
      this.renderer.setStyle(heart, 'z-index', `${Math.floor(Math.random() * 3)}`);

      // Add a random rotation to each heart
      const rotation = Math.random() * 360;
      this.renderer.setStyle(heart, 'transform', `rotate(${rotation}deg)`);

      this.renderer.appendChild(heartsContainer, heart);

      setTimeout(() => {
        this.renderer.setStyle(heart, 'opacity', '1');
      }, 100);
    }
  }
}
