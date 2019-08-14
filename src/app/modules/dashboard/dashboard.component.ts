import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppState, chartState, sensorState} from '../../core/store/app.state';
import {Subject} from 'rxjs';
import {SensorActions} from '../../core/store/sensor/sensor.action';
import {takeUntil} from 'rxjs/operators';
import {SensorModel} from '../../core/service/sensor/model/sensor.model';
import {ChartType, ChartViewModel} from '../../core/store/chart/model/chart.viewmodel';
import {ChartActions, ChartUpdateAction, DeleteChartAction, SelectChartAction, SetChartDate} from '../../core/store/chart/chart.action';
import cloneDeep from 'lodash/cloneDeep';
import {isNullOrUndefined} from 'util';
import uuid from 'uuid';
import {SensorDataModel} from '../../core/service/sensor/model/sensor-data.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  sensorList: SensorModel[] = [];
  sensorData: SensorDataModel[] = [];
  chartList: ChartViewModel[] = [];
  selectedChart?: ChartViewModel;
  from?: Date;
  to?: Date;

  private destroy$ = new Subject();

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.pipe(
      select(sensorState),
      takeUntil(this.destroy$))
      .subscribe( state => {
        this.sensorList = state.sensorList;
        this.sensorData = state.sensorData;
      });

    this.store.pipe(
      select(chartState),
      takeUntil(this.destroy$)
    ).subscribe(state => {
      if (!isNullOrUndefined(this.chartList) && this.chartList.length !== state.chartList.length) {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'));

        }, 0);
      }

      this.chartList = state.chartList;
      this.selectedChart = state.selectedChart;
      this.from = state.fromDate;
      this.to = state.toDate;
    });

    this.store.dispatch({type: SensorActions.SENSOR_LIST});
    this.store.dispatch(new SetChartDate({from: new Date(), to: new Date()}));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCreateChart() {
    const newChart: ChartViewModel = {
      id: uuid(),
      selectedSensors: [],
      type: ChartType.line,
    };

    this.store.dispatch(new SelectChartAction(newChart));
  }

  onChartSelected(chart: ChartViewModel) {
    this.store.dispatch(new SelectChartAction(chart));
  }

  onSaveChart() {
    this.store.dispatch(new ChartUpdateAction(this.selectedChart));
  }

  onDateSelect(range: {from: Date, to: Date}) {
    this.store.dispatch(new SetChartDate({from: range.from, to: range.to}));
  }

  onSensorSelected(model: { sensor: SensorModel, color: string }) {
    const newModel: ChartViewModel = cloneDeep(this.selectedChart);
    if (isNullOrUndefined(newModel)) {
      return;
    }
    newModel.selectedSensors.push(model);
    this.store.dispatch(new SelectChartAction(newModel));
  }

  onSensorDeselected(sensorModel: SensorModel) {
    const newModel = cloneDeep(this.selectedChart);
    if (isNullOrUndefined(newModel)) {
      return;
    }
    newModel.selectedSensors = newModel.selectedSensors.filter( model => model.sensor.id !== sensorModel.id);
    this.store.dispatch(new SelectChartAction(newModel));
  }

  onTypeSelected(type: ChartType) {
    const newModel = cloneDeep(this.selectedChart);
    newModel.type = type;
    this.store.dispatch(new SelectChartAction(newModel));
  }

  onColorSelected(newValue: {sensor: SensorModel, color: string}) {
    const newModel = cloneDeep(this.selectedChart);
    const edited = newModel.selectedSensors.find(sensor => sensor.sensor.id === newValue.sensor.id);
    if (!isNullOrUndefined(edited)) {
      edited.color = newValue.color;
    }
    this.store.dispatch(new SelectChartAction(newModel));
  }

  getDatePickerString(): string {
    let from: string = new Date().toLocaleDateString('hu');
    if (!isNullOrUndefined(this.from)) {
      from = this.from.toLocaleDateString('hu');
    }
    let to: string = new Date().toLocaleDateString('hu');
    if (!isNullOrUndefined(this.to)) {
      to = this.to.toLocaleDateString('hu');
    }
    return '' + from + ' - ' + to;
  }

  onDeleteChart() {
    this.store.dispatch(new DeleteChartAction(this.selectedChart));
  }
}
