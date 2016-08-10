import {Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {OlbService} from './base.service';
import {ApiResponse, Transaction} from '../types/types';

@Injectable()
export class TransactionsService extends OlbService {
    constructor(http: Http) {
        super(http);
    }

    /**
     * Gets recent transactions for the current user.
     * @param days The number of days to fetch latest transactions
     * @param payee Filter by payee name this is optional
     * @returns An observable that contains an array of the transactions.
     */
    getRecentTransactions(days:string, payee?:string): Observable<Transaction[]> {        
        let params: URLSearchParams = new URLSearchParams();
        params.set('days', days);
        params.set('payee', payee);
        this.reqConfig.search = params;
        return this.http.get(`${this.baseUrl}/transactions/recent`, this.reqConfig)
            .map((response: Response) => response.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }
}