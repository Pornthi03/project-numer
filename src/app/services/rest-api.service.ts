import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { VariableBisection } from '../components/root_of_equation/bisection/variable-bisection';
import { VariableFalsepositon } from '../components/root_of_equation/falseposition/variable-falsepositon';
import { VariableOnepoint } from '../components/root_of_equation/onepoint/variable-onepoint';
import { VariableNewtonraphon } from '../components/root_of_equation/newtonraphson/variable-newtonraphon';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { VariableSecant } from '../components/root_of_equation/secant/variable-secant';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'https://my-json-server.typicode.com/Pornthi03/Numerical/NumericalMethod';
  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  getEquation(): Observable<VariableBisection[]> {
    return this.http
      .get<VariableBisection[]>(this.apiURL)
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
