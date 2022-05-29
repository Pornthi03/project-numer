import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { derivative, parse } from 'mathjs';
import { VariableNewtonraphon } from './variable-newtonraphon';
import { RootService } from 'src/app/services/root.service';
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';
import axios from 'axios';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-newtonraphson',
  templateUrl: './newtonraphson.component.html',
  styleUrls: ['./newtonraphson.component.css']
})
export class NewtonraphsonComponent implements OnInit {

  newtonValue: any = [];

  answer?:number
  error?:number;
  variable !: VariableNewtonraphon[];
  newtonraphsongroup:FormGroup;
  xArray:number[] = [];
  fxArray:number[] = [];
  chart:any;
  x!:number;
  Token!:string;

  constructor(private fb: FormBuilder,
    private newtonraphsonService:RootService) {
    this.newtonraphsongroup = new FormGroup({
      equation: new FormControl('',Validators.required),
      x: new FormControl('',Validators.required),
      epsilon: new FormControl('0.000001'),
      iteration: new FormControl('1')
    });
    this.getNewtonraphson();
   }

  ngOnInit(): void {
    this.chart = document.getElementById('newtonraphsonchart');
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
                      for(let i=0;i<res.data.Chapter[3].NewtonRaphson.length;i++){
                        this.newtonValue.push(res.data.Chapter[3].NewtonRaphson[i]);
                        console.log(res.data.Chapter[3].NewtonRaphson[i]);
                      }
                      return this.newtonValue

                    });
                  })
  }

  getXLXR(p:string){
    var XLXR = this.newtonValue.find((x: any) => x.equation === p);
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
            borderColor:'#5579c6'
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

  getNewtonraphson(){
    this.variable = this.newtonraphsonService.getNewtonraphson();
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

  dfunction (x:number,equation:string):number {
    try{
        let dEquation = derivative(equation,'x');
        return dEquation.evaluate({x:x});
    }
    catch(error){
        console.log("Equation Error : "+error);
    }
    return 0;
  }
  calerror(xN:number,xO:number):number{
    return Math.abs((xN-xO)/xN);
  }
  cal(b:VariableNewtonraphon,f:FormGroup){

    let dfx = this.dfunction(b.x,b.equation);
    let fx = b.x-(this.function(b.x,b.equation)/dfx);
    this.error = this.calerror(fx,b.x);
    while(this.error > b.epsilon){

      dfx = this.dfunction(b.x,b.equation);
      fx = b.x-(this.function(b.x,b.equation)/dfx);

      this.error = this.calerror(fx,b.x);

      let form_record = new VariableNewtonraphon(f.get('equation')?.value,b.x,fx,dfx,this.error,f.get('epsilon')?.value,b.iteration);
      this.newtonraphsonService.addNewtonraphson(form_record)

      this.fxArray.push(fx);
      this.xArray.push(b.x);

      b.x = fx;
      ++b.iteration

      if(this.error === Infinity){
        break;
      }
    }

    this.answer = b.x; // answer

  }
}
