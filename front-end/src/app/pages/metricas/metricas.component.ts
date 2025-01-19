import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NgxEchartsDirective, provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts/core';
import { EChartsCoreOption } from 'echarts/core';
import { BarChart, PieChart } from 'echarts/charts';
import { GridComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
echarts.use([BarChart, GridComponent, CanvasRenderer, PieChart, LegendComponent]);

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

  secretariasBar: EChartsCoreOption = {
  
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
      data: ['2024'],
      show: true
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

  gastosPie: EChartsCoreOption = {

    legend: {
      bottom: 10,
      left: 'center',
      data: ['Saúde', 'Educação', 'Infraestrutura', 'Comunicação', 'Cultura'],
      show: true
    },

    series: [
      {
        type: 'pie',
        radius: [60, 140],
        roseType: 'radius',
        label: {
          show: false
        },
        data: [
          { value: 158, name: 'Saúde' },
          { value: 256, name: 'Educação' },
          { value: 235, name: 'Infraestrutura' },
          { value: 132, name: 'Comunicação' },
          { value: 321, name: 'Cultura' }

        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],

  }

}
