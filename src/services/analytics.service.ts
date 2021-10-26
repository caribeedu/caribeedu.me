import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

declare const gtag: Function;

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
    constructor(
        public router: Router
    ) {}

    /**
     * registerRouterEvents
     *
     * Listens to route changes for google analytics metric evaluations
     */
    public registerRouterEvents(): void {
        this.router.events
            .pipe(
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe((event) =>
                gtag(
                    'event',
                    'page_view',
                    {
                        page_path: (event as NavigationEnd).urlAfterRedirects || '/'
                    }
                )
            );
    }
}
