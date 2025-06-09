export enum TransactionStatus {
  Created = 0,
  Posted = 1,
  Authorized = 2,
  Cancelled = 4,
  Failed = 5,
  RefundAttempted = 9,
  Refunded = 10,
  Success = 16,
  RefundFailed = 19,
  Hold = 18,
  PartialRefundAttempted = 20,
  PartiallyRefunded = 21,
  UserCancelled = 22
}

