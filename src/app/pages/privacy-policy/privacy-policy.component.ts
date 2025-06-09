import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent {

}
