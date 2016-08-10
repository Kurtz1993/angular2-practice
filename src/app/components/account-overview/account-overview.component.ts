import {Component, ElementRef, Input} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {OlbCardComponent} from '../olb-card/olb-card.component';
import {OlbCard, Account} from '../../types/types';
import {AccountService} from '../../services/olb-services';

@Component({
    moduleId: module.id,
    selector: 'account-overview',
    templateUrl: 'account-overview.component.html',
    styleUrls: ['./account-overview.component.scss'],
    directives: [OlbCardComponent],
    providers: [AccountService]
})
export class AccountOverviewComponent implements OlbCard {
    @Input() settings: AccountOverviewSettings;

    public title = 'ACCOUNTS OVERVIEW';
    public activeTab = 'available';
    public dataLoaded = false;
    public hasData: boolean;
    public status = 'Loading...';
    public colors = ['#425899', '#5771AA', '#6282BE', '#6493CD', '#7AB0DC', '#81BAE8'];
    public total = 0;
    public totalText = 'Available Funds';
    public accountLabels: AccountInfo[];
    public selectedAccount: AccountInfo;
    public defaultAccountView: string;

    private chartData: DoughnutDataset;
    private accounts: Account[];
    private chartElm: HTMLCanvasElement;
    private chartCtx: CanvasRenderingContext2D;
    private chartObj: Chart;
    private chartOptions: ChartSettings<DoughnutDataset>;
    private cardElm: Element;

    constructor(cardElm: ElementRef, private service: AccountService) {
        this.settings = this.settings || {};
        this.cardElm = cardElm.nativeElement;
        this.defaultAccountView = this.settings.defaultAccountOverview || 'available';
        this.chartOptions = {
            type: 'doughnut',
            data: {
                datasets: null
            },
            options: {
                responsive: false,
                tooltips: {
                    enabled: false
                },
                legend: {
                    display: false
                },
                onClick: this.updateSelectedAccount.bind(this)
            }
        };
    }

    ngOnInit(): void {
        this.chartElm = this.cardElm.querySelector('#accountOverviewChart') as HTMLCanvasElement;
        this.chartCtx = this.chartElm.getContext('2d');
        this.service.getAllAccounts()
            .subscribe(
                accounts => {
                    this.prepareAccounts(accounts);
                    this.filterAccounts(this.defaultAccountView);
                    this.dataLoaded = true;
                },
                error => console.log(`${error.title}: ${error.message}`)
            );
    }

    /**
     * Filter the accounts that the doughnut will show.
     * @param type - The type that would be used for filtering. Can be 'available', 'assets' or 'debt';
     */
    filterAccounts(type: string): void {
        if (type === this.activeTab && this.dataLoaded) return;
        this.activeTab = type;
        let filteredAccounts = this.accounts;

        switch(type) {
            case 'available':
                filteredAccounts = filteredAccounts.filter((account) => {
                    let accType = account.accountType.toLowerCase();
                    return (accType === 'checking');
                });
                this.totalText = 'Available Funds';
                break;
            case 'assets':
                filteredAccounts = filteredAccounts.filter((account) => {
                    let accType = account.accountType.toLowerCase();
                    return (accType !== 'loan' && accType !== 'lineofcredit');
                });
                this.totalText = 'Total Assets';
                break;
            case 'debt':
                filteredAccounts = filteredAccounts.filter((account) => {
                    let accType = account.accountType.toLowerCase();
                    return (accType === 'loan' || accType === 'lineofcredit');
                });
                this.totalText = 'Total debt';
                break;
            default:
                filteredAccounts = this.accounts;
                break;
        }

        this.populateDoughnut(filteredAccounts);
    }

