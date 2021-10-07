import { AfterViewInit, Component } from '@angular/core';
import { DataService } from 'src/services';
import { IProfile } from '../interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
    /**  */
    public expHelpActive: boolean = false;
    /** */
    public data: IProfile | undefined;

    constructor(
        public dataService: DataService
    ) { }

    /** */
    public async ngAfterViewInit(): Promise<void> {
        this.data = await this.dataService.fetch();
    }

    /**
     *
     */
    public changeHelpState(): void {
        this.expHelpActive = !this.expHelpActive;
    }
}
