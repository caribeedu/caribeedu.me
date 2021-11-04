import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ELoadingState } from 'src/enums';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    /** Animation visible timeout */
    public activeTimeout: NodeJS.Timeout | null = null;
    /** Visible state */
    public readonly active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    /** Flag to mark as pending close */
    public shouldClose: boolean = false;

    constructor() {
        this.restartTimeout();
    }

    /**
     * changeState
     *
     * Emits loading state changes
     *
     * @param state - New state for loading
     */
    public changeState(state: ELoadingState): void {
        if (state === ELoadingState.OPEN) {
            this.openLoading();
        }
        else if (state === ELoadingState.CLOSED) {
            this.closeLoading();
        }
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
        }, 1000);
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
}
