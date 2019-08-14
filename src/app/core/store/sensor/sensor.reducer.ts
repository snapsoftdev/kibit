import {Action} from '@ngrx/store';
import {SensorModel} from '../../service/sensor/model/sensor.model';
import {SensorActions, SensorListSuccessAction, UpdateSensorDataSuccessAction} from './sensor.action';
import {SensorDataModel} from '../../service/sensor/model/sensor-data.model';

export interface SensorState {
  sensorList: SensorModel[];
  sensorData: SensorDataModel[];
}

const initialState: SensorState = {
  sensorList: [],
  sensorData: []
};


export function sensorReducer(state = initialState, action: Action): SensorState {
  switch (action.type) {
    case SensorActions.SENSOR_LIST_SUCCESS:
      return {...state, sensorList: (action as SensorListSuccessAction).payload};

    case SensorActions.SENSOR_DATA_SUCCESS:
      return {...state, sensorData: (action as UpdateSensorDataSuccessAction).payload};

    default:
      return state;
  }
}
