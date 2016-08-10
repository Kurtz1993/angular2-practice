 import { Component } from '@angular/core';
 import { ROUTER_DIRECTIVES, Router }    from '@angular/router';
 import { MenuItem } from '../menu-item/menu-item.component';
 import { AccountService } from '../../services/olb-services';
 import { Account } from '../../types/types';

@Component({
    moduleId: module.id,
    selector: 'side-nav',
    templateUrl: 'sidenav.component.html',    
    styleUrls: ['./sidenav.component.scss'],
    providers: [AccountService],
    directives: [ROUTER_DIRECTIVES, MenuItem]
})

export class SidenavComponent {

    public accountsLoaded: boolean = false;
    private accounts: Account[];
    
    constructor(private service: AccountService) { }

    ngOnInit(): void {
        this.service.getAllAccounts()
            .subscribe(
                accounts => {
                    this.constructAccounts(accounts as Account[]);
                    this.accountsLoaded = true;
                },
                error => console.log(`${error.title}: ${error.message}`)
            );
    }

    /**
     * Construct the accounts' names in order to be displayed properly in the menu
     * @param accounts - Accounts array to treat.
     */
    private constructAccounts(accounts: Account[]): void {
        this.accounts = accounts;
        this.accounts.forEach(account => {
            let accNumber: string;
            account.nickname = account.nickname || account.name;
            accNumber = account.nickname.substr(account.nickname.length - 5, account.nickname.length - 1);
            account.nickname += ' *' + account.number.substr(account.number.length - 4, 4);
        });
    }
    
}