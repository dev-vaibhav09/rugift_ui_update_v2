import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-disclaimer',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './disclaimer.component.html',
  styleUrl: './disclaimer.component.scss'
})
export class DisclaimerComponent {

}
