import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {CategoryComponent} from "../Home/category/category.component";
import {CarouselSlideComponent} from "../Home/carousel-slide/carousel-slide.component";

@Component({
  selector: 'app-choose-category',
  standalone: true,
  imports: [
    NgForOf,
    CarouselSlideComponent,
    CategoryComponent
  ],
  templateUrl: './choose-category.component.html',
  styleUrl: './choose-category.component.scss'
})
export class ChooseCategoryComponent {

}
