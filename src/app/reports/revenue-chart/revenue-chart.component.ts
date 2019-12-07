import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { HttpClient } from '@angular/common/http';

declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts)
@Component({
  selector: 'app-revenue-chart',
  templateUrl: './revenue-chart.component.html',
  styleUrls: ['./revenue-chart.component.scss']
})
export class RevenueChartComponent implements OnInit {

  data: any;
  public options: any = {
    title: {
      text: 'Total Sales: INR 12,000',
    },
    chart: {
      height: 300
    },
    // chart: {
    //   backgroundColor: {
    //     linearGradient: [0, 0, 0, 400],
    //     stops: [
    //       [0, 'rgb(96, 96, 96)'],
    //       [1, 'rgb(16, 16, 16)']
    //     ]
    //   }
    // },
    subtitle: {
      text: 'Last Change: 450 (2.5%)',
    },

    xAxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },


    credits: false,
    yAxis: {
      title: {
        text: 'Vistors numbers',
        enabled: false
      }
    },
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
            [0, Highcharts.getOptions().colors[0]],
            [1, new Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        },
        marker: {
          radius: 2
        },
        lineWidth: 1,
        states: {
          hover: {
            lineWidth: 1
          }
        },
        threshold: null
      }
    },
    tooltip: {
      backgroundColor: '#2b2828',
      style: {
        color: 'white',
      },
      borderColor: '#000000',
      shared: true,
      useHTML: true,
      headerFormat: '<medium>{point.key}: {point.y}</medium><table>',
      pointFormat: '',
      valueDecimals: 2
    },
    series: [{
      data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
    }]
  }
  constructor(private httpClient: HttpClient) { }
  ngOnInit() {
    const chart = Highcharts.chart('salesContainer', this.options);
  }


}
