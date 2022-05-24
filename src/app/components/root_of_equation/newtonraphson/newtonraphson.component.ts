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

  newtonValue: any = [];
  nr:any = [];

  answer?:number
  error?:number;
  variable !: VariableNewtonraphon[];
  newtonraphsongroup:FormGroup;
  xArray:number[] = [];
  fxArray:number[] = [];
  chart:any;
  x!:number;

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

  async loadEquation() {
    console.log( await this.restApi.getEquation().subscribe((data: {}) => {
      this.nr = data;

      for(let i=0;i<this.nr.Chapter[3].NewtonRaphson.length;i++){
        this.newtonValue.push(this.nr.Chapter[3].NewtonRaphson[i]);
        console.log(this.nr.Chapter[3].NewtonRaphson[i]);
      }
      return this.newtonValue

    }))

    console.log(this.newtonValue);
  }

  getXLXR(p:string){
    var XLXR = this.newtonValue.find((x: any) => x.equation === p);
    this.x = XLXR.x;
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.fxArray,
            label:'X',
            backgroundColor:'#5579c6',
            tension:0.2,
            borderColor:'#5579c6'
          }
        ],
        labels:this.xArray,
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

    let dfx = this.dfunction(b.x,b.equation);
    let fx = b.x-(this.function(b.x,b.equation)/dfx);
    this.error = this.calerror(fx,b.x);
    while(this.error > b.epsilon){

      dfx = this.dfunction(b.x,b.equation);
      fx = b.x-(this.function(b.x,b.equation)/dfx);

      this.error = this.calerror(fx,b.x);

      let form_record = new VariableNewtonraphon(f.get('equation')?.value,b.x,fx,dfx,this.error,f.get('epsilon')?.value,b.iteration);
      this.newtonraphsonService.addNewtonraphson(form_record)

      this.fxArray.push(fx);
      this.xArray.push(b.x);

      b.x = fx;
      ++b.iteration

      if(this.error === Infinity){
        break;
      }
    }

    this.answer = b.x; // answer

  }
}
