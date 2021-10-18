import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITranslateOption, ITranslation } from 'src/interfaces';
import { environment } from 'src/environments/environment';
import { parse, ParsedDomain, ParseError } from 'psl';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
    /** */
    public selectedLanguage: string | undefined = undefined;
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
    public async getLanguages(): Promise<void> {
        this.translationOptions = await this.http.get(
            environment.bucketUrl + 'i18n/manifest.json',
            {
                responseType: 'json'
            }
        ).toPromise() as Array<ITranslateOption>;
    }

    /**
     *
     */
    public async setDefaultLanguage(): Promise<void> {
        const initials: string | null = this.getDomainLanguage();
        await this.getLanguages();

        let language: ITranslateOption | undefined = this.translationOptions.find(language => language.initials === initials);

        if (!language) {
            // If translation isn't available, get default english version
            language = this.translationOptions.find(language => language.initials === 'en');
        }

        this.selectedLanguage = language!.initials;
        this.activeTranslation = await this.http.get(language!.translation, { responseType: 'json' }).toPromise() as ITranslation;
    }

    /**
     *
     */
    public getDomainLanguage(): string | null {
        const parsedData: ParsedDomain | ParseError = parse(window.location.host);
        return (parsedData as ParsedDomain)?.subdomain || null;
    }
}
