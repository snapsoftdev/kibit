import {Action} from '@ngrx/store';
import {ChartActions, ChartUpdateAction, DeleteChartAction, SelectChartAction, SetChartDate} from './chart.action';
import {ChartViewModel} from './model/chart.viewmodel';
import {isNullOrUndefined} from 'util';

export interface ChartState {
  chartList: ChartViewModel[];
  selectedChart?: ChartViewModel;

  fromDate: Date;
  toDate: Date;
}

const initialState: ChartState = {
  chartList: [],
  fromDate: new Date(),
  toDate: new Date(),
};


export function chartReducer(state = initialState, action: Action): ChartState {
  switch (action.type) {
    case ChartActions.SELECT_CHART:
      return  { ...state , selectedChart: (action as SelectChartAction).payload };

    case ChartActions.CHART_UPDATE:
      const updatedModel = (action as ChartUpdateAction).payload;
      let newChartList = [...state.chartList];

      const index = newChartList.findIndex(chart => chart.id === updatedModel.id);
      newChartList = newChartList.filter( element => element.id !== updatedModel.id);

      if (!isNullOrUndefined(index)) {
        newChartList.splice(index, 0, updatedModel);
      } else {
        newChartList.push(updatedModel);
      }
      return {...state, chartList: newChartList};

    case ChartActions.SET_CHART_DATE:
      return {...state, fromDate: (action as SetChartDate).payload.from, toDate: (action as SetChartDate).payload.to};

    case ChartActions.DELETE_CHART:
      let chartList = [...state.chartList];
      chartList = chartList.filter(chart => chart.id !== (action as DeleteChartAction).payload.id);
      return {...state, chartList: chartList, selectedChart: null}

    default:
      return state;
  }
}
