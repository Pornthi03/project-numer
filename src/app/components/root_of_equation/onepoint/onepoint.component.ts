import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableOnepoint } from './variable-onepoint';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-onepoint',
  templateUrl: './onepoint.component.html',
  styleUrls: ['./onepoint.component.css']
})
export class OnepointComponent implements OnInit {

  onepointValue: any = [];
  op:any = [];

  answer?:number
  error?:number;
  x?:number
  variable !: VariableOnepoint[];
  onepointgroup:FormGroup;
  xArray:number[] = [];
  fxArray:number[] = [];
  chart:any;

  constructor(private fb: FormBuilder,private onepointService:RootService,public restApi: RestApiService) {
    this.onepointgroup = this.fb.group({
      equation:['',Validators.required],
      x: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['1']
    });
    this.getOnepoint();
  }

  ngOnInit(): void {
    this.chart = document.getElementById('onepointchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
    this.loadEquation();
  }

  async loadEquation() {
    console.log( await this.restApi.getEquation().subscribe((data: {}) => {
      this.op = data;

      for(let i=0;i<this.op.Chapter[2].OnePoint.length;i++){
        this.onepointValue.push(this.op.Chapter[2].OnePoint[i]);
        console.log(this.op.Chapter[2].OnePoint[i]);
      }
      return this.onepointValue

    }))

    console.log(this.onepointValue);
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

  getOnepoint(){
    this.variable = this.onepointService.getOnepoint();
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
  cal(b:VariableOnepoint,f:FormGroup){
    this.x = b.x;
    let fx = this.function(this.x,b.equation)
    this.error = this.calerror(fx,this.x);
    while(this.error > b.epsilon){

      fx = this.function(this.x,b.equation)

      this.error = this.calerror(fx,this.x);

      let form_record = new VariableOnepoint(f.get('equation')?.value,this.x,fx,this.error,f.get('epsilon')?.value,b.iteration);
      this.onepointService.addOnepoint(form_record)

      this.x = fx;

      ++b.iteration

      this.fxArray.push(fx);
      this.xArray.push(this.x);

      if(this.error === Infinity){
        break;
      }
    }

    this.answer = this.x; // answer

  }
}
