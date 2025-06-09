import {Route} from "@angular/router";

export const OFFER_LAYOUT_ROUTES: Route[] = [

  {
    path: 'offer',
    loadComponent:() => import('./../../pages/landing-page/landing-page.component').then(c => c.LandingPageComponent),
  },
]
