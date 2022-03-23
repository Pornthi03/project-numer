import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableBisection } from './variable-bisection';
import { BisectionService } from 'src/app/services/bisection/bisection.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css']
})
export class BisectionComponent implements OnInit {

  showequation?:string;
  // xl:number
  // xr:number
  // error:number
  // epsilon:number
  answer?:number
  error:number = 1;
  xm?:number
  // variable:VariableBisection;
  variable !: VariableBisection[];
  bisectiongroup:FormGroup;
  xmArray:number[] = [];
  fxmArray:number[] = [];
  chart:any;

  constructor(private fb: FormBuilder,private bisectionService:BisectionService) {
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

  // content = "${"+this.showequation+"}$"

  ngOnInit(): void {
    this.chart = document.getElementById('bisectionchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.fxmArray,
            label:'XM',
            backgroundColor:'#5579c6',
            tension:0.2,
            borderColor:'#5579c6',
          }
        ],
        labels:this.xmArray,
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
    while(this.error > b.epsilon){
      this.xm = this.calxm(b.xl,b.xr)
      let fxm:number = this.function(this.xm,b.equation)
      let fxr:number = this.function(b.xr,b.equation)
      this.showequation = b.equation

      console.log(this.error)
      let form_record = new VariableBisection(f.get('equation')?.value,b.xl,b.xr,this.xm,this.error,f.get('epsilon')?.value,b.iteration);
      this.bisectionService.addVariable(form_record)

      if((fxm * fxr) < 0 ){
        this.error = this.calerror(this.xm,b.xl);
        b.xl = this.xm;
      }else{
        this.error = this.calerror(this.xm,b.xr);
        b. xr = this.xm;
      }
      ++b.iteration

      this.fxmArray.push(fxm)

      if(Infinity === this.error){
        break
      }
    }

    this.answer = this.xm; // answer

    // เอาค่า xm ใส่ array เพื่อเอาไปเป็นค่า x ของกราฟ
    let dataxm = this.variable.values();
    for(let value of dataxm){
      this.xmArray.push(value.xm)
    }

  }
}
