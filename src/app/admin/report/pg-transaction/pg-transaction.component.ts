import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent } from "../../../pages/common/breadcrumb/breadcrumb.component";
import {DatePipe, NgClass, NgForOf, NgIf} from "@angular/common";
import { HeaderComponent } from "../../../pages/common/header/header.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { ApiService } from "../../../shared/services/api.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { HttpClient } from "@angular/common/http";
import {RouterLink} from "@angular/router";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule,} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {provideNativeDateAdapter} from "@angular/material/core";
import {MatFabButton} from "@angular/material/button";
import {ExcelService} from "../../../shared/services/excel.service";
import {NgScrollbar} from "ngx-scrollbar";
import {saveAs} from "file-saver";


export interface Transaction {
  id: string;
  user_name: string;
  server_status: string;
  invoice_no: string;
  amount: number;
  created_date: string;
  transaction_id: string;
  refunded: boolean;
}

@Component({
  selector: 'app-pg-transaction',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    DatePipe,
    HeaderComponent,
    RouterLink,
    ReactiveFormsModule,
    NgForOf,
    NgIf,
    MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFabButton, FormsModule, NgClass, NgScrollbar
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './pg-transaction.component.html',
  styleUrls: ['./pg-transaction.component.scss']
})
export class PgTransactionComponent implements OnInit {
  breadCrumbItems!: Array<{}>;
  is_loading : boolean = false;
  error_message : string = "";
  page: number = 1;
  pageSize: number = 10;
  pendingTransactions: Transaction[] = [];
  tempPendingTransactions: Transaction[] = [];
  responseData: any | null = null;
  referenceNo: string = '';
  orderId: string = '';

  pendingTransactionForm = new FormGroup({
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
  });

  constructor(
    private apiService: ApiService,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private excelService : ExcelService,
  ) {}

  ngOnInit() {
    this.breadCrumbItems = [
      { label: 'Rugift' },
      { label: 'Rugift PG Transactions', active: true },
    ];
  }

  onSubmit(): void {
    const payload: any = {
      start_date: this.pendingTransactionForm.value.start_date
        ? new Date(this.pendingTransactionForm.value.start_date).toISOString().split('T')[0]
        : null,
      end_date: this.pendingTransactionForm.value.end_date
        ? new Date(this.pendingTransactionForm.value.end_date).toISOString().split('T')[0]
        : null,
    };

    if (this.pendingTransactionForm.valid) {
      this.is_loading = true;
      this.apiService.post('order/rucards_previous_transaction', payload).subscribe({
        next: (res: any) => {
          if (res.success) { // Check if the response indicates success
            this.pendingTransactions = res.data;
            this.tempPendingTransactions = res.data;
            this.is_loading = false;
          }
        },
        error: (error: any) => {
          setTimeout(()=>{
            this.error_message = error.error.error;
            this.is_loading = false;
          },10000)
        },
      });
    }
  }

  onReset(): void {
    this.pendingTransactionForm.reset();
  }

  check_status(transaction_id:string) {
    this.responseData = null;
    this.apiService.post('pg/check_status', { 'transaction_id' : transaction_id }).subscribe({
      next: (res: any) => {
        this.responseData = res;
      },
      error: (error: any) => {
        this.error_message = error.error?.error;
      },
    });
  }

  openOffcanvas(transaction_id:string){
    this.check_status(transaction_id)
  }



  onSearch(searchText: string): void {
    const searchTextLower = searchText.toLowerCase();
    const filteredMiscs = this.tempPendingTransactions.filter(x => x.invoice_no.toLowerCase().includes(searchTextLower) || x.transaction_id?.toLowerCase().includes(searchTextLower) || x.user_name?.toLowerCase().includes(searchTextLower));

    if (searchTextLower == '') {
      this.pendingTransactions = this.tempPendingTransactions;
    } else
      this.pendingTransactions = filteredMiscs;
  }

  export_to_excel(): void {
    this.spinner.show();
    // Add excel export functionality here
    this.excelService.exportAsExcelFile(this.pendingTransactions, 'business-report-' + Math.random() * 56413216544 + '.xlsx', 'created_date',);
    this.spinner.hide();
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
