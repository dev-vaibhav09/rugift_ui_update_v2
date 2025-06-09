import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {Router, NavigationEnd} from '@angular/router';
import {filter, map, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor(
    private router: Router,
    private titleService: Title
  ) {
  }

  setTitleOnNavigation() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.router.routerState.root),
      map(route => {
        let child = route;
        while (child.firstChild) {
          child = child.firstChild;
        }
        return child;
      }),
      mergeMap(route => route.data)
    ).subscribe(event => {
      const pageTitle = event['title'];
      if (pageTitle) {
        this.titleService.setTitle(`RuGift | ${pageTitle}`);
      }
    });
  }
}
