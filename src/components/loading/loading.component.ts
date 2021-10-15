import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
    @Output() onFinish: EventEmitter<void> = new EventEmitter<void>();

    constructor() { }

    ngOnInit(): void {
        setTimeout(() => this.onFinish.emit(), 8000);
    }
}
