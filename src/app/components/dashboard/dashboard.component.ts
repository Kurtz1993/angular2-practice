import { Component, OnInit } from '@angular/core';
import { AccountOverviewComponent } from '../account-overview/account-overview.component';
import { RecentActivityComponent } from '../recent-activity/recent-activity.component';
import { BillPayComponent } from '../bill-pay/bill-pay.component';

@Component({
    moduleId: module.id,
    selector: 'dashboard',
    templateUrl: 'dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    directives: [AccountOverviewComponent,  RecentActivityComponent, BillPayComponent]
})

export class DashboardComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

}