import { Component, Input } from '@angular/core';
import { ISkillCategory } from 'src/interfaces';

@Component({
  selector: 'skill-category',
  templateUrl: './skill-category.component.html',
  styleUrls: ['./skill-category.component.scss']
})
export class SkillCategoryComponent {
    /**  */
    @Input() public skill: ISkillCategory | undefined;
}
