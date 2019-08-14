import {Action} from '@ngrx/store';
import {SensorModel} from '../../service/sensor/model/sensor.model';
import {SensorDataModel} from '../../service/sensor/model/sensor-data.model';

export enum SensorActions {
  SENSOR_LIST = 'SENSOR_LIST',
  SENSOR_LIST_SUCCESS = 'SENSOR_LIST_SUCCESS',
  SENSOR_LIST_ERROR = 'SENSOR_LIST_ERROR',

  SENSOR_DATA = 'SENSOR_DATA',
  SENSOR_DATA_SUCCESS = 'SENSOR_DATA_SUCCESS',
  SENSOR_DATA_ERROR = 'SENSOR_DATA_ERROR',
}

export class SensorListSuccessAction implements Action {
  readonly type = SensorActions.SENSOR_LIST_SUCCESS;

  constructor(public payload: SensorModel[]) {}
}

export class UpdateSensorDataAction implements Action {
  readonly type = SensorActions.SENSOR_DATA;

  constructor(public payload: { from: Date, to: Date}) {}
}

export class UpdateSensorDataSuccessAction implements Action {
  readonly type = SensorActions.SENSOR_DATA_SUCCESS;

  constructor(public payload: SensorDataModel[]) {}
}

export class UpdateSensorDataErrorAction implements Action {
  readonly type = SensorActions.SENSOR_DATA_ERROR;
}
