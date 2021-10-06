import { Component } from '@angular/core';
import { IProfile } from '../interfaces';

import jsonData from '../data_mockup.json';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**  */
    public expHelpActive: boolean = false;
    /** */
    public data: IProfile = jsonData;

    /**
     *
     */
    public changeHelpState(): void {
        this.expHelpActive = !this.expHelpActive;
    }
}
