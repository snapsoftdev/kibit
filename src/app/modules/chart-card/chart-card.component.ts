import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ChartViewModel} from '../../core/store/chart/model/chart.viewmodel';
import {isNullOrUndefined} from 'util';
import {SensorDataModel} from '../../core/service/sensor/model/sensor-data.model';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss']
})
export class ChartCardComponent implements OnInit, OnChanges {

  @Input()
  chartViewModel?: ChartViewModel;
  @Input()
  sensorData: SensorDataModel[];

  @Output()
  chartSelected = new EventEmitter<ChartViewModel>();

  sensorDataWithColor: { data: SensorDataModel, color: string}[] = [];

  isNullOrUndefined = isNullOrUndefined;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (isNullOrUndefined(this.sensorData) || isNullOrUndefined(this.chartViewModel)) {
      return;
    }
    this.sensorDataWithColor = this.chartViewModel.selectedSensors.map(selectedSensor => {
      const colorSearchResult = this.sensorData.find(dataModel => selectedSensor.sensor.id === dataModel.sensorId);
      let color = randomColor();
      if (!isNullOrUndefined(colorSearchResult)) {
        color = selectedSensor.color;
        return {data: colorSearchResult, color: color};
      }
      return null;
    })
      .filter( element => !isNullOrUndefined(element));

  }

  cardClick(event: any) {
    this.chartSelected.emit(this.chartViewModel);
    event.stopPropagation();
  }
}
