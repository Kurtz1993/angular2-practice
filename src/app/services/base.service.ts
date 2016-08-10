import {Http, Response, Headers, RequestOptionsArgs} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {baseUrl} from '../config/config';
import {ApiResponse, ErrorMessage} from '../types/types';

export abstract class OlbService {
    protected baseUrl: string;
    protected storage: Storage;
    protected headers: Headers;
    protected reqConfig: RequestOptionsArgs;
    private token: string;

    constructor(protected http: Http) {
        this.storage = window.sessionStorage;
        this.token = this.storage.getItem('token');
        this.baseUrl = baseUrl;
        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${this.token}`);
        this.reqConfig = {
            headers: this.headers
        };
    }
    /**
     * Handle any error from an http call.
     * @param error - Response object populated by the catch clause.
     * @returns An user-friendly error message that can be catched within the suscription.
     */
    protected emitErrorMessage(error: Response): Observable<any> {
        let defaultMessage: string;
        let serverResponse: ApiResponse<any> = error.json();
        let errorMessage: ErrorMessage;
        switch (error.status) {
            case 400:
                defaultMessage = 'Your request cannot be processed, please check it and try again.';
                break;
            case 401:
                if (serverResponse.message) serverResponse.message += '\r\nYour session will be terminated.';
                defaultMessage = 'You cannot access or get this resource, please log back in.';
                break;
            case 404:
                defaultMessage = 'The resource you requested was not found.';
                break;
            case 409:
                if (serverResponse.message) serverResponse.message += '\r\nYour session will be terminated.';
                defaultMessage = 'We could not authenticate you.\r\nYour session will be terminated.';
                break;
            case 500:
                defaultMessage = 'An unexpected error occurred, please try again later.';
                break;
            default:
                defaultMessage = 'An unknown error has occurred, please try again later.';
                break;
        }

        errorMessage = {
            message: serverResponse.message || defaultMessage,
            title: error.statusText
        };
        return Observable.throw(errorMessage);
    }
}