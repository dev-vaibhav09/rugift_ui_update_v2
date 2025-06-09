import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {FooterComponent} from "../common/footer/footer.component";
import {HeaderComponent} from "../common/header/header.component";

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    RouterLink,
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {

}
