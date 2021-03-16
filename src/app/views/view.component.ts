import { Component, OnInit } from '@angular/core';
import { ViewService } from '../../services/view.service';
import { IView } from '../../model/view';

declare var echarts: any;
declare var $: any;

@Component({
  selector: 'app-views',
  templateUrl: './view.component.html'
})


export class ViewsComponent implements OnInit {

  constructor(private viewService : ViewService) { }

  years : any[];
  loading: boolean;

  ngOnInit() {
    this.loading = true;
    const currentYear = new Date().getFullYear();

    this.years = new Array();
    for(let year=currentYear;year>=2012;year--)
        this.years.push(year);

    this.years.push('All');
    this.loadGraph(currentYear);
  }

  loadGraph(year:number){
    this.viewService.getViews(year).subscribe(
      views => this.buidViewsArray(views)
    );
  }

  buidViewsArray(views:IView[]){
    let numbers = [];
    let barNames = [];

    for(let i=0;i<views.length;i++){
      numbers[i] = views[i].number;
      barNames[i] = views[i].monthName;
    }
    
    this.buildGraph(numbers, barNames); 
  }    


  buildGraph(numbers:Number[], barNames: String[]) {
    var chart = document.getElementById('view-chart-bar');

    if (chart) {

      var theme = {
        color: [
          '#26B99A', '#34495E', '#BDC3C7', '#3498DB',
          '#9B59B6', '#8abb6f', '#759c6a', '#bfd3b7'
        ],

        title: {
          itemGap: 8,
          textStyle: {
            fontWeight: 'normal',
            color: '#408829'
          }
        },

        dataRange: {
          color: ['#1f610a', '#97b58d']
        },

        toolbox: {
          color: ['#408829', '#408829', '#408829', '#408829']
        },

        tooltip: {
          backgroundColor: 'rgba(0,0,0,0.5)',
          axisPointer: {
            type: 'line',
            lineStyle: {
              color: '#408829',
              type: 'dashed'
            },
            crossStyle: {
              color: '#408829'
            },
            shadowStyle: {
              color: 'rgba(200,200,200,0.3)'
            }
          }
        },

        dataZoom: {
          dataBackgroundColor: '#eee',
          fillerColor: 'rgba(64,136,41,0.2)',
          handleColor: '#408829'
        },
        grid: {
          borderWidth: 0
        },

        categoryAxis: {
          axisLine: {
            lineStyle: {
              color: '#408829'
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#eee']
            }
          }
        },

        valueAxis: {
          axisLine: {
            lineStyle: {
              color: '#408829'
            }
          },
          splitArea: {
            show: true,
            areaStyle: {
              color: ['rgba(250,250,250,0.1)', 'rgba(200,200,200,0.1)']
            }
          },
          splitLine: {
            lineStyle: {
              color: ['#eee']
            }
          }
        },
        timeline: {
          lineStyle: {
            color: '#408829'
          },
          controlStyle: {
            normal: { color: '#408829' },
            emphasis: { color: '#408829' }
          }
        },

        k: {
          itemStyle: {
            normal: {
              color: '#68a54a',
              color0: '#a9cba2',
              lineStyle: {
                width: 1,
                color: '#408829',
                color0: '#86b379'
              }
            }
          }
        },
        map: {
          itemStyle: {
            normal: {
              areaStyle: {
                color: '#ddd'
              },
              label: {
                textStyle: {
                  color: '#c12e34'
                }
              }
            },
            emphasis: {
              areaStyle: {
                color: '#99d2dd'
              },
              label: {
                textStyle: {
                  color: '#c12e34'
                }
              }
            }
          }
        },
        force: {
          itemStyle: {
            normal: {
              linkStyle: {
                strokeColor: '#408829'
              }
            }
          }
        },
        chord: {
          padding: 4,
          itemStyle: {
            normal: {
              lineStyle: {
                width: 1,
                color: 'rgba(128, 128, 128, 0.5)'
              },
              chordStyle: {
                lineStyle: {
                  width: 1,
                  color: 'rgba(128, 128, 128, 0.5)'
                }
              }
            },
            emphasis: {
              lineStyle: {
                width: 1,
                color: 'rgba(128, 128, 128, 0.5)'
              },
              chordStyle: {
                lineStyle: {
                  width: 1,
                  color: 'rgba(128, 128, 128, 0.5)'
                }
              }
            }
          }
        },
        gauge: {
          startAngle: 225,
          endAngle: -45,
          axisLine: {
            show: true,
            lineStyle: {
              color: [[0.2, '#86b379'], [0.8, '#68a54a'], [1, '#408829']],
              width: 8
            }
          },
          axisTick: {
            splitNumber: 10,
            length: 12,
            lineStyle: {
              color: 'auto'
            }
          },
          axisLabel: {
            textStyle: {
              color: 'auto'
            }
          },
          splitLine: {
            length: 18,
            lineStyle: {
              color: 'auto'
            }
          },
          pointer: {
            length: '90%',
            color: 'auto'
          },
          title: {
            textStyle: {
              color: '#333'
            }
          },
          detail: {
            textStyle: {
              color: 'auto'
            }
          }
        },
        textStyle: {
          fontFamily: 'Arial, Verdana, sans-serif'
        }
      };

      var myChart = echarts.init(chart, theme);

      // specify chart configuration item and data
      var option = {
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: false,
        },
        calculable: true,
        legend: {
          data: ['Views']
        },
        xAxis: [
          {
            type: 'category',
            data: barNames
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Questions',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [

          {
            name: 'New Views',
            type: 'bar',
            data: numbers,
            markPoint: {
              data: [
                { type: 'max', name: 'max Views' },
                { type: 'min', name: 'min Views' }
              ]
            }
          }
        ]
      };

      // use configuration item and data specified to show chart
      myChart.setOption(option);
    }
    this.loading = false;
  }

}
