import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-awards',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    RouterLink
  ],
  templateUrl: './awards.component.html',
  styleUrl: './awards.component.scss'
})
export class AwardsComponent {

}
