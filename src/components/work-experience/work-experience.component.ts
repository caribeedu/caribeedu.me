import { Component, Input } from '@angular/core';

import { IWorkExperience } from 'src/interfaces';
import { TranslateService } from 'src/services';

@Component({
  selector: 'work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
    /** Experience item data */
    @Input() public experience: IWorkExperience | undefined = undefined;

    constructor(
        public translateService: TranslateService
    ) {}
}
