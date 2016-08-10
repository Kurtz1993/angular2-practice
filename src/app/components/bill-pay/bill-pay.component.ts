import {Component, ViewEncapsulation} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {OlbCard, Payee, BillerGroup, ErrorMessage} from '../../types/types';
import {OlbCardComponent} from '../olb-card/olb-card.component';
import {PopularBillersComponent} from './popular-billers/popular-billers.component';
import {AddBillerComponent} from './add-biller/add-biller.component';
import {BillerListComponent} from './biller-list/biller-list.component';
import {PaymentComponent} from './payment/payment.component';
import {PaymentsService} from '../../services/olb-services';

@Component({
    moduleId: module.id,
    selector: 'bill-pay',
    templateUrl: 'bill-pay.component.html',
    styleUrls: ['./bill-pay.component.scss'],
    directives: [OlbCardComponent, PopularBillersComponent, AddBillerComponent, BillerListComponent, PaymentComponent],
    providers: [PaymentsService],
    encapsulation: ViewEncapsulation.None
})
export class BillPayComponent implements OlbCard {
    public title = 'BILL PAY';
    public dataLoaded = false;
    public status = 'Loading...';
    public showCancelButton = false;
    public currentView: BillPayView;
    public cardView = BillPayView;
    public sharedData: any;
    public payees: Payee[];
    public topBillers: BillerGroup[];

    constructor(private paymentsService: PaymentsService) {}

    ngOnInit(): void {
        this.paymentsService.getPopularBillers()
            .subscribe(
                (topBillers) => this.populateTopBillers(topBillers),
                (err: ErrorMessage) => console.log(err)
            );
        this.currentView = BillPayView.AddBiller;
    }

    changeView(newView: BillPayView): void {
        this.currentView = newView;
    }

    changeSharedData(data: any): void {
        this.sharedData = data;
    }

    newBillerAdded(): void {
        this.paymentsService.getPayees();
        this.currentView = BillPayView.BillerList;
    }

    private populateTopBillers(topBillers: BillerGroup[]): void {
        this.topBillers = topBillers;
        this.sharedData = this.topBillers[1];
        this.paymentsService.getPayees()
            .subscribe(
                (payees) => this.populatePayees(payees),
                (err: ErrorMessage) => console.log(err)
            );
    }

    private populatePayees (payees: Payee[]): void {
        this.payees = payees;
        // this.currentView = (this.payees.length > 0) ? BillPayView.BillerList : BillPayView.PopularBillers;
        this.dataLoaded = true;
    }
}

export enum BillPayView {
    PopularBillers,
    AddBiller,
    BillerList,
    Payment
}