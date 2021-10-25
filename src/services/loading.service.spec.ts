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
        expect(service.state$).toEqual(new BehaviorSubject<ELoadingState>(ELoadingState.OPEN));
    });

    describe('#changeState', () => {
        let nextSpy: jasmine.Spy;

        beforeEach(() => {
            nextSpy = spyOn(service.state$, 'next').and.callThrough();
        });

        it('should call state$ #next with given state', () => {
            const double: ELoadingState = ELoadingState.CLOSED;

            service.changeState(double);

            expect(service.state$.value).toEqual(ELoadingState.CLOSED);
            expect(nextSpy).toHaveBeenCalledOnceWith(ELoadingState.CLOSED);
        });
    });
});
