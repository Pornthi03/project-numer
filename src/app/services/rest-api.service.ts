import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariableBisection } from '../components/root_of_equation/bisection/variable-bisection';
import { VariableFalsepositon } from '../components/root_of_equation/falseposition/variable-falsepositon';
import { VariableOnepoint } from '../components/root_of_equation/onepoint/variable-onepoint';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEquationbisection(): Observable<VariableBisection> {
    return this.http
      .get<VariableBisection>(this.apiURL + '/equation')
      .pipe(retry(1), catchError(this.handleError));
  }

  getEquationfalseposition(): Observable<VariableFalsepositon> {
    return this.http
      .get<VariableFalsepositon>(this.apiURL + '/equation')
      .pipe(retry(1), catchError(this.handleError));
  }

  getEquationonepoint(): Observable<VariableOnepoint> {
    return this.http
      .get<VariableOnepoint>(this.apiURL + '/equation')
      .pipe(retry(1), catchError(this.handleError));
  }


  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
