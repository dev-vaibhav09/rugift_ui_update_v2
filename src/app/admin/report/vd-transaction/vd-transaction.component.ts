import {Component, OnInit} from '@angular/core';
import {BreadcrumbComponent} from "../../../pages/common/breadcrumb/breadcrumb.component";
import {HeaderComponent} from "../../../pages/common/header/header.component";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ApiService} from "../../../shared/services/api.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {HttpClient} from "@angular/common/http";
import {
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {MatFabButton} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import {RouterLink} from "@angular/router";
import {provideNativeDateAdapter} from "@angular/material/core";
import {ExcelService} from "../../../shared/services/excel.service";
import {NgScrollbar} from "ngx-scrollbar";


export interface Transaction {
  id: string;
  user_id: string;
  amount: string;
  invoice_no: string;
  expire_on: string | null;
  created_date: string | null;
  order_id: string | null;
  server_status: string | null;
  brand_name:string | null;
  ref_no:string | null;
  transaction_id:string | null;
  user_name: string;
  response:any;
}


@Component({
  selector: 'app-vd-transaction',
  standalone: true,
    imports: [
        BreadcrumbComponent,
        DatePipe,
        HeaderComponent,
        RouterLink,
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFabButton, FormsModule, NgScrollbar
    ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './vd-transaction.component.html',
  styleUrl: './vd-transaction.component.scss'
})
export class VdTransactionComponent implements OnInit {
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
      this.apiService.post('order/rucards_previous_voucher', payload).subscribe({
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

  onSearch(searchText: string): void {
    const searchTextLower = searchText.toLowerCase();
    const filteredMiscs = this.tempPendingTransactions.filter(x => x.invoice_no.toLowerCase().includes(searchTextLower) || x.transaction_id?.toLowerCase().includes(searchTextLower) || x.brand_name?.toLowerCase().includes(searchTextLower));

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
}
