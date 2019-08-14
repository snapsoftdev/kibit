import {Action} from '@ngrx/store';
import {ChartViewModel} from './model/chart.viewmodel';


export enum ChartActions {
  SELECT_CHART = 'SELECT_CHART',
  CHART_UPDATE = 'CHART_UPDATE',
  DELETE_CHART = 'DELETE_CHART',

  SET_CHART_DATE = 'SET_CHART_DATE'
}

export class ChartUpdateAction implements Action {
  readonly type = ChartActions.CHART_UPDATE;

  constructor(public payload: ChartViewModel) {}
}

export class SelectChartAction implements Action {
  readonly type = ChartActions.SELECT_CHART;

  constructor(public payload: ChartViewModel) {}
}

export class SetChartDate implements Action {
  readonly type = ChartActions.SET_CHART_DATE;

  constructor(public payload: { from: Date, to: Date}) {}
}

export class DeleteChartAction implements Action {
  readonly type = ChartActions.DELETE_CHART;

  constructor(public payload: ChartViewModel) {}
}
