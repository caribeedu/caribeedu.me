import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnalyticsService } from './analytics.service';

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
});
