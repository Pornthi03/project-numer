import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { parse, string } from 'mathjs';
import { VariableBisection } from './variable-bisection';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import { RestApiService } from 'src/app/services/rest-api.service';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css']
})
export class BisectionComponent implements OnInit {

  bisectionValue: any = [];
  bs: any = [] ;

  showequation?:string;
  answer?:number
  error?:number;
  xm?:number
  variable !: VariableBisection[];
  bisectiongroup:FormGroup;
  xmArray:string[] = [];
  fxmArray:number[] = [];
  chart:any;

  xl!:number;
  xr!:number;

  constructor(private fb: FormBuilder,private bisectionService:RootService,public restApi: RestApiService) {
    // this.variable = new VariableBisection("x^4-13",1.5,2.0,0,0,Math.pow(10,-6));
    this.bisectiongroup = this.fb.group({
      equation:['',Validators.required],
      xl: ['',Validators.required],
      xr: ['',Validators.required],
      epsilon: ['0.000001'],
      iteration:['0']
    });
    this.getBisection();
  }

  ngOnInit(): void {
    this.chart = document.getElementById('bisectionchart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
    this.loadEquation();
  }

  async loadEquation() {
    console.log( await this.restApi.getEquation().subscribe((data: {}) => {
      this.bs = data;

      for(let i=0;i<this.bs.Chapter[0].Bisection.length;i++){
        this.bisectionValue.push(this.bs.Chapter[0].Bisection[i]);
        console.log(this.bs.Chapter[0].Bisection[i]);
      }
      return this.bisectionValue

    }))

    console.log(this.bisectionValue);
  }

  getXLXR(p:string){
    var XLXR = this.bisectionValue.find((x: any) => x.equation === p);
    this.xl = XLXR.xl;
    this.xr = XLXR.xr;
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.fxmArray, //y
            label:'XM',
            backgroundColor:'#e3242b',
            tension:0.2,
            borderColor:'#e3242b',
          },
        ],
        labels:this.xmArray, //x
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

  getBisection(){
    this.variable = this.bisectionService.getBisection();
  }

  refresh(): void {
    window.location.reload();
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

    this.xm = this.calxm(b.xl,b.xr)
    let fxm:number = this.function(this.xm,b.equation)
    let fxr:number = this.function(b.xr,b.equation)

    if((fxm * fxr) < 0 ){
      this.error = this.calerror(this.xm,b.xl);
      b.xl = this.xm;
    }else{
      this.error = this.calerror(this.xm,b.xr);
      b.xr = this.xm;
    }

    let form_record = new VariableBisection(f.get('equation')?.value,this.xl,this.xr,this.xm,this.error,f.get('epsilon')?.value,b.iteration);

    while(this.error > b.epsilon){

      form_record = new VariableBisection(f.get('equation')?.value,this.xl,this.xr,this.xm,this.error,f.get('epsilon')?.value,b.iteration);
      this.bisectionService.addBisection(form_record)

      this.xl = b.xl;
      this.xr = b.xr;

      this.xm = this.calxm(b.xl,b.xr)
      fxm = this.function(this.xm,b.equation)
      fxr = this.function(b.xr,b.equation)

      // console.log(this.error)

      if((fxm * fxr) < 0 ){
        this.error = this.calerror(this.xm,b.xl);
        b.xl = this.xm;
      }else{
        this.error = this.calerror(this.xm,b.xr);
        b.xr = this.xm;
      }

      ++b.iteration

      var xm = this.xm;

      this.xmArray.push(xm.toFixed(6));
      console.log(xm.toFixed(6));

      if(this.error == Infinity){
        break
      }
    }


    form_record = new VariableBisection(f.get('equation')?.value,this.xl,this.xr,this.xm,this.error,f.get('epsilon')?.value,b.iteration);
    this.bisectionService.addBisection(form_record)


    this.answer = this.xm; // answer


  }

  // content = "${"+this.showequation+"}$"
}
