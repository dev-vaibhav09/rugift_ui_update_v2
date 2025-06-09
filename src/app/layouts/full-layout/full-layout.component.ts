import { Component } from '@angular/core';
import {RouterOutlet} from "@angular/router";
import {HeaderComponent} from "../../pages/common/header/header.component";
import {TopbarComponent} from "./topbar/topbar.component";
import {BottombarComponent} from "./bottombar/bottombar.component";

@Component({
  selector: 'app-full-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    TopbarComponent,
    BottombarComponent
  ],
  templateUrl: './full-layout.component.html',
  styleUrl: './full-layout.component.scss'
})
export class FullLayoutComponent {

}
