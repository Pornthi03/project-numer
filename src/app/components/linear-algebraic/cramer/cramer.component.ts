import { style } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { det } from 'mathjs';

@Component({
  selector: 'app-cramer',
  templateUrl: './cramer.component.html',
  styleUrls: ['./cramer.component.css']
})
export class CramerComponent implements OnInit {

  // name = 'Angular';
  // rows = 5;
  // cols = 3;
  // form = new FormArray([])
  // ngOnInit() {
  //   for (let i = 0; i < this.rows; i++) {
  //     this.form.push(new FormArray([]))
  //     for (let j = 0; j < this.cols; j++) {
  //       (this.form.at(i) as FormArray).push(new FormControl())
  //     }

  //   }
  // }

  // rows!:number;
  // cols!:number;
  // matrixtest:Array<Array<number>> = [];

  // inputMatrix(){
  //   for (let i = 0; i < this.rows; i++) {
  //     for (let j = 0; j < this.cols; j++) {

  //     }
  //   }
  // }


  matrixA:Array<Array<number>> =   [
    [-2,3,1],
    [3,4,-5],
    [1,-2,1]
  ];

  matrixB:Array<Array<number>> = [
    [9],
    [0],
    [-4]
  ];

  detA!:number;
  detA1!:number;
  detA2!:number;
  detA3!:number;
  answer:Array<number> = [];

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
    let matrixTemp:Array<Array<number>>;
    let detA = this.determinant(matrixA);
    let detMatrixAB:Array<number> = [];
    let detMatrixA:Array<number> = [];
    let answer:Array<number> = [];

   for( let i = 0 ;  i < matrixA[0].length ; i++ ) {
       matrixTemp = this.columnReplace(matrixA,matrixB,i)
       detMatrixAB.push(JSON.parse(this.determinant(matrixTemp).toFixed(6)));
       detMatrixA.push(JSON.parse(detA.toFixed(6)));
       answer.push(JSON.parse((this.determinant(matrixTemp)/detA).toFixed(6)));

   }
   this.detA = detMatrixA[0];
   this.detA1 = detMatrixAB[0];
   this.detA2 = detMatrixAB[1];
   this.detA3 = detMatrixAB[2];
   this.answer = answer;
   console.log(detMatrixA);
   console.log(detMatrixAB);
  }
  cal():void{
    this.calculate(this.matrixA,this.matrixB)
  }
}
