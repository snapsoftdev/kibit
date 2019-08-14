import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {SensorService} from '../../service/sensor/sensor.service';
import {
  SensorActions,
  SensorListSuccessAction,
  UpdateSensorDataAction,
  UpdateSensorDataErrorAction,
  UpdateSensorDataSuccessAction
} from './sensor.action';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {of} from 'rxjs';
import {ChartActions, SetChartDate} from '../chart/chart.action';


@Injectable()
export class SensorEffect {

  constructor(private actions$: Actions,
              private sensorService: SensorService) {
  }

  @Effect()
  sensorList$ = this.actions$
    .pipe(
      ofType(SensorActions.SENSOR_LIST),
      mergeMap(() => this.sensorService.getSensorList()
        .pipe(
          map(result => new SensorListSuccessAction(result)
        ),
          catchError(() => of({ type: SensorActions.SENSOR_LIST_ERROR } ))
        )
      )
    );

  @Effect()
  sensorData$ = this.actions$
    .pipe(
      ofType(SensorActions.SENSOR_DATA),
      mergeMap((action: UpdateSensorDataAction) => this.sensorService.dataForSensors(action.payload.from, action.payload.to)
        .pipe(
          map(result => new UpdateSensorDataSuccessAction(result)),
          catchError( () => of(new UpdateSensorDataErrorAction()))
        )
      )
    );

  @Effect()
  chartDate$ = this.actions$
    .pipe(
      ofType(ChartActions.SET_CHART_DATE),
      mergeMap( (action: SetChartDate) => of(new UpdateSensorDataAction(action.payload)))
    );
}
