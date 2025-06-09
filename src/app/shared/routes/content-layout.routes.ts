import {Route} from "@angular/router";

export const CONTENT_LAYOUT_ROUTES: Route[] = [

  {
    path: '',
    loadComponent: () => import('./../../pages/Home/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'vouchers/:category',
    loadComponent: () => import('./../../pages/brand-vouchers/brand-vouchers.component').then(m => m.BrandVouchersComponent),
    data: {title: 'Brand Voucher'},
  },
  {
    path: 'choose_category',
    loadComponent: () => import('./../../pages/choose-category/choose-category.component').then(m => m.ChooseCategoryComponent),
    data: {title: 'Choose Category'},
  },
  {
    path: 'vouchers/details/:brand_code',
    loadComponent: () => import('./../../pages/vouchers-details/vouchers-details.component').then(m => m.VouchersDetailsComponent),
    data: {title: 'Voucher Detail'},
  },
  {
    path: 'cart',
    loadComponent: () => import('./../../pages/cart/cart.component').then(m => m.CartComponent),
    data: {title: 'Cart'},
  },
  {
    path: 'sign-up',
    loadComponent: () => import('./../../pages/sign-up/sign-up.component').then(m => m.SignUpComponent),
    data: {title: 'Sign Up'},
  },
  {
    path: 'sign-in',
    loadComponent: () => import('./../../pages/sign-in/sign-in.component').then(m => m.SignInComponent),
    data: {title: 'Sign In '},
  },
  {
    path: 'contact',
    loadComponent: () => import('./../../pages/contact-us/contact-us.component').then(m => m.ContactUsComponent),
    data: {title: 'Contact'},
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./../../admin/auth/login/login.component').then(c => c.LoginComponent),
    data: {title: 'Login'},
  },
  {
    path: 'privacy-policy',
    loadComponent: () => import('./../../pages/privacy-policy/privacy-policy.component').then(c => c.PrivacyPolicyComponent),
    data: {title: 'Privacy Policy'},
  },
  {
    path: 'terms-and-conditions',
    loadComponent: () => import('./../../pages/term-and-condtion/term-and-condtion.component').then(c => c.TermAndCondtionComponent),
    data: {title: 'Terms And Conditions'},
  },
  {
    path: 'disclaimer',
    loadComponent: () => import('./../../pages/disclaimer/disclaimer.component').then(c => c.DisclaimerComponent),
    data: {title: 'Disclaimer'},
  },
  {
    path: 'refund-and-cancellations',
    loadComponent: () => import('./../../pages/refund-and-cancellations/refund-and-cancellations.component').then(c => c.RefundAndCancellationsComponent),
    data: {title: 'Refund And Cancellations'},
  },
  {
    path: 'awards',
    loadComponent: () => import('./../../pages/awards/awards.component').then(c => c.AwardsComponent),
    data: {title: 'Awards'},
  },
  {
    path: 'news',
    loadComponent: () => import('./../../pages/news/news.component').then(c => c.NewsComponent),
    data: {title: 'News'},
  },
  {
    path: 'business',
    loadComponent: () => import('./../../pages/corporate-business/corporate-business.component').then(c => c.CorporateBusinessComponent),
    data: {title: 'Business'},
  },
  {
    path: 'about',
    loadComponent: () => import('./../../pages/about/about.component').then(c => c.AboutComponent),
    data: {title: 'About'},
  },
]
