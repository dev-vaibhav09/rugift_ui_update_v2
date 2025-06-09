import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../pages/common/header/header.component";
import {FooterComponent} from "../../pages/common/footer/footer.component";
import {BreadcrumbComponent} from "../../pages/common/breadcrumb/breadcrumb.component";
import {AnimatedHeartComponent} from "../../pages/Home/animated-heart/animated-heart.component";

@Component({
  selector: 'app-content-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    BreadcrumbComponent,
    AnimatedHeartComponent
  ],
  templateUrl: './content-layout.component.html',
  styleUrl: './content-layout.component.scss'
})
export class ContentLayoutComponent {

}
