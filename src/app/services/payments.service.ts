import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {OlbService} from './base.service';
import {Biller, BillerGroup, BillerAddress, PopularBillerResponse, Payee, PaymentAccount, PaymentInfo} from '../types/types';

@Injectable()
export class PaymentsService extends OlbService {
    constructor(http: Http) {
        super(http);
    }

    /**
     * Get the list of user added payees.
     * @returns An observable containing a list of the user added payees.
     */
    getPayees(): Observable<Payee[]> {
        return this.http.get(`${this.baseUrl}/payments/billers`, this.reqConfig)
            .map((res: Response) => res.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }

    /**
     * Get billers list.
     * @param query Param to perform a search in payveris to get billers.
     * @returns An observable with a biller list that match the query.
     */
    getBillers(query: string): Observable<Biller[]> {
        return this.http.get(`${this.baseUrl}/payments/billers/${query}`, this.reqConfig)
            .map((res: Response) => res.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }

    /**
     * Get the popular billers list.
     * @returns An observable containing the popular billers list.
     */
    getPopularBillers(): Observable<BillerGroup[]> {
        return this.http.get(`${this.baseUrl}/payments/billers/top`, this.reqConfig)
            .map((res: Response) => res.json().data.billerGroups)
            .catch((err: Response) => this.emitErrorMessage(err));
    }

    /**
     * Get biller Address by biller id.
     * @param billerId Param to perform a search in payveris to get biller address.
     * @returns An observable containing the address for the biller.
     */
    getBillerAddress(billerId: number): Observable<BillerAddress[]> {
        return this.http.get(`${this.baseUrl}/payments/billers/${billerId}/addresses`, this.reqConfig)
            .map((res: Response) => res.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }

    /**
     * Get the accounts that are eligible for payments.
     * @returns An observable containing a list of accounts.
     */
    getPaymentAccounts(): Observable<PaymentAccount[]> {
        return this.http.get(`${this.baseUrl}/payments/accounts`, this.reqConfig)
            .map((res: Response) => res.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }

    /**
     * Save the biller.
     * @param biller The biller to save.
     * @returns An observable containing the response from the server.
     */
    saveBiller(biller: Payee): Observable<Payee[]> {
        return this.http.post(`${this.baseUrl}/payments addpayee`, biller, this.reqConfig)
            .map((res: Response) => res.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }

    /**
     * Post a payment.
     * @returns An observable containing the response from the server.
     */
    makePayment(payInfo: PaymentInfo): Observable<any> {
        return this.http.post(`${this.baseUrl}/payments/makepayment`, payInfo, this.reqConfig)
            .map((res: Response) => res.json().data)
            .catch((err: Response) => this.emitErrorMessage(err));
    }
}