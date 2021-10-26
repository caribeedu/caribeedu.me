import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { LoadingService } from 'src/services';
import { ELoadingState } from 'src/enums';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
    /** Animation visible timeout */
    public activeTimeout: NodeJS.Timeout | null = null;
    /** Visible state */
    public active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    /** Component destroy event emitter */
    public destroy$: Subject<void> = new Subject<void>();
    /** Flag to mark as pending close */
    public shouldClose: boolean = false;

    constructor(
        public loadingService: LoadingService
    ) { }

    /**
     * ngOnInit
     *
     * Part of Angular lifecycle, executed after first onChanges
    */
    public ngOnInit(): void {
        this.restartTimeout();
        this.handleStateChanges();
    }

    /**
     * handleStateChanges
     *
     * Subscribes to loading service state changes and handles it
    */
    public handleStateChanges(): void {
        this.loadingService.state$
            .pipe(takeUntil(this.destroy$))
            .subscribe((state: ELoadingState) => {
                if (state === ELoadingState.OPEN) {
                    this.openLoading();
                }
                else if (state === ELoadingState.CLOSED) {
                    this.closeLoading();
                }
        });
    }

    /**
     * openLoading
     *
     * Set loading as visible and restart visible timeout
    */
    public openLoading(): void {
        this.active$.next(true);
        this.shouldClose = false;
        this.restartTimeout();
    }

    /**
     * restartTimeout
     *
     * Re-start the visible animation timeout
     */
    public restartTimeout(): void {
        this.activeTimeout = setTimeout(() => {
            if (this.shouldClose) {
                this.active$.next(false);
            }
            this.activeTimeout = null;
        }, 2000);
    }

    /**
     * closeLoading
     *
     * Validate if animation timeout is defined (active), if so, mark component should close prop as `true`, otherwise, set loading as hidden
    */
    public closeLoading(): void {
        if (this.activeTimeout !== null) {
            this.shouldClose = true;
        }
        else {
            this.active$.next(false);
        }
    }

    /**
     * ngOnDestroy
     *
     * Part of Angular lifecycle, executed before component is destroyed
    */
    public ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
