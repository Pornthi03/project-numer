import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableFalsepositon } from './variable-falsepositon';
import { FalsepositionService } from 'src/app/services/falseposition/falseposition.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';


@Component({
  selector: 'app-falseposition',
  templateUrl: './falseposition.component.html',
  styleUrls: ['./falseposition.component.css']
})
export class FalsepositionComponent implements OnInit {

  answer?:number
  error:number = 1;
  x1?:number
  variable !: VariableFalsepositon[];
  falsepositiongroup:FormGroup;
  x1Array:number[] = [];
  fx1Array:number[] = [];
  chart:any;

  constructor(private fb: FormBuilder,private falsepositionService:FalsepositionService) {
    this.falsepositiongroup = this.fb.group({
      equation:['',Validators.required],
      xl: ['',Validators.required],
      xr: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['1']
    });
    this.getPage();
  }

  ngOnInit(): void {
    this.chart = document.getElementById('falsepositionchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.fx1Array,
            label:'X1',
            backgroundColor:'#5579c6',
            tension:0.2,
            borderColor:'#5579c6',
          }
        ],
        labels:this.x1Array,
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
    this.variable = this.falsepositionService.getPage();
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
    while(this.error > b.epsilon){
      console.log(b.epsilon)
      let fxl:number = this.function(b.xl,b.equation)
      let fxr:number = this.function(b.xr,b.equation)
      this.x1 = this.calx1(b.xl,b.xr,fxl,fxr)
      let fx1:number = this.function(this.x1,b.equation)

      let form_record = new VariableFalsepositon(f.get('equation')?.value,b.xl,b.xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);
      this.falsepositionService.addVariable(form_record)

      if((fx1 * fxr) < 0 ){
        this.error = this.calerror(this.x1,b.xl);
        b.xl = this.x1;
      }else{
        this.error = this.calerror(this.x1,b.xr);
        b. xr = this.x1;
      }
      ++b.iteration

      this.fx1Array.push(fx1)

      if(Infinity === this.error){
        break
      }
      console.log(this.error)
    }

    this.answer = this.x1; // answer

    // เอาค่า x1 ใส่ array เพื่อเอาไปเป็นค่า x ของกราฟ
    let datax1 = this.variable.values();
    for(let value of datax1){
      this.x1Array.push(value.x1)
    }
  }

}
