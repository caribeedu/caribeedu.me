import { Component, Input, OnInit } from '@angular/core';
import { IWorkExperience } from 'src/interfaces';

@Component({
  selector: 'work-experience',
  templateUrl: './work-experience.component.html',
  styleUrls: ['./work-experience.component.scss']
})
export class WorkExperienceComponent {
    /**  */
    @Input() public experience: IWorkExperience | undefined;
}
