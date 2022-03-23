import { Injectable } from '@angular/core';
import { VariableFalsepositon } from 'src/app/components/root_of_equation/falseposition/variable-falsepositon';
import { Mockfalseposition } from './mockfalseposition';

@Injectable({
  providedIn: 'root'
})
export class FalsepositionService {

  falsepositionArray:VariableFalsepositon[]=[];

  constructor() {
    // this.falsepositionArray = Mockfalseposition.mfalsepositionn;
   }

   getPage():VariableFalsepositon[]{
    return this.falsepositionArray;
  }

   addVariable(v:VariableFalsepositon): void{
     this.falsepositionArray.push(v);
   }

}
