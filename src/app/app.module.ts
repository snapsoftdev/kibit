import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ChartModule} from 'angular-highcharts';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {reducers} from './core/store/app.state';
import {SensorEffect} from './core/store/sensor/sensor.effect';
import {CoreModule} from './core/core.module';
import {NgMultiSelectDropDownModule} from 'ng-multiselect-dropdown';
import {ColorPickerModule} from 'ngx-color-picker';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ChartModule,
    CoreModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      SensorEffect
    ]),
    NgMultiSelectDropDownModule.forRoot(),
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
