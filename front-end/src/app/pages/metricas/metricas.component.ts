import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { BarChart } from 'echarts/charts';
import { GridComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, GridComponent, CanvasRenderer]);

@Component({
  selector: 'app-metricas',
  standalone: true,
  imports: [CommonModule, NgxEchartsDirective],
  templateUrl: './metricas.component.html',
  styleUrl: './metricas.component.sass',
  providers: [
    provideEchartsCore({ echarts }),
  ]
})
export class MetricasComponent {

  chartOption: EChartsCoreOption = {
  
    xAxis:{
      type: 'value',
      axisLabel: {
        position: 'top', 
      }
    },

    yAxis: {
      type: 'category',
      data: ['Secretaria de Infraestrutura', 'Secretaria de Saúde', "Secretaria de Educação" ]
    },

    legend: {
      data: '2024',
      bottom: 0, 
      left: 'center',
    },

    series: [
      {
        type: 'bar',
        data: [77, 92, 15],
        itemStyle: {
          color: '#8979FF'
        },
        label: {
          show: true,
          position: 'right',
          formatter: '{c}'
        }
      }
    ],

    grid: {
      left: '50%',    
      right: '10%',   
      bottom: '30%',  
      top: '10%'
    }

  }

}
