import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ELoadingState } from 'src/enums';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    /** Loading visible state subject */
    public readonly state$: BehaviorSubject<ELoadingState> = new BehaviorSubject<ELoadingState>(ELoadingState.OPEN);

    /**
     * changeState
     *
     * Emits loading state changes
     *
     * @param state - New state for loading
     */
    public changeState(state: ELoadingState): void {
        this.state$.next(state);
    }
}
