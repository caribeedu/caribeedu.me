import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkExperienceComponent } from './work-experience.component';

describe('WorkExperienceComponent', () => {
    let component: WorkExperienceComponent;
    let fixture: ComponentFixture<WorkExperienceComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                WorkExperienceComponent
            ],
            providers: [
                HttpClient
            ],
            imports: [
                HttpClientModule
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WorkExperienceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(component.experience).toEqual(undefined);
    });
});
