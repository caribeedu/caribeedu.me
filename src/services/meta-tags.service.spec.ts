import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';

import { ITranslationMetadata } from 'src/interfaces';

import { MetaTagsService } from './meta-tags.service';

describe('MetaTagsService', () => {
    let service: MetaTagsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                Meta,
                Title
            ]
        });

        service = TestBed.inject(MetaTagsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#set', () => {
        let metaDouble: ITranslationMetadata;
        let versionDouble: string = 'https://caribeedu.me';

        beforeEach(() => {
            metaDouble = {
                description: 'Example description',
                title: 'Example Title'
            };
        });

        it('should call title #setTitle with given title', () => {
            const setTitleSpy: jasmine.Spy = spyOn(service.title, 'setTitle');

            service.set(metaDouble, versionDouble);

            expect(setTitleSpy).toHaveBeenCalledOnceWith(metaDouble.title);
        });

        it('should call meta #addTags with given basic tags', () => {
            const addTagsSpy: jasmine.Spy = spyOn(service.meta, 'addTags');

            service.set(metaDouble, versionDouble);

            expect(addTagsSpy).toHaveBeenCalledOnceWith(
                [
                    {
                        name: "description",
                        content: metaDouble.description
                    },
                    {
                        property: "og:site_name",
                        content: metaDouble.title
                    },
                    {
                        property: "og:title",
                        content: metaDouble.title
                    },
                    {
                        property: "og:description",
                        content: metaDouble.description
                    },
                    {
                        property: "og:url",
                        content: versionDouble
                    }
                ]
            );
        });
    });
});
