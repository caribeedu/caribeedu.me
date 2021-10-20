import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ELoadingState } from 'src/enums';
import { LoadingService, TranslateService, AnalyticsService } from 'src/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    /**  */
    public skillsHelpActive: boolean = false;

    constructor(
        public translateService: TranslateService,
        public loadingService: LoadingService,
        public analyticsService: AnalyticsService
    ) { }

    /**
     *
     */
    public ngOnInit(): void {
        this.analyticsService.registerRouterEvents();
    }

    /**
     *
     */
    public async ngAfterViewInit(): Promise<void> {
        await this.translateService.setDefaultTranslation();
        this.loadingService.changeState(ELoadingState.CLOSED);
    }

    /**
     *
     */
    public changeHelpState(): void {
        this.skillsHelpActive = !this.skillsHelpActive;
    }
}
