import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { parse, string } from 'mathjs';
import { VariableBisection } from './variable-bisection';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from 'axios'
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-bisection',
  templateUrl: './bisection.component.html',
  styleUrls: ['./bisection.component.css']
})
export class BisectionComponent implements OnInit {



  bisectionValue: any = [];

  showequation?:string;
  answer?:number
  error?:number;
  xm?:number
  variable !: VariableBisection[];
  bisectiongroup:FormGroup;
  xmArray:string[] = [];
  fxmArray:number[] = [];
  chart:any;
  Token!: string

  xl!:number;
  xr!:number;


  constructor(private fb: FormBuilder,
    private bisectionService:RootService) {
    // this.variable = new VariableBisection("x^4-13",1.5,2.0,0,0,Math.pow(10,-6));
    this.bisectiongroup = new FormGroup({
      equation: new FormControl('',Validators.required),
      xl: new FormControl('',Validators.required),
      xr: new FormControl('',Validators.required),
      epsilon: new FormControl('0.000001'),
      iteration: new FormControl('0')
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
    const api = environment.API_URL;
      await axios.post(environment.LOGIN_URL, {
        email: environment.EMAIL,
        password: environment.PASSWORD
      }).then(res => {
              this.Token = res.data.accessToken;
              axios.get(api, { headers: {"Authorization" : `Bearer ${this.Token}`} })
              .then(res => {
                        for(let i=0;i<res.data.Chapter[0].Bisection.length;i++){
                          this.bisectionValue.push(res.data.Chapter[0].Bisection[i]);
                          console.log(res.data.Chapter[0].Bisection[i]);
                        }
                        return this.bisectionValue
              });
                console.log(this.Token);
            })
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

      this.fxmArray.push(fxm);
      this.xmArray.push(this.xm.toFixed(6));

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
