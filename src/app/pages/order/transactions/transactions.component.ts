import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../../common/header/header.component";
import {BreadcrumbComponent} from "../../common/breadcrumb/breadcrumb.component";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ApiService} from "../../../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {DatePipe, NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {User} from "../../../shared/interfaces/user";
import {FormsModule} from "@angular/forms";
import {NgScrollbar} from "ngx-scrollbar";
import {SafeHtml} from "@angular/platform-browser";
import {saveAs} from "file-saver";
import {NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";


export interface Transaction {
  user_id: string;
  user_name: string;
  server_status: string;
  invoice_number: string;
  amount: number;
  created_date: string;
  transaction_id: string;
}

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [
    HeaderComponent,
    BreadcrumbComponent,
    NgIf,
    NgForOf,
    RouterLink,
    DatePipe,
    FormsModule,
    NgClass,
    NgScrollbar,
    NgStyle,
  ],
  providers:[NgbModalConfig, NgbModal],
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredtransaction: Transaction[] = [];
  paginatedTransactions: any[] = [];
  pageSize: number = 10;
  user: User | null = null;
  searchQuery: string = '';
  transactionId: string = ''; // Store the transaction ID entered by the user
  message: string = '';
  responseData: any | null = null;
  error_message = "";
  data:any;

  previewContent: SafeHtml | null = null;
  errorMessage: string = '';
  isDownloading: boolean = false;
  isLoading: boolean = false;


  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private modalService: NgbModal,

  ) {
  }

  ngOnInit() {
    this.apiService.get('order/previous_transaction').subscribe({
      next: (res: any) => {
        this.transactions = res.data;
        this.filteredtransaction = [...this.transactions]; // Initialize filtered courses with the full list
        this.updatePagination();
      },
      error: (error: any) => {
        this.toastr.error(error.error?.message || 'Error fetching brand list'); // Handle error message safely
      },
    });
  }

  // Filters the courses based on the search query for BrandName
  onSearch() {
    if (this.searchQuery.trim() === '') {
      this.filteredtransaction = this.transactions;
    } else {
      this.filteredtransaction = this.transactions.filter(course =>
        course.invoice_number.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  check_status(transaction_id: string) {
    this.apiService.post('pg/check_status', {'transaction_id': transaction_id}).subscribe({
      next: (res: any) => {
        this.responseData = res;
      },
      error: (error: any) => {
        this.error_message = error.error?.error;
      },
    });
  }

  openOffcanvas(transaction_id: string) {
    this.check_status(transaction_id)
  }

  updatePagination(): void {
    this.paginatedTransactions = this.transactions.slice(0, this.pageSize);
  }

  onPageSizeChange(): void {
    this.updatePagination();
  }

  downloadBill(invoiceNumber: string) {
    this.apiService.download(`vd/download_invoice`, {
      "invoice_number": invoiceNumber,
      "format": "pdf"
    }).subscribe(res => {
      saveAs(new Blob([res], {type: 'application/pdf'}), `Rugift_invoice-${invoiceNumber}.pdf`);
    });
  }

  previewHtml(invoiceNumber: string): void {
    this.apiService.preview(`vd/download_invoice`, 'get',
      { 'invoice_number': invoiceNumber },
      { responseType: 'text' } // Ensure response is treated as text
    ).subscribe(res => {
      const popup = window.open('', '_blank', 'width=800,height=600');

      if (popup) {
        popup.document.open();
        popup.document.write(res);
        popup.document.close();
      }
    }, error => {
      console.error("Error loading invoice:", error);
    });
  }

}
