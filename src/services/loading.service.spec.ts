import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

import { ELoadingState } from 'src/enums';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
    let service: LoadingService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LoadingService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
        expect(service.active$).toEqual(new BehaviorSubject<boolean>(true));
    });

    describe('#changeState', () => {
        it('should call #openLoading if state emitted value is ELoadingState.OPEN', () => {
            const openLoadingSpy: jasmine.Spy = spyOn(service, 'openLoading');

            service.changeState(ELoadingState.OPEN);

            expect(openLoadingSpy).toHaveBeenCalled();
        });

        it('should call #closeLoading if state emitted value is ELoadingState.CLOSED', () => {
            const closeLoadingSpy: jasmine.Spy = spyOn(service, 'closeLoading');

            service.changeState(ELoadingState.CLOSED);

            expect(closeLoadingSpy).toHaveBeenCalled();
        });
    });

    describe('#openLoading', () => {
        it('should call active$ #next', () => {
            const nextSpy: jasmine.Spy = spyOn(service.active$, 'next');

            service.openLoading();

            expect(nextSpy).toHaveBeenCalledOnceWith(true);
        });

        it('should set shouldClose to false', () => {
            service.shouldClose = true;

            service.openLoading();

            expect(service.shouldClose).toEqual(false);
        });

        it('should call #restartTimeout', () => {
            const restartSpy: jasmine.Spy = spyOn(service, 'restartTimeout');

            service.openLoading();

            expect(restartSpy).toHaveBeenCalled();
        });
    });

    describe('#restartTimeout', () => {
        it('should set activeTimeout as active timeout', () => {
            service.activeTimeout = null;

            service.restartTimeout();

            expect(service.activeTimeout).toBeInstanceOf(Number);
        });
    });

    describe('#closeLoading', () => {
        it('should set shouldClose to true if activeTimeout is defined', () => {
            service.shouldClose = false;
            service.activeTimeout = setTimeout(() => {}, 10000);

            service.closeLoading();

            expect(service.shouldClose).toEqual(true);
        });

        it('should call active$ #next if activeTimeout isn\'t defined', () => {
            const nextSpy: jasmine.Spy = spyOn(service.active$, 'next');
            service.activeTimeout = null;

            service.closeLoading();

            expect(nextSpy).toHaveBeenCalledOnceWith(false);
        });
    });
});
