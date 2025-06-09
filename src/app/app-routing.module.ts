import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ErrorPageComponent} from "./pages/error-page/error-page.component";
import {CONTENT_LAYOUT_ROUTES} from "./shared/routes/content-layout.routes";
import {ADMIN_AUTH_ROUTES} from "./shared/routes/admin_auth.routes";
import {adminGuard} from "./shared/guards/admin.guard";
import {authGuard} from "./shared/guards/auth.guard";
import {FULL_LAYOUT_ROUTES} from "./shared/routes/full-layout.routes";
import {OFFER_LAYOUT_ROUTES} from "./shared/routes/offer-layout.routes";


const routes: Routes = [
  {path: '', redirectTo: "", pathMatch: "full"},
  {
    path: '',
    loadComponent: () => import('./layouts/content-layout/content-layout.component').then(m => m.ContentLayoutComponent),
    children: CONTENT_LAYOUT_ROUTES
  },
  {
    path: '',
    loadComponent: () => import('./layouts/offer-layout/offer-layout.component').then(c => c.OfferLayoutComponent),
    children: OFFER_LAYOUT_ROUTES
  },
  {
    path: '',
    children: FULL_LAYOUT_ROUTES,
    loadComponent: () => import('./layouts/content-layout/content-layout.component').then(m => m.ContentLayoutComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    children: ADMIN_AUTH_ROUTES,
    loadComponent: () => import('./layouts/full-layout/full-layout.component').then(m => m.FullLayoutComponent),
    canActivate: [adminGuard],

  },
  {
    path: '**',
    component: ErrorPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top', // Scrolls to the top on navigation
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
