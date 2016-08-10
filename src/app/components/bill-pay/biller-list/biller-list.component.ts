import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Payee} from '../../../types/types';
import {BillPayView} from '../bill-pay.component';

@Component({
    moduleId: module.id,
    selector: 'bp-biller-list',
    templateUrl: 'biller-list.component.html',
    styleUrls: ['./biller-list.component.scss']
})
export class BillerListComponent {
    @Output() changeView = new EventEmitter<BillPayView>();
    @Output() changeSharedData = new EventEmitter<Payee>();
    @Input() payees: Payee[];

    /**
     * Open the payment form for the given payee.
     * @param payee - The payee to post the pay to.
     */
    openPaymentForm(payee: Payee): void {
        this.changeSharedData.emit(payee);
        this.changeView.emit(BillPayView.Payment);
    }

    /**
     * Go to the popular billers view to add a new biller.
     */
    addNewBiller(): void {
        this.changeView.emit(BillPayView.PopularBillers);
    }
}