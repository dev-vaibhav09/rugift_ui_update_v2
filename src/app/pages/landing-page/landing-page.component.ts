import {AfterViewInit, Component, Renderer2} from '@angular/core';
import {CarouselSlideComponent} from "../Home/carousel-slide/carousel-slide.component";
import {NgForOf} from "@angular/common";
import {RouterLink} from "@angular/router";

interface Offer {
  title: string;
  discount: string;
  description : String;
}

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CarouselSlideComponent,
    NgForOf,
    RouterLink
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements AfterViewInit {
  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    const imageBoxes = document.querySelectorAll('.image-box');
    let index = 0;

    setInterval(() => {
      imageBoxes.forEach(box => this.renderer.removeClass(box, 'hover-active'));

      const currentBox = imageBoxes[index];
      if (currentBox) {
        this.renderer.addClass(currentBox, 'hover-active');
      }

      index = (index + 1) % imageBoxes.length;
    }, 2000);
  }
}
