import { Component, OnInit } from '@angular/core';
import {multiply} from "mathjs";

@Component({
  selector: 'app-gausselimination',
  templateUrl: './gausselimination.component.html',
  styleUrls: ['./gausselimination.component.css']
})
export class GausseliminationComponent implements OnInit {

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
  cal(matrixA:Array<Array<number>>,matrixX:Array<Array<number>>,matrixB:Array<Array<number>>){

      let matrixTempA:Array<Array<number>> = JSON.parse(JSON.stringify(matrixA)),
          matrixTempX:Array<Array<number>> = JSON.parse(JSON.stringify(matrixX)),
          matrixTempB:Array<Array<number>> = JSON.parse(JSON.stringify(matrixB));

      let i:number = 0 ,
          j:number = 0 ,
          valueTempA:number = 0 ,
          matrixTemp:Array<Array<number>>,
          listMatrixA:Array<Array<Array<number>>> = [],
          listMatrixB:Array<Array<Array<number>>> = [],
          listMatrixX:Array<Array<Array<number>>> = [];

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
      matrixTemp = JSON.parse(JSON.stringify(matrixTempA));
      for( i=matrixTemp.length-1 ; i>=0 ; i-- ){
          matrixTempX[i][0] = matrixTempB[i][0];
          for( j=matrixTemp[i].length-1 ; j>=0 ; j--){
              if(j==i){
                matrixTempX[i][0] /= matrixTemp[i][j];
              }
              else{
                  matrixTempX[i][0] += multiply(matrixTemp[i][j]*matrixTempX[j][0],-1);
              }
          }
          listMatrixX.push(JSON.parse(JSON.stringify(matrixTempX)));
      }
      return(
          {
              listMatrixA:listMatrixA,
              listMatrixB:listMatrixB,
              listMatrixX:listMatrixX
          }
      );
  }
  componentDidMount() {
      console.log(this.cal(this.matrixA,this.matrixX,this.matrixB));
  }

}
