import { Injectable } from '@angular/core';
import { VariableBisection } from '../components/root_of_equation/bisection/variable-bisection';
import { Mockbisection } from './mockbisection';

@Injectable({
  providedIn: 'root'
})
export class BisectionService {

  bisectionArray:VariableBisection[]=[];

  constructor() {
    this.bisectionArray = Mockbisection.mbisection;
   }
   getPage():VariableBisection[]{
    return this.bisectionArray;
  }

   addVariable(v:VariableBisection): void{
     this.bisectionArray.push(v);
   }
}
