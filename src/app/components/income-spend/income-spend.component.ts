import {Component, OnInit, ElementRef} from '@angular/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from '@angular/common';
import {OlbCardComponent} from '../olb-card/olb-card.component';
import { OlbCard, DetailTransaction } from '../../types/types';
import {IncomeSpendService} from '../../services/olb-services';

@Component({
  moduleId: module.id,
  selector: 'income-spend',
  templateUrl: 'income-spend.component.html',
  styleUrls: ['./income-spend.component.css'],
  directives: [NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES, OlbCardComponent],
  providers: [IncomeSpendService]
})

export class IncomeSpendComponent implements OlbCard {

  private chartElm: HTMLCanvasElement;
  private chartCtx: CanvasRenderingContext2D;
  private chartObj: Chart;
  private element: Element;

  public title = 'MY INCOME TO SPENDING';
  public status = 'Loading...';
  public dataLoaded = false;
  public detailTransactions: DetailTransaction = {};
  public currentYear = new Date().getUTCFullYear();
  public lastYear = this.currentYear - 1;
  public selectedYear: number;

  public avgWithdrawal: number;
  public avgDeposit: number;

  public barChartLabels: string[]
  public barChartType: string = 'bar';
  public barChartLegend: boolean = false;
  public barChartColors: Array<any> = [
    {
      backgroundColor: '#5771aa',
      borderColor: '#5771aa',
      pointBackgroundColor: '#5771aa',
      pointBorderColor: 'green',
      pointHoverBackgroundColor: 'green',
      pointHoverBorderColor: '#5771aa'
    },
    {
      backgroundColor: '#7eb5e2',
      borderColor: '#7eb5e2',
      pointBackgroundColor: 'red',
      pointBorderColor: 'blue',
      pointHoverBackgroundColor: 'green',
      pointHoverBorderColor: 'green'
    }
  ];

  public barChartOptions: any = {
    responsive: true,
    scaleShowGridLines: false,
    showTooltips: true,
    legend: {
      display: false,
    },
    maintainAspectRatio: false,
    scales: {
      yAxes: [{
        gridLines: {
          display: false
        },
        ticks: {
          // Create scientific notation labels
          callback: function (valuePayload: any, index: any, values: any) {
            return '$' + Number(valuePayload).toFixed(2);
          }
        }
      }],
      xAxes: [{
        gridLines: {
          display: false
        }
      }]
    },
    //new one
    tooltips: {
      enabled: false
    },
    scaleLabel: {
      display: false,
    },
    hover: {
      mode: 'single',
      onHover: this.updateSelectedAccount.bind(this)
    },
  };

  /**
   *
   */
  constructor(htmlElement: ElementRef, private service: IncomeSpendService) {
    this.element = htmlElement.nativeElement;
  }

  ngOnInit() {
    this.populateChart(this.currentYear);
  };

  public populateChart(year: number): void {
    // Reset canvas
    if (this.chartObj != null) {
      this.chartObj.destroy();
    }
    this.selectedYear = year;
    this.detailTransactions.avgIncome = 0;
    this.detailTransactions.avgSpent = 0;

    this.dataLoaded = false;
    this.element.querySelector(".monthly-view-selector .monthly-view.active").classList.remove("active");

    this.service.getIncomeSpendingByYear(year)
      .subscribe(data => {

        let info = data as Summary;

        let max = 60000;
        let step = max / 5;

        this.barChartOptions.scales.yAxes[0].ticks.max = max;
        this.barChartOptions.scales.yAxes[0].ticks.stepSize = step;

        this.chartElm = document.getElementsByClassName("chart")[0] as HTMLCanvasElement;
        this.chartCtx = this.chartElm.getContext('2d');

        this.chartObj = new Chart(this.chartCtx, {
          type: 'bar',
          data: {
            labels: info.labels, //this.barChartLabels,
            datasets: [{
              label: 'Income',
              data: info.data[1] ? info.data[1] : [],
              backgroundColor: "#5771aa",
              borderColor: "#5771aa",
              borderWidth: 0
            },
              {
                label: 'Spending',
                data: info.data[0] ? info.data[0] : [],
                backgroundColor: '#7eb5e2',
                borderColor: '#7eb5e2',
                borderWidth: 0
              }]
          },
          options: this.barChartOptions
        });

        this.detailTransactions.currentStateMonth = "Average ";
        let totalIncome: number = 0;
        let totalSpent: number = 0;

        for (let index = 0; index < info.data[0].length; index++) {
          totalIncome += info.data[1][index];
          totalSpent += info.data[0][index];
        }

        this.avgWithdrawal = this.detailTransactions.avgSpent = totalSpent / info.labels.length;
        this.avgDeposit = this.detailTransactions.avgIncome = totalIncome / info.labels.length;

        this.element.querySelector(`#view${year}`).classList.add("active");

        this.dataLoaded = true;

      });
  }

  /**
  * Updates the selected account information on detail transaction section
  * @param evt A onmousehover event object.
  */
  public updateSelectedAccount(evt: any): void {

    //ig there are more that one element, there is hover on a bar, if not, is out of chart or bars
    if (evt != null && evt.length > 0) {
      let activeElements = evt;
      let index = evt[0]._index;
      let config: any = activeElements[0]._chart.config.data;

      this.detailTransactions.currentStateMonth = config.labels[index];
      this.detailTransactions.avgIncome = config.datasets[0].data[index]; //[0] = Income
      this.detailTransactions.avgSpent = config.datasets[1].data[index]; //[1] = Spend
    }
    else {
      this.detailTransactions.currentStateMonth = "Average ";
      this.detailTransactions.avgSpent = this.avgWithdrawal;
      this.detailTransactions.avgIncome = this.avgDeposit;
    }
  }

  // events
  public chartClicked(e: any): void {
  }

  public chartHovered(e: any): void {
  }
}