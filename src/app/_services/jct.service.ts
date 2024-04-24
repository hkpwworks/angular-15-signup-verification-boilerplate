import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { environment } from '@environments/environment';
//import { jct } from '@app/_models';
import { CheckInData, VIWSData } from '../_models/jct';
import { CheckinComponent } from '../JCT/checkin.component';

const baseUrl = `${environment.apiUrl}/JCT`;

@Injectable({ providedIn: 'root' })
export class JCTService {
  private JCTSubject: BehaviorSubject<CheckInData | null>;
  public JCT: Observable<CheckInData | null>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.JCTSubject = new BehaviorSubject<CheckInData | null>(null);
    this.JCT = this.JCTSubject.asObservable();
  }

  public get JCTValue() {
    return this.JCTSubject.value;
  }

  checkin(_jct: CheckInData) {
    console.log('_jct value for debugging:', _jct);

    return this.http.post<any>(`${baseUrl}/CheckIn`, _jct )
      .pipe(map(account => {
        this.JCTSubject.next(_jct);
        return account;
      }));
  }

    getAll() {
      return this.http.get<VIWSData[]>(`${baseUrl}/getviws`);
  }

  delete(id: string) {
    return this.http.delete(`${baseUrl}/${id}`)
      .pipe(finalize(() => {
        // auto logout if the logged in account was deleted
        //if (id === this.JCTValue?.id)
        //  this.logout();
      }));
  }

  //logout() {
  //    this.http.post<any>(`${baseUrl}/revoke-token`, {}, { withCredentials: true }).subscribe();
  //    this.stopRefreshTokenTimer();
  //  this.JCTSubject.next(null);
  //    this.router.navigate(['/account/login']);
  //}

  //refreshToken() {
  //    return this.http.post<any>(`${baseUrl}/refresh-token`, {}, { withCredentials: true })
  //        .pipe(map((account) => {
  //          this.JCTSubject.next(account);
  //            this.startRefreshTokenTimer();
  //            return account;
  //        }));
  //}

  //register(account: JCT) {
  //    return this.http.post(`${baseUrl}/register`, account);
  //}

  //verifyEmail(token: string) {
  //    return this.http.post(`${baseUrl}/verify-email`, { token });
  //}

  //forgotPassword(email: string) {
  //    return this.http.post(`${baseUrl}/forgot-password`, { email });
  //}

  //validateResetToken(token: string) {
  //    return this.http.post(`${baseUrl}/validate-reset-token`, { token });
  //}

  //resetPassword(token: string, password: string, confirmPassword: string) {
  //    return this.http.post(`${baseUrl}/reset-password`, { token, password, confirmPassword });
  //}

  //getAll() {
  //    return this.http.get<Account[]>(baseUrl);
  //}

  //getById(id: string) {
  //    return this.http.get<Account>(`${baseUrl}/${id}`);
  //}

  //create(params: any) {
  //    return this.http.post(baseUrl, params);
  //}

  //update(id: string, params: any) {
  //    return this.http.put(`${baseUrl}/${id}`, params)
  //        .pipe(map((account: any) => {
  //            // update the current account if it was updated
  //            if (account.id === this.accountValue?.id) {
  //                // publish updated account to subscribers
  //                account = { ...this.accountValue, ...account };
  //                this.accountSubject.next(account);
  //            }
  //            return account;
  //        }));
  //}

  //delete(id: string) {
  //    return this.http.delete(`${baseUrl}/${id}`)
  //        .pipe(finalize(() => {
  //            // auto logout if the logged in account was deleted
  //            if (id === this.accountValue?.id)
  //                this.logout();
  //        }));
  //}

  //// helper methods

  //private refreshTokenTimeout?: any;

  //private startRefreshTokenTimer() {
  //    // parse json object from base64 encoded jwt token
  //    const jwtBase64 = this.accountValue!.jwtToken!.split('.')[1];
  //    const jwtToken = JSON.parse(atob(jwtBase64));

  //    // set a timeout to refresh the token a minute before it expires
  //    const expires = new Date(jwtToken.exp * 1000);
  //    const timeout = expires.getTime() - Date.now() - (60 * 1000);
  //    this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
  //}

  //private stopRefreshTokenTimer() {
  //    clearTimeout(this.refreshTokenTimeout);
  //}
}
