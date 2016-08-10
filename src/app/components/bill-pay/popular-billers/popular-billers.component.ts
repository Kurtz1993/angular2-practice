import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BillerGroup, Biller} from '../../../types/types';
import {PaymentsService} from '../../../services/olb-services';
import {BillPayView} from '../bill-pay.component';

@Component({
    moduleId: module.id,
    selector: 'bp-popular-billers',
    templateUrl: 'popular-billers.component.html',
    styleUrls: ['./popular-billers.component.scss'],
    providers: [PaymentsService]
})
export class PopularBillersComponent implements OnInit {
    @Output() changeView = new EventEmitter<BillPayView>();
    @Input() showCancelButton: boolean;

    public popularBillers: BillerGroup[];

    constructor(private paymentsService: PaymentsService){}

    ngOnInit(): void {
        this.paymentsService.getPopularBillers()
            .subscribe(
                popularBillers => this.popularBillers = popularBillers as BillerGroup[],
                err => console.log(err)
            );
    }
}