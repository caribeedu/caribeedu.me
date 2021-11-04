import { Component } from '@angular/core';

import { LoadingService } from 'src/services';
@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
    constructor(
        public loadingService: LoadingService
    ) { }
}
