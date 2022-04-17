import { Injectable } from '@angular/core';
import { VariableBisection } from '../components/root_of_equation/bisection/variable-bisection';
import { VariableFalsepositon } from '../components/root_of_equation/falseposition/variable-falsepositon';
import { VariableOnepoint } from '../components/root_of_equation/onepoint/variable-onepoint';
import { VariableNewtonraphon } from '../components/root_of_equation/newtonraphson/variable-newtonraphon';
import { VariableSecant } from '../components/root_of_equation/secant/variable-secant';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  bisectionArray:VariableBisection[]=[];
  falsepositionArray:VariableFalsepositon[]=[];
  onepointArray:VariableOnepoint[]=[];
  newtonraphsonArray:VariableNewtonraphon[]=[];
  secantArray:VariableSecant[]=[];

  constructor() { }
// -------------------Bisection---------------------
  getBisection():VariableBisection[]{
    return this.bisectionArray;
  }

   addBisection(v:VariableBisection): void{
     this.bisectionArray.push(v);
   }
// -------------------Bisection---------------------
// -------------------Falseposition---------------------
   getFalseposition():VariableFalsepositon[]{
    return this.falsepositionArray;
  }

   addFalseposition(v:VariableFalsepositon): void{
     this.falsepositionArray.push(v);
   }
// -------------------Falseposition---------------------
// -------------------Onepoint---------------------
  getOnepoint():VariableOnepoint[]{
    return this.onepointArray;
  }

  addOnepoint(v:VariableOnepoint): void{
    this.onepointArray.push(v);
  }
// -------------------Onepoint---------------------
// -------------------Newtonraphson---------------------
  getNewtonraphson():VariableNewtonraphon[]{
    return this.newtonraphsonArray;
  }

  addNewtonraphson(v:VariableNewtonraphon): void{
    this.newtonraphsonArray.push(v);
  }
// -------------------Newtonraphson---------------------
// -------------------Newtonraphson---------------------
getSecant():VariableSecant[]{
  return this.secantArray;
}

addSecant(v:VariableSecant): void{
  this.secantArray.push(v);
}
// -------------------Newtonraphson---------------------
}
