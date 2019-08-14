import {ActionReducerMap} from '@ngrx/store';
import {chartReducer, ChartState} from './chart/chart.reducer';
import {sensorReducer, SensorState} from './sensor/sensor.reducer';
import {state} from '@angular/animations';

export interface AppState {
  chartState: ChartState;
  sensorState: SensorState;
}

export const reducers: ActionReducerMap<AppState> = {
  chartState: chartReducer,
  sensorState: sensorReducer
};

export const sensorState = (appState: AppState) => appState.sensorState;
export const chartState = (appState: AppState) => appState.chartState;
