import { ComponentFixture, TestBed } from '@angular/core/testing';

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
        }
    );

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component.loadingService).toBeDefined();
    });
});
