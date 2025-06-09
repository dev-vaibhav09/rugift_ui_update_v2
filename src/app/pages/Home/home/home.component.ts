import {Component, OnInit} from '@angular/core';
import {FooterComponent} from "../../common/footer/footer.component";
import {CategoryComponent} from "../category/category.component";
import {TrendingVoucherComponent} from "../trending-voucher/trending-voucher.component";
import {CarouselSlideComponent} from "../carousel-slide/carousel-slide.component";
import {HeaderComponent} from "../../common/header/header.component";
import {AnimatedHeartComponent} from "../animated-heart/animated-heart.component";
import {NgForOf} from "@angular/common";
import {OfferModalComponent} from "../offer-modal/offer-modal.component";
import {MatDialog} from "@angular/material/dialog";
import {GamingVoucherComponent} from "../gaming-voucher/gaming-voucher.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FooterComponent,
    TrendingVoucherComponent,
    CarouselSlideComponent,
    HeaderComponent,
    CategoryComponent,
    AnimatedHeartComponent,
    OfferModalComponent,
    GamingVoucherComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.openOfferModal();
  }

  openOfferModal(): void {
    this.dialog.open(OfferModalComponent, {
      width: '400px',
      disableClose: true
    });
  }
}
