import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BreadcrumbComponent} from "../../../pages/common/breadcrumb/breadcrumb.component";
import {HeaderComponent} from "../../../pages/common/header/header.component";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {SessionStorageService} from "../../../shared/services/session-storage.service";
import {WishlistService} from "../../../shared/services/wishlist.service";
import {ToastrService} from "ngx-toastr";
import {DashboardComponent} from "../../dashboard/dashboard.component";
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
  brand_name: string | null;
  req_id: string | null;
  transaction_id: string | null;
  selected: boolean;
  voucher_details: any;
  response:any;
}


@Component({
  selector: 'app-vouchers-report',
  standalone: true,
    imports: [
        BreadcrumbComponent,
        HeaderComponent,
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        FormsModule,
        CurrencyPipe,
        DashboardComponent,
        NgScrollbar
    ],
  templateUrl: './vouchers-report.component.html',
  styleUrl: './vouchers-report.component.scss'
})
export class VouchersReportComponent implements OnInit {
  filteredtransaction: Transaction[] = [];
  transactions: Transaction[] = [];
  matchingProducts:any;
  responseData: any | null = null;
  paginatedTransactions: any[] = [];
  pageSize: number = 10;
  error_message = '';
  totalAmount = 0;
  remark = '';
  invoiceNo: string | null = null;

  // Sample data for the table with type `Transaction`

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit() {

    const currentUser = this.sessionStorage.getCurrentUser();
    if (!currentUser) {
      this.router.navigate(['/']);
    }


    this.route.paramMap.subscribe(params => {
      this.invoiceNo = params.get('invoice_no');

      if (this.invoiceNo) {
        // Now using the invoice_no in the API request
        this.apiService.post('order/previous_voucher', {'invoice_no': this.invoiceNo}).subscribe({
          next: (res: any) => {
            this.transactions = res.data;
            this.filteredtransaction = [...this.transactions];
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

  check_status(referenceNo: string | null, orderId: string | null) {
    this.apiService.post('vd/check_evc_status', {'reference_no': referenceNo, 'order_id': orderId}).subscribe({
      next: (res: any) => {
        this.responseData = res.data;
        this.error_message = res.data;
      },
      error: (error: any) => {
        this.error_message = error.error?.error;
      },
    });
  }

  openOffcanvas(referenceNo: string | null, orderId: string | null) {
    this.check_status(referenceNo, orderId)
  }

  updatePagination(): void {
    this.paginatedTransactions = this.transactions.slice(0, this.pageSize);
  }

  onPageSizeChange(): void {
    this.updatePagination();
  }

  async getBrandDetails(brand_code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.apiService.post('vd/brands_details', { brand_code }).subscribe({
        next: (res: any) => {
          resolve(res.data);
        },
        error: (err) => {
          console.error('Error fetching brand details:', err);
          reject(err);
        },
      });
    });
  }

  async updateTotalAmount() {
    try {
      this.totalAmount = 0;  // Reset total amount before recalculating

      for (const transaction of this.transactions.filter((t) => t.selected)) {
        const brand_code = transaction.voucher_details['brand_code'];
        const brand_data = await this.getBrandDetails(brand_code);

        const amount = parseFloat(transaction.amount as string) || 0;
        let finalAmount = amount;
        if (brand_data[0]['is_discount_applicable']) {
          const outwardDiscount = brand_data[0]['outward_discount'] || 0;
          finalAmount = amount - outwardDiscount;
        }

        // Update the total amount for selected transactions
        this.totalAmount += finalAmount;
      }

      // Ensure view is updated after changes
      this.cdr.detectChanges();

    } catch (error) {
      console.error('Error updating total amount:', error);
    }
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.transactions.forEach((transaction) => {
      transaction.selected = checked;
    });
    this.updateTotalAmount();
  }


  refund_process(refund_amount: number, remark: string) {
    this.apiService.post('pg/refund_request', {
      'invoice_no': this.invoiceNo,
      'refund_amount': String(refund_amount),
      'remark': remark,
    }).subscribe({
      next: (res: any) => {
        this.responseData = res.data;
        this.error_message = res.data;
      },
      error: (error: any) => {
        this.error_message = error.error?.error;
      },
    });
  }
}

