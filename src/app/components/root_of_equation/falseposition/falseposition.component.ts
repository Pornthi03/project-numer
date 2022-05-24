import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableFalsepositon } from './variable-falsepositon';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-falseposition',
  templateUrl: './falseposition.component.html',
  styleUrls: ['./falseposition.component.css']
})
export class FalsepositionComponent implements OnInit {


  falsepositionValue: any = [];
  fs:any = [];
  answer?:number
  error?:number;
  x1?:number
  variable !: VariableFalsepositon[];
  falsepositiongroup:FormGroup;
  x1Array:number[] = [];
  xlArray:number[] = [];
  xrArray:number[] = [];
  fx1Array:number[] = [];
  errorArray:number[] = [];
  chart:any;

  constructor(private fb: FormBuilder,private falsepositionService:RootService,public restApi: RestApiService) {
    this.falsepositiongroup = this.fb.group({
      equation:['',Validators.required],
      xl: ['',Validators.required],
      xr: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['0']
    });
    this.getFalseposition();
  }

  ngOnInit(): void {
    this.chart = document.getElementById('falsepositionchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
    this.loadEquation();
  }

  async loadEquation() {
    console.log( await this.restApi.getEquation().subscribe((data: {}) => {
      this.fs = data;

      for(let i=0;i<this.fs.Chapter[1].FalsePosition.length;i++){
        this.falsepositionValue.push(this.fs.Chapter[1].FalsePosition[i]);
        console.log(this.fs.Chapter[1].FalsePosition[i]);
      }
      return this.falsepositionValue

    }))

    console.log(this.falsepositionValue);
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
            data:this.x1Array,
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
        labels:this.fx1Array,
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

  getFalseposition(){
    this.variable = this.falsepositionService.getFalseposition();
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
  calx1(xl:number,xr:number,fxl:number,fxr:number):number{
      return +(+(+xl * +fxr) - +(+xr * +fxl)) / +(+fxr - +fxl)
  }
  cal(b:VariableFalsepositon,f:FormGroup){
    let xl:number = b.xl;
    let xr:number = b.xr;

    let fxl:number = this.function(b.xl,b.equation)
    let fxr:number = this.function(b.xr,b.equation)
    this.x1 = this.calx1(b.xl,b.xr,fxl,fxr)
    let fx1:number = this.function(this.x1,b.equation)

    if((fx1 * fxr) < 0 ){
      this.error = this.calerror(this.x1,b.xl);
      b.xl = this.x1;
    }else{
      this.error = this.calerror(this.x1,b.xr);
      b. xr = this.x1;
    }

    let form_record = new VariableFalsepositon(f.get('equation')?.value,xl,xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);

    while(this.error > b.epsilon){

      form_record = new VariableFalsepositon(f.get('equation')?.value,xl,xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);
      this.falsepositionService.addFalseposition(form_record)

      xl = b.xl;
      xr = b.xr;

      fxl = this.function(b.xl,b.equation)
      fxr = this.function(b.xr,b.equation)
      this.x1 = this.calx1(b.xl,b.xr,fxl,fxr)
      fx1 = this.function(this.x1,b.equation)

      if((fx1 * fxr) < 0 ){
        this.error = this.calerror(this.x1,b.xl);
        b.xl = this.x1;
      }else{
        this.error = this.calerror(this.x1,b.xr);
        b. xr = this.x1;
      }
      ++b.iteration

      this.fx1Array.push(fx1);
      this.x1Array.push(this.x1);
      this.xlArray.push(b.xl);
      this.xrArray.push(b.xr);
      this.errorArray.push(this.error)


      if(Infinity === this.error){
        break
      }
      console.log(this.error)
    }
    form_record = new VariableFalsepositon(f.get('equation')?.value,xl,xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);
    this.falsepositionService.addFalseposition(form_record)

    this.answer = this.x1; // answer
  }

}
