import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { ITranslationMetadata } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
    constructor(
        public meta: Meta,
        public title: Title
    ) { }

    /**
     * set
     *
     * Defines basic pre-specified meta tags with given translation data
     *
     * @param metadata - Title and description of in use language
     * @param versionUrl - Url of specified language version
     */
     public set(metadata: ITranslationMetadata, versionUrl: string): void {
        this.title.setTitle(metadata.title);
        this.meta.addTags([
            {
                name: "description",
                content: metadata.description
            },
            {
                property: "og:site_name",
                content: metadata.title
            },
            {
                property: "og:title",
                content: metadata.title
            },
            {
                property: "og:description",
                content: metadata.description
            },
            {
                property: "og:url",
                content: versionUrl
            }
        ]);
    }
}
