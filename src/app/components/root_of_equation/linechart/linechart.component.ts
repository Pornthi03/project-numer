import { Component, ViewChild,OnInit } from "@angular/core";
import { Chart, registerables } from "chart.js";
import zoomPlugin from 'chartjs-plugin-zoom';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.css']
})
export class LinechartComponent implements OnInit {

  chart:any;

  constructor(){ }

  ngOnInit(): void {
    this.chart = document.getElementById('mychart');
    Chart.register(...registerables,zoomPlugin);
    this.loadchart();
  }

  loadchart(): void{
    new Chart(this.chart,{
      type:'line',
      data: {
        datasets: [
          {
            data:[12,15,13,17,16,20,11,10,9,8,15,12,11],
            label:'series 1',
            backgroundColor:'#5579c6',
            tension:0.2,
            borderColor:'#5579c6',
          }
        ],
        labels:[
          '1',
          '3',
          '1.5',
          '2',
          '5.5',
          '2.4',
          '1.8',
          '6',
          '6.4',
          '7.4',
          '2',
          '1',
          '4',
        ],
      },
      options:{
        responsive:true,
        maintainAspectRatio:false,
        scales:{
          y:{
            grid:{
              borderDash:[1,2],
            }
            ,beginAtZero:true,
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
              mode: 'xy',
            }
          }
        }
      }
    })
  }

}
