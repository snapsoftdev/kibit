import {SensorModel} from '../../../service/sensor/model/sensor.model';

export enum ChartType {
  line = 'line',
  bar = 'bar'
}

export interface ChartViewModel {
  id: string;
  selectedSensors: { sensor: SensorModel, color: string }[];
  type: ChartType;
}
