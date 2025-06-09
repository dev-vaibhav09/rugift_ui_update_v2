import {Route} from "@angular/router";

export const ADMIN_AUTH_ROUTES: Route[] = [
  {
    path: 'dashboard',
    loadComponent: () => import('./../../admin/dashboard/dashboard.component').then(c => c.DashboardComponent),
    data: {title: 'View Admin Dashboard'},
  },
  {
    path: 'report/pg-transaction',
    loadComponent: () => import('./../../admin/report/pg-transaction/pg-transaction.component').then(c => c.PgTransactionComponent),
    data: {title: 'View PG Transactions'},

  },
  {
    path: 'report/vd-transaction',
    loadComponent: () => import('./../../admin/report/vd-transaction/vd-transaction.component').then(c => c.VdTransactionComponent),
    data: {title: 'View VD Transactions'},
  },
  {
    path: 'report/pg-transaction/:invoice_no',
    loadComponent: () => import('./../../admin/report/vouchers-report/vouchers-report.component').then(m => m.VouchersReportComponent),
    data: {title: 'Order Detail'},
  },

]
