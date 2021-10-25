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
    /** Active language initials */
    public selectedLanguage: string | undefined = undefined;
    /** Active translation */
    public activeTranslation: ITranslation | null = null;
    /** Language translation available options */
    public translationOptions: Array<ITranslateOption> = [];
    /** Bucket repository url */
    public readonly bucketUrl: string = environment.bucketUrl;

    constructor(
        public http: HttpClient,
        public metaTagsService: MetaTagsService
    ) { }

    /** Current host */
    public get host(): string {
        return window.location.host;
    }

    /**
     *  getTranslations
     *
     *  Fetch translations options manifest
     */
    public async getTranslations(): Promise<void> {
        this.translationOptions = await this.http.get<Array<ITranslateOption>>(
            this.bucketUrl + 'i18n/manifest.json',
            {
                responseType: 'json'
            }
        ).toPromise();
    }

    /**
     * setDefaultTranslation
     *
     * Defines translation in use by subdomain or set's default
     */
    public async setDefaultTranslation(): Promise<void> {
        const initials: string | null = this.getDomainLanguage();
        await this.getTranslations();

        let language: ITranslateOption | undefined = this.translationOptions.find(language => language.initials === initials);

        if (!language) {
            // If translation isn't available, get default english version
            language = this.translationOptions.find(language => language.initials === 'en');
        }

        // Get translated data
        this.activeTranslation = await this.http.get<ITranslation>(language!.translation, { responseType: 'json' }).toPromise();
        // Set active language initials
        this.selectedLanguage = language!.initials;

        // Create translated version url, if isn't default
        const versionUrl: string  = `https://${this.selectedLanguage === 'en' ? '' : this.selectedLanguage + '.'}caribeedu.me`;

        // Changes the active meta tags value
        this.metaTagsService.set(this.activeTranslation.meta, versionUrl);
    }

    /**
     * getDomainLanguage
     *
     * Gets the subdomain active of host
     *
     * @returns Subdomain value
     */
    public getDomainLanguage(): string | null {
        const parsedData: ParsedDomain | ParseError = parse(this.host);
        return (parsedData as ParsedDomain)?.subdomain || null;
    }
}
