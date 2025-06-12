import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationStart, Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {TitleService} from "./shared/services/title.service";
import {AesHelperService} from "./shared/services/rucards-res-decoder.service";

@Component({
  selector: 'app-root',
  template: `
    @if (loading) {
      <app-spinner>Loading</app-spinner>
    }
    <router-outlet></router-outlet>`

})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  loading: boolean = true;
  private unsubscribe$: Subject<void> = new Subject<void>();
  constructor(private router: Router,
              private titleService: TitleService) {
  }

  async ngOnInit() {
    this.titleService.setTitleOnNavigation();

  }

  ngAfterViewInit(): void {
    this.router.events
      .pipe(takeUntil(this.unsubscribe$)) // Unsubscribe to prevent memory leaks
      .subscribe((event) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
           window.scrollTo({ top: 0, behavior: 'smooth' });
          setTimeout(() => {
            this.loading = false;
          }, 1000)
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}

