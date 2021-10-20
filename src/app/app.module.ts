import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {
    LanguageSelectorComponent,
    SkillCategoryComponent,
    WorkExperienceComponent,
    WorkProjectComponent,
    LoadingComponent
} from 'src/components';
import { LoadingService, TranslateService, MetaTagsService } from 'src/services';

@NgModule({
    declarations: [
        AppComponent,
        LanguageSelectorComponent,
        SkillCategoryComponent,
        WorkExperienceComponent,
        WorkProjectComponent,
        LoadingComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        TranslateService,
        LoadingService,
        MetaTagsService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
