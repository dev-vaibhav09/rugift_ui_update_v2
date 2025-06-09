import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../common/header/header.component";
import { BreadcrumbComponent } from "../../common/breadcrumb/breadcrumb.component";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import { ApiService } from "../../../shared/services/api.service";
import { SessionStorageService } from "../../../shared/services/session-storage.service";
import { WishlistService } from "../../../shared/services/wishlist.service";
import { ToastrService } from "ngx-toastr";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {NgScrollbar} from "ngx-scrollbar";

export interface Transaction {
  id: string;
  user_id: string;
  amount: string;
  invoice_no: string;
  expire_on: string | null;
  created_date: string | null;
  order_id: string | null;
  transaction_status: string | null;
  brand_name:string | null;
  req_id:string | null;
  transaction_id:string | null;
  response:any;
}

@Component({
  selector: 'app-voucher-orders',
  standalone: true,
  imports: [
    HeaderComponent,
    BreadcrumbComponent,
    RouterLink,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    NgScrollbar
  ],
  templateUrl: './voucher-orders.component.html',
  styleUrl: './voucher-orders.component.scss'
})
export class VoucherOrdersComponent implements OnInit {
  filteredtransaction: Transaction[] = [];
  transactions: Transaction[] = [];
  responseData: any | null = null;
  paginatedTransactions: any[] = [];
  pageSize: number = 10;
  error_message = '';
  // Sample data for the table with type `Transaction`

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sessionStorage: SessionStorageService,
    private wishlistService: WishlistService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit() {

    const currentUser = this.sessionStorage.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/']);
    }
    let invoiceNo: string | null = null;

    this.route.paramMap.subscribe(params => {
      invoiceNo = params.get('invoice_no');

      if (invoiceNo) {
        // Now using the invoice_no in the API request
        this.apiService.post('order/previous_voucher', { 'invoice_no': invoiceNo }).subscribe({
          next: (res: any) => {
            this.transactions = res.data;
            this.filteredtransaction = [...this.transactions]; // Initialize filtered courses with the full list
            this.updatePagination();
          },
          error: (error: any) => {
            this.toastr.error(error.error?.message || 'Error fetching brand list'); // Handle error message safely
          },
        });
      } else {
        this.toastr.error('Invoice number is missing');
      }
    });
  }

  onSearch(searchText: string): void {
    const searchTextLower = searchText.toLowerCase();
    // Perform search logic here, filtering `transactions` based on `searchTextLower`
  }

  check_status(referenceNo: string | null, orderId: string |  null) {
    this.apiService.post('vd/check_evc_status', { 'reference_no' : referenceNo,'order_id':orderId }).subscribe({
      next: (res: any) => {
        this.responseData = res.data;
      },
      error: (error: any) => {
        this.error_message = error.error?.error;
      },
    });
  }

  openOffcanvas(referenceNo: string | null, orderId: string | null){
    this.check_status(referenceNo, orderId)
  }
  updatePagination(): void {
    this.paginatedTransactions = this.transactions.slice(0, this.pageSize);
  }

  onPageSizeChange(): void {
    this.updatePagination();
  }
}
