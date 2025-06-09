import {Route} from "@angular/router";

export const FULL_LAYOUT_ROUTES: Route[] = [
  {
    path: 'checkout',
    loadComponent: () => import('./../../pages/checkout/checkout.component').then(m => m.CheckoutComponent),
    data: {title: 'Checkout'},
  },
  {
    path: 'confirm-order',
    loadComponent: () => import('./../../pages/confirm-order/confirm-order.component').then(m => m.ConfirmOrderComponent),
    data: {title: 'Confirm Order'},
  },
  {
    path: 'your-order',
    loadComponent: () => import('./../../pages/order/transactions/transactions.component').then(m => m.TransactionsComponent),
    data: {title: 'PG Transaction'},
  },
  {
    path: 'your-order/voucher/:invoice_no',
    loadComponent: () => import('./../../pages/order/voucher-orders/voucher-orders.component').then(m => m.VoucherOrdersComponent),
    data: {title: 'Order Detail'},
  },
]
