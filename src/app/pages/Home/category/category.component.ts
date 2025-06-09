import {Component, Input, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf, NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {ApiService} from "../../../shared/services/api.service";

interface Category {
  id: string;
  name: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  standalone: true,
  imports: [
    RouterLink,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgForOf,
    NgIf,
    NgClass
  ],
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit{
  ourBrands = [
    {
      id: 1,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 2,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'Browse'
    },
    {
      id: 3,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'In store brand'
    },
    {
      id: 4,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 5,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 6,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 7,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 8,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 9,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 10,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 11,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 12,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 13,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 14,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 15,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
    {
      id: 16,
      img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Gnu-30-banner-without-background.svg/181px-Gnu-30-banner-without-background.svg.png',
      title: 'E-commerce'
    },
  ]
  error_message = '';
  @Input() card_title: string = "Explore";
  category_list: string[] = []
  constructor(
    private router: Router,
    private apiService : ApiService,
  ) { }

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


  router_link(item: string) {
    this.router.navigate(['/vouchers',item]);
  }
}
