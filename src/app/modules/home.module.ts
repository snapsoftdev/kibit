import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RouterModule, Routes} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {NgbDateAdapter, NgbDateNativeAdapter, NgbDatepickerModule, NgbDropdownModule, NgbPopoverModule} from '@ng-bootstrap/ng-bootstrap';
import { SideBarComponent } from './side-bar/side-bar.component';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChartCardComponent } from './chart-card/chart-card.component';
import {ColorPickerModule} from 'ngx-color-picker';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    SideBarComponent,
    ChartCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule,
    NgbDatepickerModule,
    NgbPopoverModule,
    NgbDropdownModule,
    NgMultiSelectDropDownModule,
    ColorPickerModule
  ],
  exports: [RouterModule],
  providers: [{provide: NgbDateAdapter, useClass: NgbDateNativeAdapter}]
})
export class HomeModule { }
