import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageSelectorComponent, SkillCategoryComponent, WorkExperienceComponent, WorkProjectComponent } from 'src/components';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
