import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { LoadingService } from 'src/services';
import { ELoadingState } from 'src/enums';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    /** */
    public openingTimeout: NodeJS.Timeout | null = null;
    /** */
    public active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    /** */
    public shouldClose: boolean = false;

    constructor(
        public loadingService: LoadingService
    ) { }

    public ngOnInit(): void {
        this.loadingService.state$.subscribe((state: ELoadingState) => {
            if (state === ELoadingState.CLOSED) {
                if (this.openingTimeout) {
                    this.shouldClose = true;
                }
                else {
                    this.active$.next(false);
                }
            }
            else if (state === ELoadingState.OPEN) {
                this.active$.next(true);
                this.shouldClose = false;

                this.openingTimeout = setTimeout(() => {
                    if (this.shouldClose) {
                        this.active$.next(false);
                    }
                    this.openingTimeout = null;
                }, 8000);
            }
        });
    }
}
