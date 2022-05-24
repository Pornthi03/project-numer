import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import zoomPlugin from 'chartjs-plugin-zoom';
import { parse } from 'mathjs';
import { RestApiService } from 'src/app/services/rest-api.service';
import { RootService } from 'src/app/services/root.service';
import { VariableSecant } from './variable-secant';

@Component({
  selector: 'app-secant',
  templateUrl: './secant.component.html',
  styleUrls: ['./secant.component.css']
})
export class SecantComponent implements OnInit {

  secantValue: any = [];
  sc:any = [];

  answer?:number;
  error?:number;
  variable !: VariableSecant[];
  secantgroup:FormGroup;
  xArray:number[] = [];
  fxArray:number[]=[];
  chart:any;

  constructor(private fb: FormBuilder,private secantService:RootService,public restApi: RestApiService) {
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
    console.log( await this.restApi.getEquation().subscribe((data: {}) => {
      this.sc = data;

      for(let i=0;i<this.sc.Chapter[4].Secant.length;i++){
        this.secantValue.push(this.sc.Chapter[4].Secant[i]);
        console.log(this.sc.Chapter[4].Secant[i]);
      }
      return this.secantValue

    }))

    console.log(this.secantValue);
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
            borderColor:'#5579c6'
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

