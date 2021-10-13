import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from 'src/services';

@Component({
    selector: 'language-selector',
    templateUrl: './language-selector.component.html',
    styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements AfterViewInit {
    @Output() public onLoad: EventEmitter<void> = new EventEmitter();

    constructor(
        public translateService: TranslateService
    ) { }

    /**
     *
     */
    public async ngAfterViewInit(): Promise<void> {
        await this.translateService.setDefaultLanguage();
    }
}
