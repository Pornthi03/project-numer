import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { parse } from 'mathjs';
import { VariableOnepoint } from './variable-onepoint';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-onepoint',
  templateUrl: './onepoint.component.html',
  styleUrls: ['./onepoint.component.css']
})
export class OnepointComponent implements OnInit {

  onepointValue: any = [];

  answer?:number
  error?:number;
  x?:number
  variable !: VariableOnepoint[];
  onepointgroup:FormGroup;
  xArray:string[] = [];
  fxArray:number[] = [];
  chart:any;
  Token!:string;


  constructor(private fb: FormBuilder,
    private onepointService:RootService) {
    this.onepointgroup = new FormGroup({
      equation: new FormControl('',Validators.required),
      x: new FormControl('',Validators.required),
      epsilon: new FormControl('0.000001'),
      iteration: new FormControl('1')
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
    const api = environment.API_URL;
      await axios.post(environment.LOGIN_URL, {
        email: environment.EMAIL,
        password: environment.PASSWORD
      }).then(res => {
              this.Token = res.data.accessToken;
              axios.get(api, { headers: {"Authorization" : `Bearer ${this.Token}`} })
              .then(res => {
                for(let i=0;i<res.data.Chapter[2].OnePoint.length;i++){
                  this.onepointValue.push(res.data.Chapter[2].OnePoint[i]);
                  console.log(res.data.Chapter[2].OnePoint[i]);
                }
                return this.onepointValue

              });

            })
  }

  getXLXR(p:string){
    var XLXR = this.onepointValue.find((x: any) => x.equation === p);
    this.x = XLXR.x;
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
            borderColor:'#5579c6',
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

    let fx = this.function(b.x,b.equation)
    this.error = this.calerror(fx,b.x);
    while(this.error > b.epsilon){

      fx = this.function(b.x,b.equation)

      this.error = this.calerror(fx,b.x);

      let form_record = new VariableOnepoint(f.get('equation')?.value,b.x,fx,this.error,f.get('epsilon')?.value,b.iteration);
      this.onepointService.addOnepoint(form_record)

      b.x = fx;

      ++b.iteration

      this.fxArray.push(fx);
      this.xArray.push(b.x.toFixed(6));

      if(this.error == Infinity){
        break;
      }
    }

    this.answer = b.x; // answer

  }
}
