import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITranslateOption, ITranslation } from 'src/interfaces';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
    /** */
    public selectedLanguage: string | undefined = 'PT';
    /** */
    public activeTranslation: ITranslation | null = null;
    /** */
    public translationOptions: Array<ITranslateOption> = [];

    constructor(
        public http: HttpClient
    ) { }

    /**
     *
     */
    public async getLanguages(): Promise<Array<ITranslateOption>> {
        this.translationOptions = await this.http.get(
            environment.bucketUrl + 'i18n/manifest.json',
            {
                responseType: 'json'
            }
        ).toPromise() as Array<ITranslateOption>;

        return this.translationOptions;
    }

    /**
     *
     */
    public async setDefaultLanguage(): Promise<void> {
        const language: ITranslateOption | undefined = (await this.getLanguages()).find(language => language.initials === this.selectedLanguage);

        if (!language) {
            return;
        }

        this.activeTranslation = await this.http.get(language?.translation, { responseType: 'json' }).toPromise() as ITranslation;
    }
}
