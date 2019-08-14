import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Chart} from 'angular-highcharts';
import {ChartType} from '../../core/store/chart/model/chart.viewmodel';
import {isNullOrUndefined} from 'util';
import {SensorDataModel} from '../../core/service/sensor/model/sensor-data.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnChanges, AfterViewInit {

  @Input()
  chartType?: ChartType;
  @Input()
  chartName?: string;
  @Input()
  sensorDataWithColor?: { data: SensorDataModel, color: string }[];

  chart = new Chart();

  constructor() {
  }

  ngOnInit() {
    this.chart.ref$.subscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!isNullOrUndefined(changes['chartType']) && !isNullOrUndefined(this.chartType)) {
      const chart = new Chart({
        chart: {
          type: this.chartType,
        },
        title: {
          text: this.chartName
        }
      });
      chart.ref$.subscribe(() => {
        this.updateChart();
      });
      this.chart = chart;
      if (isNullOrUndefined(changes['sensorDataWithColor'])) {
        this.addSensorData();
      }
    }
    if (!isNullOrUndefined(changes['sensorDataWithColor'])) {
      this.addSensorData();
    }
    this.updateChart();
  }

  ngAfterViewInit(): void {
    window.dispatchEvent(new Event('resize'));
  }

  updateChart() {
    if (!isNullOrUndefined(this.chart) && !isNullOrUndefined(this.chart.ref)) {
      this.chart.ref.setTitle({
        text: this.chartName
      });
    }
  }

  addSensorData() {
    this.removeAllSeries();
    if (isNullOrUndefined(this.sensorDataWithColor)) {
      return;
    }
    this.sensorDataWithColor.forEach(model => {
      this.chart.addSeries({
        name: '' + model.data.sensorName,
        data: model.data.data,
        type: this.chartType,
        color: model.color
      }, true, false);
    });
  }

  removeAllSeries() {
    if (isNullOrUndefined(this.chart) || isNullOrUndefined(this.chart.ref)) {
      return;
    }
    const length = this.chart.ref.series.length;

    for (let i = length; i >= 0; i--) {
      this.chart.removeSeries(i);
    }
  }
}
