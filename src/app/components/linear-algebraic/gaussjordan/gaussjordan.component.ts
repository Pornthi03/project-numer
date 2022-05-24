import { Component, OnInit } from '@angular/core';
import {multiply} from "mathjs";

@Component({
  selector: 'app-gaussjordan',
  templateUrl: './gaussjordan.component.html',
  styleUrls: ['./gaussjordan.component.css']
})
export class GaussjordanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  private matrixA: Array<Array<number>> = [
    [-2, 3, 1],
    [3, 4, -5],
    [1, -2,1]
  ];
  private matrixB: Array<Array<number>> = [
      [9],
      [0],
      [-4]
  ];

  listMatrixA:Array<Array<Array<number>>> = [];
  listMatrixB:Array<Array<Array<number>>> = [];
  listMatrixX:Array<Array<Array<number>>> = [];

  private matrixX: Array<Array<number>> = [[0], [0], [0]];
  subtractArrayArray(array1:Array<number>,array2:Array<number>,index:number) : Array<number>{
    let result:Array<number> = [] ;
    if(Math.abs(array1[index] - array2[index]) != 0 ){
        array2 = multiply(array2,-1);
    }
    for(let i=0 ;i<array1.length ; i++){
        result.push(array1[i] - array2[i]);
    }
    return result ;
  }
  multiplyArrayValue(matrix:Array<number>,value:number) : Array<number> {
    for(let i=0 ; i<matrix.length ; i++){
        matrix[i] *= value ;
    }
    return matrix;
  }
  calculate(matrixA:Array<Array<number>>,matrixX:Array<Array<number>>,matrixB:Array<Array<number>>) : any{
      let matrixTempA:Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
          matrixTempB:Array<Array<number>> = JSON.parse(JSON.stringify(matrixB));

      let i:number = 0 ,
          j:number = 0 ,
          valueTempA:number = 0 ,
          listMatrixA:Array<Array<Array<number>>> = [],
          listMatrixB:Array<Array<Array<number>>> = [],
          listMatrixX:Array<Array<Array<number>>> = [];

      //Gauss Elimination Method
      for( i=0; i<matrixTempA.length ; i++ ){
          for( j=0; j<matrixTempA[i].length ; j++ ){
              if(j<i){
                  //swap multiply value
                  valueTempA = matrixTempA[j][j];

                  matrixTempA[j] = this.multiplyArrayValue(matrixTempA[j],matrixTempA[i][j]);
                  matrixTempB[j] = this.multiplyArrayValue(matrixTempB[j],matrixTempA[i][j]);

                  matrixTempA[i] = this.multiplyArrayValue(matrixTempA[i],valueTempA);
                  matrixTempB[i] = this.multiplyArrayValue(matrixTempB[i],valueTempA);

                  //subtract value
                  matrixTempA[i] = this.subtractArrayArray( matrixTempA[j] , matrixTempA[i] , j );
                  matrixTempB[i][0] = matrixTempB[j][0] - matrixTempB[i][0];
                  listMatrixA.push(JSON.parse(JSON.stringify(matrixTempA)));
                  listMatrixB.push(JSON.parse(JSON.stringify(matrixTempB)));
              }
          }
      }
      //Gauss Jordan Method
      for( i=0; i<matrixTempA.length ; i++ ){
          for( j=0; j<matrixTempA[i].length ; j++ ){
              if(j>i){
                  //swap multiply value
                  valueTempA = matrixTempA[j][j];

                  matrixTempA[j] = this.multiplyArrayValue(matrixTempA[j],matrixTempA[i][j]);
                  matrixTempB[j] = this.multiplyArrayValue(matrixTempB[j],matrixTempA[i][j]);

                  matrixTempA[i] = this.multiplyArrayValue(matrixTempA[i],valueTempA);
                  matrixTempB[i] = this.multiplyArrayValue(matrixTempB[i],valueTempA);

                  //subtract value
                  matrixTempA[i] = this.subtractArrayArray( matrixTempA[j] , matrixTempA[i] , j );
                  matrixTempB[i][0] = matrixTempB[j][0] - matrixTempB[i][0];
                  listMatrixA.push(JSON.parse(JSON.stringify(matrixTempA)));
                  listMatrixB.push(JSON.parse(JSON.stringify(matrixTempB)));
              }
          }
      }
      let temp:number = 0 ;
      for(i=0 ; i<matrixTempA.length ; i++ ){
          temp = matrixTempA[i][i];
          matrixTempA[i][i] /= temp;
          matrixTempB[i][0] /= temp;
          listMatrixA.push(JSON.parse(JSON.stringify(matrixTempA)));
          listMatrixB.push(JSON.parse(JSON.stringify(matrixTempB)));
          listMatrixX.push(JSON.parse(JSON.stringify(matrixTempB)));
      }
      // return(
        //     {
                this.listMatrixA = listMatrixA;
                this.listMatrixB = listMatrixB;
                this.listMatrixX = listMatrixX;
            // }
        // );
  }
  componentDidMount() {
      this.calculate(this.matrixA,this.matrixX,this.matrixB);
  }

}
