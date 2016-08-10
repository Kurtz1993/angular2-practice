import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Biller} from '../../../types/types';
import {PaymentsService} from '../../../services/olb-services';
import {BillPayView} from '../bill-pay.component';

@Component({
    moduleId: module.id,
    selector: 'bp-add-biller',
    templateUrl: 'add-biller.component.html',
    styleUrls: ['./add-biller.component.scss'],
    providers: [PaymentsService]
})
export class AddBillerComponent {
    @Output() changeView = new EventEmitter<BillPayView>();
    @Input() showCancelButton: boolean;
    @Input() biller: Biller;

    constructor(private paymentsService: PaymentsService){}
}