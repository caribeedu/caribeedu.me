import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { parse, ParsedDomain, ParseError } from 'psl';

import { ITranslateOption, ITranslation } from 'src/interfaces';
import { MetaTagsService } from './meta-tags.service';

import { environment } from 'src/environments/environment';

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
        public http: HttpClient,
        public metaTagsService: MetaTagsService
    ) { }

    /**
     *
     */
    public async getTranslations(): Promise<void> {
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
    public async setDefaultTranslation(): Promise<void> {
        const initials: string | null = this.getDomainLanguage();
        await this.getTranslations();

        let language: ITranslateOption | undefined = this.translationOptions.find(language => language.initials === initials);

        if (!language) {
            // If translation isn't available, get default english version
            language = this.translationOptions.find(language => language.initials === 'en');
        }

        this.activeTranslation = await this.http.get(language!.translation, { responseType: 'json' }).toPromise() as ITranslation;
        this.selectedLanguage = language!.initials;

        // Create translated version url, if isn't default
        const versionUrl: string  = `https://${language!.initials === 'en' ? '' : language!.initials + '.'}caribeedu.me`;

        this.metaTagsService.set(this.activeTranslation.meta, versionUrl, this.activeTranslation.content.photo);
    }

    /**
     *
     */
    public getDomainLanguage(): string | null {
        const parsedData: ParsedDomain | ParseError = parse(window.location.host);
        return (parsedData as ParsedDomain)?.subdomain || null;
    }
}
