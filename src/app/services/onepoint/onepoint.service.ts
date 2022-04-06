import { Injectable } from '@angular/core';
import { VariableOnepoint } from 'src/app/components/root_of_equation/onepoint/variable-onepoint';

@Injectable({
  providedIn: 'root'
})
export class OnepointService {

  onepointArray:VariableOnepoint[]=[];

  constructor() { }

  getPage():VariableOnepoint[]{
    return this.onepointArray;
  }

  addVariable(v:VariableOnepoint): void{
    this.onepointArray.push(v);
  }
}
