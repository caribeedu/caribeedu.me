import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ELoadingState } from 'src/enums';

import { LoadingService } from 'src/services';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
    let component: LoadingComponent;
    let fixture: ComponentFixture<LoadingComponent>;

    beforeEach(
        async () => {
            await TestBed.configureTestingModule({
                declarations: [
                    LoadingComponent
                ],
                providers: [
                    LoadingService
                ]
            })
            .compileComponents();

            fixture = TestBed.createComponent(LoadingComponent);
            component = fixture.componentInstance;

            spyOn(component.loadingService, 'changeState');
        }
    );

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('#ngOnInit', () => {
        it('should call #restartTimeout before #handleStateChanges is called', () => {
            const restartSpy: jasmine.Spy = spyOn(component, 'restartTimeout');
            const handleStateSpy: jasmine.Spy = spyOn(component, 'handleStateChanges');

            component.ngOnInit();

            expect(restartSpy).toHaveBeenCalledBefore(handleStateSpy);
        });
    });

    describe('#handleStateChanges', () => {
        it('should subscribe to loadingService state$', () => {
            const subscribeSpy: jasmine.Spy = spyOn(component.loadingService.state$, 'subscribe');

            component.handleStateChanges();

            expect(subscribeSpy).toHaveBeenCalledTimes(1);
        });

        it('should call #openLoading if state$ emitted value is ELoadingState.OPEN', () => {
            const openLoadingSpy: jasmine.Spy = spyOn(component, 'openLoading');

            component.handleStateChanges();

            component.loadingService.state$.next(ELoadingState.OPEN);
            expect(openLoadingSpy).toHaveBeenCalled();
        });

        it('should call #closeLoading if state$ emitted value is ELoadingState.CLOSED', () => {
            const closeLoadingSpy: jasmine.Spy = spyOn(component, 'closeLoading');

            component.handleStateChanges();

            component.loadingService.state$.next(ELoadingState.CLOSED);
            expect(closeLoadingSpy).toHaveBeenCalled();
        });
    });

    describe('#openLoading', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should call active$ #next', () => {
            const nextSpy: jasmine.Spy = spyOn(component.active$, 'next');

            component.openLoading();

            expect(nextSpy).toHaveBeenCalledOnceWith(true);
        });

        it('should set shouldClose to false', () => {
            component.shouldClose = true;

            component.openLoading();

            expect(component.shouldClose).toEqual(false);
        });

        it('should call #restartTimeout', () => {
            const restartSpy: jasmine.Spy = spyOn(component, 'restartTimeout');

            component.openLoading();

            expect(restartSpy).toHaveBeenCalled();
        });
    });

    describe('#restartTimeout', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should set activeTimeout as active timeout', () => {
            component.activeTimeout = null;

            component.restartTimeout();

            expect(component.activeTimeout).toBeInstanceOf(Number);
        });
    });

    describe('#closeLoading', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should set shouldClose to true if activeTimeout is defined', () => {
            component.shouldClose = false;
            component.activeTimeout = setTimeout(() => {}, 10000);

            component.closeLoading();

            expect(component.shouldClose).toEqual(true);
        });

        it('should call active$ #next if activeTimeout isn\'t defined', () => {
            const nextSpy: jasmine.Spy = spyOn(component.active$, 'next');
            component.activeTimeout = null;

            component.closeLoading();

            expect(nextSpy).toHaveBeenCalledOnceWith(false);
        });
    });

    describe('#ngOnDestroy', () => {
        beforeEach(() => {
            component.ngOnInit();
        });

        it('should call destroy$ #next', () => {
            const nextSpy: jasmine.Spy = spyOn(component.destroy$, 'next');

            component.ngOnDestroy();

            expect(nextSpy).toHaveBeenCalledOnceWith();
        });

        it('should call destroy$ #complete', () => {
            const completeSpy: jasmine.Spy = spyOn(component.destroy$, 'complete');

            component.ngOnDestroy();

            expect(completeSpy).toHaveBeenCalledOnceWith();
        });
    });
});
