import { AfterViewInit, Component, OnInit } from '@angular/core';

import { ELoadingState } from 'src/enums';
import { LoadingService, TranslateService, AnalyticsService } from 'src/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    /** Flag to mark as skills help open */
    public skillsHelpOpen: boolean = false;

    constructor(
        public translateService: TranslateService,
        public loadingService: LoadingService,
        public analyticsService: AnalyticsService
    ) { }

    /**
     * ngOnInit
     *
     * Part of Angular lifecycle, executed after first onChanges
    */
    public ngOnInit(): void {
        this.analyticsService.registerRouterEvents();
    }

    /**
     * ngAfterViewInit
     *
     * Part of Angular lifecycle, executed after first afterContentChecked
     */
    public async ngAfterViewInit(): Promise<void> {
        await this.translateService.setDefaultTranslation();
        this.loadingService.changeState(ELoadingState.CLOSED);
    }

    /**
     * toggleHelpState
     *
     * Toggles the skills help open flag value
     */
     public toggleHelpState(): void {
        this.skillsHelpOpen = !this.skillsHelpOpen;
    }
}
