import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SensorService} from './service/sensor/sensor.service';
import {HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    {provide: SensorService, useClass: SensorService}
  ]
})
export class CoreModule { }
