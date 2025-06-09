import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../shared/services/api.service';
import { SessionStorageService } from '../../shared/services/session-storage.service';
import { ToastrService } from 'ngx-toastr';
import { HeaderComponent } from "../common/header/header.component";
import {DatePipe, NgIf} from "@angular/common";
import {ProgressSpinnerComponent} from "../progress-spinner/progress-spinner.component";
import {TransactionStatus} from "../../shared/enums/transaction_status_enum";




interface StatusDetail {
  status: string;
  description: string;
}

export interface TransactionData {
  name: string;
  amount: number;
  mobile: string;
  transaction_id: string;
  payment_time: string;
  payment_date: string;
  invoice_no: string;
  reference_id: string;
  payment_id: string;
  status: string;
  status_code: number;
  errorMessage: string | null;
}


@Component({
  selector: 'app-confirm-order',
  standalone: true,
  imports: [
    HeaderComponent,
    NgIf,
    RouterLink,
    DatePipe,
    ProgressSpinnerComponent
  ],
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss']
})
export class ConfirmOrderComponent implements OnInit {
  isSuccess: boolean = false;
  errorMessage: string = '';
  transactionData: TransactionData | null = null; // Change to single object
  transaction_id:string = '';
  invoice_no :string = '';
  ref_no : string = '';
  transactionStatusDetails: StatusDetail | null = null;
  is_loading:boolean=false;


  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private sessionStorage: SessionStorageService,
    private toastr: ToastrService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.transaction_id = params['id'];
      this.invoice_no = params['invoice_no'];
      this.ref_no = params['refNo'];
      if (this.invoice_no) {
        this.sessionStorage.removeItem('wishlist');
        this.fetchTransactionDetails(this.invoice_no,this.transaction_id,this.ref_no);
      } else {
        this.toastr.error('No transaction ID provided in the query parameters.');
      }
    });
  }

  fetchTransactionDetails(invoice_no: string, transaction_id: string, ref_no: string) {
    this.is_loading=true;
    this.apiService.post('cart/receipt_details', {
      "invoice_no": invoice_no,
      "ref_no": ref_no,
      "id": transaction_id
    }).subscribe(
      (res) => {
        if (res.success) {
          this.transactionData = res.data; // Assign as a single object
          this.transactionStatusDetails = this.getStatusDetails(this.transactionData?.status_code ?? -1);
          this.isSuccess = true;
          this.is_loading = false;
        } else {
          this.transactionData = res.data; // Assign even if success is false
          this.errorMessage = res.message || 'No transaction data found.';
          this.toastr.error(this.errorMessage);
          this.is_loading = false;
        }
      },
      (error) => {
        setTimeout(()=>{
          this.errorMessage = error.error.error;
          this.is_loading = false;
        },10000)
      },
    );
  }
  getStatusDetails(statusId: number): StatusDetail {
    switch (statusId) {
      case TransactionStatus.Created:
        return { status: "Created", description: "Transaction is created" };
      case TransactionStatus.Posted:
        return { status: "Posted", description: "Transaction is initiated from processor" };
      case TransactionStatus.Authorized:
        return { status: "Authorized", description: "Transaction is successful" };
      case TransactionStatus.Cancelled:
        return { status: "Cancelled", description: "Transaction is cancelled by user/bank" };
      case TransactionStatus.Failed:
        return { status: "Failed", description: "Transaction is failed" };
      case TransactionStatus.RefundAttempted:
        return { status: "Refund Attempted", description: "Full refund is initiated" };
      case TransactionStatus.Refunded:
        return { status: "Refunded", description: "Refund is settled" };
      case TransactionStatus.Success:
        return { status: "Success", description: "Transaction is settled" };
      case TransactionStatus.RefundFailed:
        return { status: "Refund Failed", description: "Refund is failed" };
      case TransactionStatus.Hold:
        return { status: "Hold", description: "Partial/Full refund initiated and pending from processor" };
      case TransactionStatus.PartialRefundAttempted:
        return { status: "Partial Refund Attempted", description: "Partial refund is initiated" };
      case TransactionStatus.PartiallyRefunded:
        return { status: "Partially Refunded", description: "Partial refund is settled" };
      case TransactionStatus.UserCancelled:
        return { status: "User Cancelled", description: "Transaction is cancelled by user/bank" };
      default:
        return { status: "Unknown", description: "Status not found" };
    }
  }

  print(){
    window.print()
  }
}
