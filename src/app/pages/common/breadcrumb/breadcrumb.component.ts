import { Component, Input, OnInit } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {NgClass, NgForOf, NgIf} from '@angular/common';
import {ApiService} from "../../../shared/services/api.service";

@Component({
  selector: 'app-breadcrumb',
  standalone: true,
    imports: [RouterLink, NgIf, NgForOf,NgClass],
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() title: string | undefined;
  @Input() subtitle: string | undefined;
  @Input() subtitle_link: string | undefined;
  @Input() subsubtitle: string | undefined;
  @Input() subsubtitle_link: string | undefined;

  category_list: string[] = [];
  error_message:string="";
  constructor(
    private router: Router,
    private apiService : ApiService,
  ) {}

  ngOnInit(): void {
    this.apiService.get('vd/get_categories_list').subscribe({
      next: (res) => {
        console.log()
        this.category_list = res.data;

      },
      error: (error) => {
        this.error_message = error.error.error;
      },
    });
  }

  formatName(name: string): string {
    return name
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  isActiveCategory(category: string): boolean {
  return this.router.url === `/vouchers/${category}`;
}


  router_link(item: string) {
    this.router.navigate(['/vouchers',item]);
  }
}
