import { Component, OnInit } from '@angular/core';
import {NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import { ApiService } from "../../shared/services/api.service";
import { ToastrService } from "ngx-toastr";
import { FormsModule } from "@angular/forms";
import { BreadcrumbComponent } from "../common/breadcrumb/breadcrumb.component";
import { HeaderComponent } from "../common/header/header.component";
import { FooterComponent } from "../common/footer/footer.component";
import { NgxSpinnerModule } from "ngx-spinner";
import {ProgressSpinnerComponent} from "../progress-spinner/progress-spinner.component";

interface BrandList {
  brand_code:string;
  brand_name:string;
  category:string;
  image_url:string;
  outward_discount:string;
  is_discount_applicable:boolean;
}
@Component({
  selector: 'app-brand-vouchers',
  standalone: true,
  imports: [
    NgForOf,
    RouterLink,
    FormsModule,
    BreadcrumbComponent,
    HeaderComponent,
    FooterComponent,
    NgIf,
    NgxSpinnerModule,
    ProgressSpinnerComponent,
    UpperCasePipe
  ],
  templateUrl: './brand-vouchers.component.html',
  styleUrls: ['./brand-vouchers.component.scss']
})
export class BrandVouchersComponent implements OnInit {
  brand_list: BrandList[] = [];
  filteredCourses: BrandList[] = [];
  unique_categories: string[] = [];
  category: string = '';
  searchQuery: string = '';
  error_message = "";
  is_loading : boolean = false;
  category_list:string = "";

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.get_category();
      this.get_brand_list(this.category);
    });
  }

  get_category(){
    this.apiService.get('vd/get_categories_list').subscribe({
      next: (res) => {
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

  CategoryChange(event: any) {
    this.category = event.target.value;
    this.get_brand_list(this.category);
  }

  toggleWishlist(brand_code: string) {
    this.router.navigate(['vouchers/details',brand_code]);
  }

  onSearch() {
    this.filteredCourses = this.searchQuery.trim()
      ? this.brand_list.filter(course =>
        course.brand_name.toLowerCase().includes(this.searchQuery.toLowerCase())
      )
      : [...this.brand_list];
  }

  get_brand_list(category:string) {
    this.is_loading = true;
    this.apiService.post('vd/brands_by_category', {'category':category}).subscribe({
      next: (res: any) => {
        this.brand_list = res.data || [];
        this.filteredCourses = [...this.brand_list];
        this.is_loading = false;
      },
      error: (error: any) => {
        setTimeout(()=>{
        this.error_message = error.error.error;
        this.is_loading = false;
        },1000)
      },complete: () => {
        this.is_loading = false;
      }
    });
  }

  getImageUrl(brand: any): string {
    const validExtensions = ['.jpg', '.png'];
    if (brand.image_url) {
      const url = brand.image_url.toLowerCase();
      if (validExtensions.some(ext => url.endsWith(ext))) {
        return brand.image_url;
      }
    }
    return 'https://payswapprods3.s3.ap-south-1.amazonaws.com/rugift_resoucces/default_gc.jpg';
  }

}
