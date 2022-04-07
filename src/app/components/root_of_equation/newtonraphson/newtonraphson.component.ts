import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { derivative, parse } from 'mathjs';
import { VariableNewtonraphon } from './variable-newtonraphon';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-newtonraphson',
  templateUrl: './newtonraphson.component.html',
  styleUrls: ['./newtonraphson.component.css']
})
export class NewtonraphsonComponent implements OnInit {

  Equationselect: any = [];

  answer?:number
  error?:number;
  x?:number
  variable !: VariableNewtonraphon[];
  newtonraphsongroup:FormGroup;
  xArray:number[] = [];
  fxArray:number[] = [];
  dfxArray:number[]=[];
  slope:number[]=[];
  chart:any;

  constructor(private fb: FormBuilder,private newtonraphsonService:RootService,public restApi: RestApiService) {
    this.newtonraphsongroup = this.fb.group({
      equation:['',Validators.required],
      x: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['1']
    });
    this.getNewtonraphson();
   }

  ngOnInit(): void {
    this.chart = document.getElementById('newtonraphsonchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
    this.loadEquation();
  }

  loadEquation() {
    return this.restApi.getEquationnewtonraphson().subscribe((data: {}) => {
      this.Equationselect = data;
    });
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.xArray,
            label:'X',
            backgroundColor:'#5579c6',
            tension:0.2,
            borderColor:'#5579c6',
          },
          {
            data:this.slope,
            label:'SLOPE',
            backgroundColor:'#e3242b',
            tension:0.2,
            borderColor:'#e3242b',
          }
        ],
        labels:this.fxArray,
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        scales:{
          y:{
            beginAtZero:true,
          }
        },
        plugins: {
          zoom: {
            zoom: {
              wheel: {
                enabled: true,
              },
              pinch: {
                enabled: true
              },
              mode: 'x',
            }
          }
        }
      }
    })
  }

  getNewtonraphson(){
    this.variable = this.newtonraphsonService.getNewtonraphson();
  }

  function (x:number,equation:string):number {
    try{
        let Equation = parse(equation);
        return Equation.evaluate({x:x});
    }
    catch(error){
        console.log("Equation Error : "+error);
    }
    return 0;
  }

  dfunction (x:number,equation:string):number {
    try{
        let dEquation = derivative(equation,'x');
        return dEquation.evaluate({x:x});
    }
    catch(error){
        console.log("Equation Error : "+error);
    }
    return 0;
  }
  calerror(xN:number,xO:number):number{
    return Math.abs((xN-xO)/xN);
  }
  cal(b:VariableNewtonraphon,f:FormGroup){
    this.x = b.x;
    let dfx = this.dfunction(this.x,b.equation);
    let fx = this.x-(this.function(this.x,b.equation)/dfx);
    this.error = this.calerror(fx,this.x);
    while(this.error > b.epsilon){

      dfx = this.dfunction(this.x,b.equation);
      fx = this.x-(this.function(this.x,b.equation)/dfx);

      this.error = this.calerror(fx,this.x);

      let form_record = new VariableNewtonraphon(f.get('equation')?.value,this.x,fx,dfx,this.error,f.get('epsilon')?.value,b.iteration);
      this.newtonraphsonService.addNewtonraphson(form_record)

      this.fxArray.push(fx);
      this.xArray.push(this.x);
      this.dfxArray.push(dfx);

      this.x = fx;
      ++b.iteration

      if(this.error === Infinity){
        break;
      }
    }

    this.answer = this.x; // answer

  }
}
