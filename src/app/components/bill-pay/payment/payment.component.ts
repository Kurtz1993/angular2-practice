import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Payee} from '../../../types/types';
import {PaymentsService} from '../../../services/olb-services';
import {BillPayView} from '../bill-pay.component';

@Component({
    moduleId: module.id,
    selector: 'bp-payment',
    templateUrl: 'payment.component.html',
    styleUrls: ['./payment.component.scss'],
    providers: [PaymentsService]
})
export class PaymentComponent {
    @Output() changeView = new EventEmitter<BillPayView>();
    @Input() showCancelButton: boolean;
    @Input() payee: Payee;

    constructor(private paymentsService: PaymentsService){}
}