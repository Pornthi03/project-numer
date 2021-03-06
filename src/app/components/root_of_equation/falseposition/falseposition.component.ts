import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableFalsepositon } from './variable-falsepositon';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-falseposition',
  templateUrl: './falseposition.component.html',
  styleUrls: ['./falseposition.component.css']
})
export class FalsepositionComponent implements OnInit {

  falsepositionValue: any = [];
  answer?:number
  error?:number;
  x1?:number
  variable !: VariableFalsepositon[];
  falsepositiongroup:FormGroup;
  x1Array:string[] = [];
  fx1Array:number[] = [];
  chart:any;
  Token!:string;

  xl!:number;
  xr!:number;

  constructor(private fb: FormBuilder,
    private falsepositionService:RootService) {
    this.falsepositiongroup = new FormGroup({
      equation: new FormControl('',Validators.required),
      xl: new FormControl('',Validators.required),
      xr: new FormControl('',Validators.required),
      epsilon: new FormControl('0.000001'),
      iteration: new FormControl('0')
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
    const api = environment.API_URL;
      await axios.post(environment.LOGIN_URL, {
        email: environment.EMAIL,
        password: environment.PASSWORD
      }).then(res => {
              this.Token = res.data.accessToken;
              axios.get(api, { headers: {"Authorization" : `Bearer ${this.Token}`} })
              .then(res => {
                      for(let i=0;i<res.data.Chapter[1].FalsePosition.length;i++){
                        this.falsepositionValue.push(res.data.Chapter[1].FalsePosition[i]);
                        console.log(res.data.Chapter[1].FalsePosition[i]);
                      }
                      return this.falsepositionValue
            });
          })
  }


  getXLXR(p:string){
    var XLXR = this.falsepositionValue.find((x: any) => x.equation === p);
    this.xl = XLXR.xl;
    this.xr = XLXR.xr;
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:this.fx1Array,
            label:'X1',
            backgroundColor:'#e3242b',
            tension:0.2,
            borderColor:'#e3242b',
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

    let form_record = new VariableFalsepositon(f.get('equation')?.value,this.xl,this.xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);

    while(this.error > b.epsilon){

      form_record = new VariableFalsepositon(f.get('equation')?.value,this.xl,this.xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);
      this.falsepositionService.addFalseposition(form_record)

      this.xl = b.xl;
      this.xr = b.xr;

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
      this.x1Array.push(this.x1.toFixed(6));


      if(Infinity === this.error){
        break
      }
      console.log(this.error)
    }
    form_record = new VariableFalsepositon(f.get('equation')?.value,this.xl,this.xr,this.x1,this.error,f.get('epsilon')?.value,b.iteration);
    this.falsepositionService.addFalseposition(form_record)

    this.answer = this.x1; // answer
  }

}
