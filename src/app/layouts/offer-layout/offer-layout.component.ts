import { Component } from '@angular/core';
import {HeaderComponent} from "../../pages/common/header/header.component";
import {FooterComponent} from "../../pages/common/footer/footer.component";
import {AnimatedHeartComponent} from "../../pages/Home/animated-heart/animated-heart.component";
import {LandingPageComponent} from "../../pages/landing-page/landing-page.component";
import {NgStyle} from "@angular/common";

@Component({
  selector: 'app-offer-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    AnimatedHeartComponent,
    LandingPageComponent,
    NgStyle
  ],
  templateUrl: './offer-layout.component.html',
  styleUrl: './offer-layout.component.scss'
})
export class OfferLayoutComponent {

}
