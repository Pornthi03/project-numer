import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { det } from 'mathjs';

@Component({
  selector: 'app-cramer',
  templateUrl: './cramer.component.html',
  styleUrls: ['./cramer.component.css']
})
export class CramerComponent implements OnInit {

  matrixTemp:Array<Array<number>> =   [
    [-2,3,1],
    [3,4,-5],
    [1,-2,1]
  ];

  matrixAnswer:Array<Array<number>> = [
    [9],
    [0],
    [-4]
  ];

  constructor() {}

  ngOnInit(): void {

  }

  determinant (matrix:Array<Array<number>>):number {
    return det(matrix);
  }

  columnReplace(matrixA:Array<Array<number>>,matrixB:Array<Array<number>>,index:number) {
    let temp:Array<string> = matrixA.toString().split(","),
        matrixAnswer:Array<Array<any>> = [],
        matrixTemp:Array<number> = [],
        count = 0;

    for(let i=0;i<matrixA.length;i++){
        for (let j=0;j<matrixA[0].length;j++){
            if(j==index){
                matrixTemp.push(matrixB[i][0]);
            }
            else{
                matrixTemp.push(JSON.parse(temp[count]));
            }
            if(j==matrixA[i].length-1){
                matrixAnswer.push(matrixTemp);
                matrixTemp = [] ;
            }
            count++;
        }
    }
    return matrixAnswer;
  }

  calculate(matrixA:Array<Array<number>>,matrixB:Array<Array<number>>) : void{
    let matrixTempA:Array<Array<number>>;
    let detA = this.determinant(matrixA);
    let detMatrixAB:Array<number> = [];
    let detMatrixA:Array<number> = [];
    let answer:Array<number> = [];

   for( let i = 0 ;  i < matrixA[0].length ; i++ ) {
       matrixTempA = this.columnReplace(matrixA,matrixB,i)
       detMatrixAB.push(JSON.parse(this.determinant(matrixTempA).toFixed(6)));
       console.log(detMatrixAB);
       detMatrixA.push(JSON.parse(detA.toFixed(6)));
       console.log(detMatrixA);
       answer.push(JSON.parse((this.determinant(matrixTempA)/detA).toFixed(6)));

   }
   console.log(answer);
  }
  cal():void{
    this.calculate(this.matrixTemp,this.matrixAnswer)
  }
}