    /**
     * Populate the doughnut with the given account data.
     * @param accounts - The accounts that are going to be used to populate the doughnut.
     */
    private populateDoughnut(accounts: Account[]): void {
        this.total = 0;
        this.accountLabels = [];
        this.chartData = { data: [] };
        let labels: string[] = [];
        let data: number[] = [];

        accounts.forEach((account, i) => {
            this.total += account.availableBalance;

            labels.push(account.nickname);
            data.push(account.availableBalance);

            this.accountLabels.push(new AccountInfo(account.nickname, account.availableBalance, this.colors[i]));
        });

        this.chartOptions.data = {
            labels: labels,
            datasets: [{
                data: data,
                backgroundColor: this.colors
            }]
        };

        if (this.chartObj) {
            this.chartObj.update();
        } else {
            this.chartObj = new Chart(this.chartCtx, this.chartOptions);
        }
        this.selectedAccount = this.accountLabels[0];

        this.hasData = !!this.selectedAccount;
    }

    /**
     * Prepare the card account data.
     * @param accounts - Accounts array to prepare.
     */
    private prepareAccounts(accounts: Account[]): void {
        this.accounts = accounts.filter(account => account.active && account.amount > 0);
        // If there are more accounts than default colours, we generate new blue colours by luminance based on the last default colour.
        // Luminance will be increased
        if (this.accounts.length > this.colors.length) {
            let luminance = 0.05;
            let colourCount = this.accounts.length - this.colors.length;
            for (let i = 0; i < colourCount; i++) {
                this.colors.push(this.colorGenerator(luminance, this.colors[this.colors.length - 1]));
                luminance += 0.05;
            }
        }

        this.accounts.forEach(account => {
            let accNum: string;
            // TODO: When available balance is calculated on the back end, remove the condition.
            account.availableBalance = (account.availableBalance > 0) ? account.availableBalance : account.amount;
            account.nickname = account.nickname || account.name;
            accNum = account.nickname.substr(account.nickname.length - 5, account.nickname.length - 1);
            account.nickname = (account.nickname || account.name) + ' *' + account.number.substr(account.number.length - 4, 4);
        });
    }

    private updateSelectedAccount(event: MouseEvent): void {
        let elm = this.chartObj.getElementAtEvent(event)[0];
        let index = elm._index;

        this.selectedAccount = this.accountLabels[index];
    }

    /**
     * Generates a new color depending on the luminance that you pass.
     * @param luminance - The amount to luminance to apply, it can be positive or negative.
     * @param baseColor - The base color in Hex string color format to use.
     * @returns A blue color with changed luminance in hex string format.
     */
    private colorGenerator(luminance: number, baseColor: string): string {
        baseColor = String(baseColor).replace(/[^0-9a-f]/gi, '');

        if (baseColor.length < 6) {
            baseColor[0] + baseColor[0] + baseColor[1] + baseColor[1] + baseColor[2] + baseColor[2];
        }

        luminance = luminance || 0;

        // Convert the color to decimal and change the luminosity.
        let hex = '#';
        let change: any;
        for (let i = 0; i < 3; i++) {
            change = parseInt(baseColor.substr(i * 2, 2), 16);
            change = Math.round(Math.min(Math.max(0, change + (change * luminance)), 255)).toString(16);
            hex += ('00' + change).substr(change.length);
        }
        return hex;
    }
}

class ChartElement {
    /**
     * Creates a piece of the doughnut chart with the given data.
     * @param label - Identifies the piece of the doughnut chart.
     * @param color - Color in hex format to apply to the piece of the doughnut chart.
     * @param value - Value of the piece of the doughnut chart.
     * @param highlight - An optional highlight color in hex format for the piece of the doughnut chart.
     */
    constructor(public label: string, public color: string, public value: number, public highlight?: string) { }
}

class AccountInfo {
    /**
     * Account information to display inside the card.
     * @param name - Account name, or nickname if it exists.
     * @param amount - Corresponding amount for the account.
     * @param color - Associated chart color to the account.
     */
    constructor(public name?: string, public amount?: number, public color?: string){}
}

interface AccountOverviewSettings {
    /** Default view to show when the card loads. */
    defaultAccountOverview?: string;
}