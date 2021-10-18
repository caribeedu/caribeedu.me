import { AfterViewInit, Component } from '@angular/core';
import { LoadingService, TranslateService } from 'src/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    /**  */
    public skillsHelpActive: boolean = false;

    constructor(
        public translateService: TranslateService,
        public loadingService: LoadingService
    ) { }

    /** */
    public async ngAfterViewInit(): Promise<void> {
        await this.translateService.setDefaultLanguage();
        this.loadingService.changeState(false);
    }

    /**
     *
     */
    public changeHelpState(): void {
        this.skillsHelpActive = !this.skillsHelpActive;
    }
}
