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
    /** */
    public activeTimeout: NodeJS.Timeout | null = null;
    /** */
    public active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    /** */
    public destroy$: Subject<void> = new Subject<void>();
    /** */
    public shouldClose: boolean = false;

    constructor(
        public loadingService: LoadingService
    ) { }

    /**
     *
    */
    public ngOnInit(): void {
        this.handleStateChanges();
    }

    /**
     *
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
     *
    */
    public openLoading(): void {
        this.active$.next(true);
        this.shouldClose = false;

        this.activeTimeout = setTimeout(() => {
            if (this.shouldClose) {
                this.active$.next(false);
            }
            this.activeTimeout = null;
        }, 3200);
    }

    /**
     *
    */
    public closeLoading(): void {
        if (this.activeTimeout) {
            this.shouldClose = true;
        }
        else {
            this.active$.next(false);
        }
    }

    /**
     *
    */
    public ngOnDestroy(): void {
        this.destroy$.next();
    }
}
