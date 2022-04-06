import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableBisection } from './variable-bisection';
import { BisectionService } from 'src/app/services/bisection/bisection.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css']
})
export class BisectionComponent implements OnInit {

  Equationselect: any = [];

  showequation?:string;
  answer?:number
  error?:number;
  xm?:number
  variable !: VariableBisection[];
  bisectiongroup:FormGroup;
  xmArray:number[] = [];
  xlArray:number[] = [];
  xrArray:number[] = [];
  fxmArray:number[] = [];
  errorArray:number[] = [];
  chart:any;

  constructor(private fb: FormBuilder,private bisectionService:BisectionService,public restApi: RestApiService) {
    // this.variable = new VariableBisection("x^4-13",1.5,2.0,0,0,Math.pow(10,-6));
    this.bisectiongroup = this.fb.group({
      equation:['',Validators.required],
      xl: ['',Validators.required],
      xr: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['0']
    });
    this.getPage();
  }



  ngOnInit(): void {
    this.chart = document.getElementById('bisectionchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
    this.loadEquation();
  }

  loadEquation() {
    return this.restApi.getEquationbisection().subscribe((data: {}) => {
      this.Equationselect = data;
    });
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.xlArray,
            label:'XL',
            backgroundColor:'#5579c6',
            tension:0.2,
            borderColor:'#5579c6',
          },
          {
            data:this.xrArray,
            label:'XR',
            backgroundColor:'#0492c2',
            tension:0.2,
            borderColor:'#0492c2',
          },
          {
            data:this.xmArray,
            label:'XM',
            backgroundColor:'#e3242b',
            tension:0.2,
            borderColor:'#e3242b',
          },
          {
            data:this.errorArray,
            label:'ERROR',
            backgroundColor:'#fcd12a',
            tension:0.2,
            borderColor:'#fcd12a',
          },
        ],
        labels:this.fxmArray,
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

  getPage(){
    this.variable = this.bisectionService.getPage();
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
  calxm(xl:number,xr:number):number{
      return (+xl + +xr)/2
  }
  cal(b:VariableBisection,f:FormGroup){
    this.error = this.calerror(b.xl,b.xr);
    this.showequation = b.equation;
    while(this.error > b.epsilon){
      this.xm = this.calxm(b.xl,b.xr)
      let fxm:number = this.function(this.xm,b.equation)
      let fxr:number = this.function(b.xr,b.equation)

      console.log(this.error)
      let form_record = new VariableBisection(f.get('equation')?.value,b.xl,b.xr,this.xm,this.error,f.get('epsilon')?.value,b.iteration);
      this.bisectionService.addVariable(form_record)

      if((fxm * fxr) < 0 ){
        this.error = this.calerror(this.xm,b.xl);
        b.xl = this.xm;
      }else{
        this.error = this.calerror(this.xm,b.xr);
        b.xr = this.xm;
      }
      ++b.iteration

      this.fxmArray.push(fxm);
      this.errorArray.push(this.error);
      this.xmArray.push(this.xm);
      this.xlArray.push(b.xl);
      this.xrArray.push(b.xr);

      if(Infinity === this.error){
        break
      }
    }

    this.answer = this.xm; // answer

  }
  // content = "${"+this.showequation+"}$"
}
