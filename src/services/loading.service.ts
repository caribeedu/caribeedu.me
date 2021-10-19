import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ELoadingState } from 'src/enums';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    /** */
    public readonly state$: BehaviorSubject<ELoadingState> = new BehaviorSubject<ELoadingState>(ELoadingState.OPEN);

    /**
     *
     */
    public changeState(state: ELoadingState): void {
        this.state$.next(state);
    }
}
