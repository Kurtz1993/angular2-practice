import { Component } from '@angular/core';
import { OlbCard, Header, Transaction } from '../../types/types';
import { OlbCardComponent } from '../olb-card/olb-card.component';
import { SearchPipe } from '../../pipes/pipes';
import { TransactionsService } from '../../services/olb-services';
import { SelectComponent, SelectOption } from '../select/select';

@Component({
    moduleId: module.id,
    templateUrl: 'recent-activity.component.html',
	styleUrls: ['recent-activity.component.css'],
    selector: 'recent-activity',
	directives: [ OlbCardComponent, SelectComponent ],
    providers: [TransactionsService],
    pipes: [ SearchPipe ]
})

export class RecentActivityComponent implements OlbCard {

    public title:string = 'Recent Activity';
    public headers: Array<Header> = [
		{title: "Payee", 		field:"description"}, 
		{title: "Amount", 		field:"amount"},
		{title: "Date", 		field:"postDate"},
		{title: "From Account", field:"accountNumber"},
		{title: "Pending", 		field:"isPending"}
	];
	public days: Array<string> = [ "30", "60", "90" ];
    public loaded: boolean = true;
	public status: string = 'Loaded';
	public activeTab: string = 'All';
	public orderBy: string = 'description';
    private query: string = '';
	public reverse: boolean = false;
    public viewDays: string = '30';
    private viewDaysOptions: SelectOption[] = [
        {title: '30 Days', value: '30'},
        {title: '60 Days', value: '60'},
        {title: '90 Days', value: '90'}        
    ];
    public transactions: Array<Transaction> = [];
    
    constructor(private transactionsService: TransactionsService){
    }

    ngOnInit(): void{
        this.getTransactions(this.viewDays);        
	}

    getTransactions(days:string, payee?:string):void{
        this.status = 'Loading...';
        this.loaded = false;
        this.transactionsService
            .getRecentTransactions(days, payee)
            .subscribe(
                transactions => {
                    this.transactions = transactions;
                    this.status = 'Loaded';
                    this.loaded = true;
                },
                error => console.log(`${error.title}: ${error.message}`)
            );
    }

	search(query:string): void {
		console.log(query);
	}

	onDaysChange(value:string):void {
		this.viewDays = value;
        this.getTransactions(this.viewDays);
	}

    filterTab(filter: string, event: Object): void {
		this.activeTab = filter;
	}

    sort(orderBy: string): void {
		this.orderBy = orderBy;
		this.reverse = !this.reverse;
        if(this.reverse) {
            this.transactions = this.transactions.sort( (a: any, b:any) => {
                return a[this.orderBy] < b[this.orderBy] ? 1 : 0; 
            });

        } else {
            this.transactions = this.transactions.sort( (a: any, b:any) => {
                return a[this.orderBy] > b[this.orderBy] ? 1 : 0; 
            });
        }
    }
         
};
