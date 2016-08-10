import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {OlbService} from './base.service';
import {Account, AuthUser, AuthResponse} from '../types/types';

@Injectable()
export class AuthService extends OlbService {
    constructor(http: Http) {
        super(http);
    }

    /**
     * Attempts to login the user into the application.
     * @param user An object that contains the user information.
     * @returns A promise containing the response from the server.
     */
    login(user: AuthUser): Promise<AuthResponse> {
        return this.http.post(`${this.baseUrl}/auth`, user)
            .map((response: Response) => response.json().data)
            .toPromise()
            .catch((err: Response) => this.emitErrorMessage(err));
    }
}