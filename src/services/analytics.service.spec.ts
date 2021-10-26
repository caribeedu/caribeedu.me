import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { AnalyticsService } from './analytics.service';

(window as any).gtag = (param1: string, param2: string, param3: Object) => {
    console.log('GTAG', { param1, param2, param3 });
}

describe('AnalyticsService', () => {
    let service: AnalyticsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule.withRoutes([])
            ]
        });

        service = TestBed.inject(AnalyticsService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('#registerRouterEvents', () => {

        it('should pipe router events with NavigationEnd filter', () => {
            const pipeSpy: jasmine.Spy = spyOn(service.router.events, 'pipe').and.returnValue(of(jasmine.any(Event)));

            service.registerRouterEvents();

            expect(pipeSpy).toHaveBeenCalled();
        });

        it('should subscribe filtered router events', () => {
            const subscribeSpy: jasmine.Spy = spyOn(service.router.events, 'subscribe');

            service.registerRouterEvents();

            expect(subscribeSpy).toHaveBeenCalled();
        });
    });
});
