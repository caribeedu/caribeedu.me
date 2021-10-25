import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import * as psl from 'psl';
import { of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { MetaTagsService, TranslateService } from '.';
import { ITranslateOption, ITranslation } from 'src/interfaces';

describe('TranslateService', () => {
    let service: TranslateService;
    let options: Array<ITranslateOption>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                MetaTagsService,
                HttpClient
            ],
            imports: [
                HttpClientModule
            ]
        });

        service = TestBed.inject(TranslateService);

        options = [
            {
                language: "English",
                initials: "en",
                flagCountry: "United States",
                flag: "i18n/en-US/us-flag.png",
                translation: "i18n/en-US/en-US.json"
            },
            {
                language: "Português Brasil",
                initials: "pt",
                flagCountry: "Brasil",
                flag: "i18n/pt-BR/brazil-flag.png",
                translation: "i18n/pt-BR/pt-BR.json"
            }
        ];
    });

    it('should be created', () => {
        expect(service).toBeTruthy();

        expect(service.bucketUrl).toEqual(environment.bucketUrl);
        expect(service.host).toEqual(window.location.host);

        expect(service.selectedLanguage).toEqual(undefined);
        expect(service.activeTranslation).toEqual(null);
        expect(service.translationOptions).toEqual([]);
    });

    describe('#getTranslations', () => {
        let getSpy: jasmine.Spy;

        beforeEach(() => {
            getSpy = spyOn(service.http, 'get').and.returnValue(of(options));
        })

        it('should fetch translations manifest from bucket url', async () => {
            await service.getTranslations();

            expect(getSpy).toHaveBeenCalledOnceWith(`${service.bucketUrl}i18n/manifest.json`, { responseType: 'json' });
        });

        it('should set translationOptions with response', async () => {
            await service.getTranslations();

            expect(service.translationOptions).toEqual(options);
        });
    });

    describe('#setDefaultTranslation', () => {
        let getDomainLanguageSpy: jasmine.Spy;
        let getTranslationsSpy: jasmine.Spy;
        let getSpy: jasmine.Spy;

        let translationDouble: Partial<ITranslation>;

        beforeEach(() => {
            translationDouble = {
                meta: {
                    title: "Full-Stack Developer - Edu Caribé",
                    description: "A software developer with 4 years of experience in web and mobile apps, in a variety of tech stacks. Strong with Node.js and C#, and an AWS Certified."
                }
            };

            getSpy = spyOn(service.http, 'get').and.returnValue(
                of({ ...translationDouble })
            );
            getDomainLanguageSpy = spyOn(service, 'getDomainLanguage').and.returnValue(null);
            getTranslationsSpy = spyOn(service, 'getTranslations');

            service.translationOptions = options;
        });

        it('should call #getDomainLanguage', async () => {
            await service.setDefaultTranslation();

            expect(getDomainLanguageSpy).toHaveBeenCalledTimes(1);
        });

        it('should call #getTranslations', async () => {
            await service.setDefaultTranslation();

            expect(getTranslationsSpy).toHaveBeenCalledTimes(1);
        });

        it('should fetch translation from url of selectedLanguage option', async () => {
            await service.setDefaultTranslation();

            expect(getSpy).toHaveBeenCalledOnceWith(
                service.translationOptions.find(option => option.initials === 'en')!.translation,
                { responseType: 'json' }
            );
        });

        it('should set selectedLanguage with found translation option where initials is equal as returned in #getDomainLanguage', async () => {
            const subdomainDouble: string = 'pt';

            getDomainLanguageSpy.and.returnValue(subdomainDouble);

            await service.setDefaultTranslation();

            expect(service.selectedLanguage).toEqual(subdomainDouble);
        });

        it('should set selectedLanguage as \'en\' if no translationOption found with#getDomainLanguage', async () => {
            await service.setDefaultTranslation();

            expect(service.selectedLanguage).toEqual('en');
        });

        it('should call metaTagsService #set with translation meta and translation version url', async () => {
            const setSpy: jasmine.Spy = spyOn(service.metaTagsService, 'set');

            await service.setDefaultTranslation();

            expect(setSpy).toHaveBeenCalledWith(translationDouble.meta, 'https://caribeedu.me');
        });
    });

    describe('#getDomainLanguage', () => {
        let locationSpy: jasmine.Spy;

        beforeEach(() => {
            locationSpy = spyOnProperty(service, 'host', 'get').and.returnValue('example.caribeedu.me');
        })

        it('should call psl package #parse with window location host', () => {
            let parseSpy: jasmine.Spy;
            parseSpy = spyOn(psl, 'parse');

            service.getDomainLanguage();

            expect(parseSpy).toHaveBeenCalledWith('example.caribeedu.me');
        });

        it('should return subdomain if exists', () => {
            const subdomain: string | null = service.getDomainLanguage();

            expect(subdomain).toEqual('example');
        });

        it('should return null if subdomain doesn\'t exist', () => {
            locationSpy.and.returnValue('caribeedu.me');

            const subdomain: string | null = service.getDomainLanguage();

            expect(subdomain).toEqual(null);
        });
    });
});
