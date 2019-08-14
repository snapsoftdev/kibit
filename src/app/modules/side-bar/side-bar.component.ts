import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SensorModel} from '../../core/service/sensor/model/sensor.model';
import {isNullOrUndefined} from 'util';
import {ChartType, ChartViewModel} from '../../core/store/chart/model/chart.viewmodel';
import randomColor from 'randomcolor';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnChanges {

  @Input()
  sensorList: SensorModel[];
  @Input()
  selectedChart?: ChartViewModel;
  @Input()
  canAddChart: boolean;

  @Output()
  itemSelected = new EventEmitter<{ sensor: SensorModel, color: string }>();
  @Output()
  itemDeselected = new EventEmitter<SensorModel>();
  @Output()
  typeSelected = new EventEmitter<ChartType>();
  @Output()
  onCreateChart = new EventEmitter();
  @Output()
  onColorSelected = new EventEmitter<{sensor: SensorModel, color: string}>();
  @Output()
  onSaveChart = new EventEmitter();
  @Output()
  onDeleteChart = new EventEmitter();

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  chartTypes = ChartType;
  objectKeys = Object.keys;

  constructor() { }

  ngOnInit() {
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 10,
      allowSearchFilter: true,
      enableCheckAll: false
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dropdownList = this.sensorList.map(model => ({ item_id: model.id, item_text: model.type }) );
    this.selectedItems = (isNullOrUndefined(this.selectedChart) || isNullOrUndefined(this.selectedChart.selectedSensors)) ?
      [] : this.selectedChart.selectedSensors.map(model => ({ item_id: model.sensor.id, item_text: model.sensor.type }) );
  }

  createChart() {
    this.onCreateChart.emit();
  }

  saveChart() {
    this.onSaveChart.emit();
  }

  selectType(type: ChartType) {
    this.typeSelected.emit(type);
  }

  onItemSelect(item: any) {
    const selectedModel = this.sensorList.find( model => item.item_id === model.id);

    if (!isNullOrUndefined(selectedModel)) {
      this.itemSelected.emit({ sensor: selectedModel, color: randomColor()});
    }
  }

  onItemDeselect(item: any) {
    const deselectedModel = this.sensorList.find( model => item.item_id === model.id);

    if (!isNullOrUndefined(deselectedModel)) {
      this.itemDeselected.emit(deselectedModel);
    }
  }

  colorSelected(color: string, sensor: SensorModel) {
    this.onColorSelected.emit({sensor: sensor, color: color});
  }

  deleteChart() {
    this.onDeleteChart.emit();
  }
}
