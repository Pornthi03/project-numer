import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { parse } from 'mathjs';
import { RootService } from 'src/app/services/root.service';
import { VariableSecant } from './variable-secant';

@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.css']
})
export class SecantComponent implements OnInit {

  readonly API_URL = 'http://localhost:7800/NumericalMethod';
  Token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBvcm50aGlkYThAZ21haWwuY29tIiwiaWF0IjoxNjUzNDc3NzYwLCJleHAiOjE2NTM0ODEzNjAsInN1YiI6IjMifQ.uA_ZQyJn7Kpx1yTw4D6GYr5LsUz5DL2NzkM65_T93eA";

  secantValue: any = [];

  answer?:number;
  error?:number;
  variable !: VariableSecant[];
  secantgroup:FormGroup;
  xArray:number[] = [];
  fxArray:number[]=[];
  chart:any;
  x!:number;
  xi!:number;

  constructor(private fb: FormBuilder,
    private secantService:RootService) {
    this.secantgroup = this.fb.group({
      equation:['',Validators.required],
      x: ['',Validators.required],
      xi: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['1']
    });
    this.getSecant();
  }


  ngOnInit(): void {
    this.chart = document.getElementById('secantchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
    this.loadEquation();
  }

  async loadEquation() {
    const api = this.API_URL;
        axios.get(api, { headers: {"Authorization" : `Bearer ${this.Token}`} })
            .then(res => {
                console.log(res.data);
                console.log(this.Token);
                  for(let i=0;i<res.data.Chapter[4].Secant.length;i++){
                    this.secantValue.push(res.data.Chapter[4].Secant[i]);
                    console.log(res.data.Chapter[4].Secant[i]);
                  }
                  return this.secantValue

                });

    console.log(this.secantValue);
  }
  getXLXR(p:string){
    var XLXR = this.secantValue.find((x: any) => x.equation === p);
    this.x = XLXR.x;
    this.xi = XLXR.xi;
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

  getSecant(){
    this.variable = this.secantService.getSecant();
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

  calerror(xN:number,xO:number):number{
    return Math.abs((xN-xO)/xN);
  }

  cal(b:VariableSecant,f:FormGroup){

    let fx = b.x-((this.function(b.x,b.equation)*(b.x-b.xi))/(this.function(b.x,b.equation)-this.function(b.xi,b.equation)));
    this.error = this.calerror(fx,b.x);

    while(this.error > b.epsilon){

      fx = b.x-((this.function(b.x,b.equation)*(b.x-b.xi))/(this.function(b.x,b.equation)-this.function(b.xi,b.equation)));
      this.error = this.calerror(fx,b.x);

      let form_record = new VariableSecant(f.get('equation')?.value,b.x,b.xi,fx,this.function(b.xi,b.equation),this.error,f.get('epsilon')?.value,b.iteration);
      this.secantService.addSecant(form_record);

      this.fxArray.push(fx);
      this.xArray.push(b.x);

      b.xi = fx+(b.xi-b.x);
      b.x = fx;
      ++b.iteration

      if(this.error === Infinity){
        break;
      }
    }

    this.answer = b.x; // answer

  }

}

