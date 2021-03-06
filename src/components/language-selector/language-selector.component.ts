import { Component } from '@angular/core';
import { TranslateService } from 'src/services';

@Component({
    selector: 'language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent {
    constructor(
        public translateService: TranslateService
    ) { }
}
