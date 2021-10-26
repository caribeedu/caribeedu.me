import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';

import { ELoadingState } from 'src/enums';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;

    beforeEach(
        async () => {
            await TestBed.configureTestingModule({
                imports: [
                    AppModule
                ],
                schemas: [
                    CUSTOM_ELEMENTS_SCHEMA
                ]
            }).compileComponents();

            fixture = TestBed.createComponent(AppComponent);
            component = fixture.componentInstance;
        }
    );

    it('should create the app', () => {
        expect(component).toBeTruthy();

        expect(component.skillsHelpOpen).toEqual(false);
    });

    describe('#ngOnInit', () => {
        it('should call analyticsService #registerRouterEvents', () => {
            const registerSpy: jasmine.Spy = spyOn(component.analyticsService, 'registerRouterEvents');

            component.ngOnInit();

            expect(registerSpy).toHaveBeenCalledTimes(1);
        });
    });

    describe('#ngAfterViewInit', () => {
        let setDefaultSpy: jasmine.Spy;

        beforeEach(() => {
            setDefaultSpy = spyOn(component.translateService, 'setDefaultTranslation').and.resolveTo();
            component.ngOnInit();
        });

        it('should call translateService #setDefaultTranslation', async () => {
            await component.ngAfterViewInit();

            expect(setDefaultSpy).toHaveBeenCalledTimes(1);
        });

        it('should call loadingService #changeState with ELoadingState.CLOSED', async () => {
            const changeLoadingStateSpy: jasmine.Spy = spyOn(component.loadingService, 'changeState');

            await component.ngAfterViewInit();

            expect(changeLoadingStateSpy).toHaveBeenCalledOnceWith(ELoadingState.CLOSED);
        });
    });

    describe('#toggleHelpState', () => {
        it('should toggle the skills help open to inverse value', () => {
            component.skillsHelpOpen = false;

            component.toggleHelpState();

            expect(component.skillsHelpOpen).toEqual(true);
        });
    });
});
