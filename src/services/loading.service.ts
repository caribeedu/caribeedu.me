import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
    /** */
    public readonly activeState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

    /**
     *
     */
    public changeState(active: boolean): void {
        this.activeState$.next(active);
    }
}
