import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageSelectorComponent, SkillCategoryComponent, WorkExperienceComponent, WorkProjectComponent } from 'src/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TranslateService } from '../services';

@NgModule({
    declarations: [
        AppComponent,
        LanguageSelectorComponent,
        SkillCategoryComponent,
        WorkExperienceComponent,
        WorkProjectComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        TranslateService
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
