import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jacobi',
  templateUrl: './jacobi.component.html',
  styleUrls: ['./jacobi.component.css']
})
export class JacobiComponent implements OnInit {

  b:Array<number> = [12,17,14,7];
  a:Array<Array<number>> = [ [5, 2, 0, 0],
            [2, 5, 2, 0],
            [0, 2, 5, 2],
            [0, 0, 2, 5]  ];

  x:Array<number> = [];
  xold:Array<number> = [];
  c:Array<number> = [];
  error:Array<number> = [];
  criterion = 0.000001;
  n=4;
  constructor() { }

  ngOnInit(): void {
  }

  cal(){
    let i,j;
    for(i=0;i<this.n;i++) {
      this.x[i]=0;
    }
    for(i=0;i<this.n;i++) {
            this.c[i] = this.b[i];
            this.xold[i] = this.x[i];
            for(j=0;j<this.n;j++) {
                if(i!=j) {
                    this.c[i]=this.c[i]-this.a[i][j]*this.x[j];
            }
        }
    }

    for(i=0;i<this.n;i++) {
        this.x[i]=this.c[i]/this.a[i][i];
    }

    for(i=0;i<this.n;i++) {
        this.error[i]= Math.abs((this.x[i]-this.xold[i])/this.x[i]);
    }

    console.log("\nThe Solution is : \n");
    for(i=0;i<this.n;i++) {
        console.log("x"+ (i+1),this.x[i].toFixed(6));
        console.log("errorx"+ (i+1),this.error[i].toFixed(6));
    }


    for(i=0;i<this.n;i++) {
        var count = 1;
        while(this.error[0] > this.criterion && this.error[1] > this.criterion && this.error[2] > this.criterion && this.error[3] > this.criterion){
            for(i=0;i<this.n;i++) {
                    this.c[i]=this.b[i];
                    this.xold[i] = this.x[i];
                    for(j=0;j<this.n;j++) {
                        if(i!=j) {
                            this.c[i]=this.c[i]-this.a[i][j]*this.x[j];
                        }
                    }
            }

            for(i=0;i<this.n;i++) {
                this.x[i]=this.c[i]/this.a[i][i];
            }

            for(i=0;i<this.n;i++) {
                this.error[i] = Math.abs((this.x[i]-this.xold[i])/this.x[i]);
            }
            console.log("\nThe Solution is : \n");
            for(i=0;i<this.n;i++) {
                console.log("x"+ (i+1),this.x[i].toFixed(6));
                console.log("errorx"+ (i+1),this.error[i].toFixed(6));
            }
            count++;
            console.log("count = "+ count);
        }
    }
  }

}
