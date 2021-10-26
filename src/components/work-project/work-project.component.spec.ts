import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkProjectComponent } from './work-project.component';

describe('WorkProjectComponent', () => {
    let component: WorkProjectComponent;
    let fixture: ComponentFixture<WorkProjectComponent>;

    beforeEach(
        async () => {
            await TestBed.configureTestingModule({
                declarations: [
                    WorkProjectComponent
                ]
            })
            .compileComponents();

            fixture = TestBed.createComponent(WorkProjectComponent);
            component = fixture.componentInstance;
        }
    );

    it('should create', () => {
        expect(component).toBeTruthy();

        expect(component.project).toEqual(undefined);
        expect(component.open).toEqual(false);
    });

    describe('#toggleState', () => {
        it('should toggle the open to inverse value', () => {
            component.open = false;

            component.toggleState();

            expect(component.open).toEqual(true);
        });
    });
});
