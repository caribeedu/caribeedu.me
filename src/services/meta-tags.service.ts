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
     *
     */
     public set(metadata: ITranslationMetadata, versionUrl: string, imageUrl: string): void {
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
