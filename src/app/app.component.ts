import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    /**  */
    public expHelpActive: boolean = false;

    /**
     *
     */
    public changeHelpState(): void {
        this.expHelpActive = !this.expHelpActive;
    }
}
