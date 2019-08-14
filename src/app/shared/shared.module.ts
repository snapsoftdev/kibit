import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { DatepickerRangeComponent } from './datepicker-range/datepicker-range.component';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartModule} from 'angular-highcharts';



@NgModule({
  declarations: [ChartComponent, DatepickerRangeComponent],
  exports: [
    DatepickerRangeComponent,
    ChartComponent
  ],
  imports: [
    CommonModule,
    NgbDatepickerModule,
    ChartModule
  ],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class SharedModule { }
