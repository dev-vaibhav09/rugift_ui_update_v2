import { Component } from '@angular/core';
import {BreadcrumbComponent} from "../common/breadcrumb/breadcrumb.component";

@Component({
  selector: 'app-refund-and-cancellations',
  standalone: true,
  imports: [
    BreadcrumbComponent
  ],
  templateUrl: './refund-and-cancellations.component.html',
  styleUrl: './refund-and-cancellations.component.scss'
})
export class RefundAndCancellationsComponent {

}
