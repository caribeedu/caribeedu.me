import { Component, Input } from '@angular/core';
import { IWorkProject } from 'src/interfaces';

@Component({
  selector: 'work-project',
  templateUrl: './work-project.component.html',
  styleUrls: ['./work-project.component.scss']
})
export class WorkProjectComponent {
    /** Project item data */
    @Input() public project: IWorkProject | undefined = undefined;
    /** Flag to mark as details open */
    public open: boolean = false;

    /**
     * toggleState
     *
     * Toggles the open flag value
     */
    public toggleState(): void {
        this.open = !this.open;
    }
}
