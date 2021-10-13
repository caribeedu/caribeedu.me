import { Component, Input } from '@angular/core';
import { IWorkProject } from 'src/interfaces';

@Component({
  selector: 'work-project',
  templateUrl: './work-project.component.html',
  styleUrls: ['./work-project.component.scss']
})
export class WorkProjectComponent {
    /**  */
    @Input() public project: IWorkProject | undefined;
    /**  */
    public open: boolean = false;

    /**  */
    public toggleState(): void {
        this.open = !this.open;
    }
}
