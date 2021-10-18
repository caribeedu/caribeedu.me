import { AfterViewInit, Component } from '@angular/core';
import { TranslateService } from 'src/services';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    /**  */
    public skillsHelpActive: boolean = false;

    constructor(
        public translateService: TranslateService
    ) { }

    /** */
    public async ngAfterViewInit(): Promise<void> {

    }

    /**
     *
     */
    public changeHelpState(): void {
        this.skillsHelpActive = !this.skillsHelpActive;
    }
}
