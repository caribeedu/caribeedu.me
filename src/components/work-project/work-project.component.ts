import { Component } from '@angular/core';

@Component({
  selector: 'work-project',
  templateUrl: './work-project.component.html',
  styleUrls: ['./work-project.component.scss']
})
export class WorkProjectComponent {
    /**  */
    public open: boolean = false;

    /**  */
    public toggleState(): void {
        this.open = !this.open;
    }
}
