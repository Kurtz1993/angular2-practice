import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {OlbService} from './base.service';
import {Account} from '../types/types';

@Injectable()
export class AccountService extends OlbService {
    constructor(http: Http) {
        super(http);
    }

    /**
     * Gets all the accounts for the current user.
     * @returns An observable that contains an array of the accounts.
     */
    getAllAccounts(): Observable<Account[]> {
        return this.http.get(`${this.baseUrl}/accounts`, this.reqConfig)
            .map((response: Response) => response.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }
}