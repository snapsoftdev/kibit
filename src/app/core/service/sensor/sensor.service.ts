import {Injectable} from '@angular/core';
import {SensorModel} from './model/sensor.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SensorDataModel} from './model/sensor-data.model';
import {isNullOrUndefined} from 'util';


const sensorList: SensorModel[] = [
  {
    id: 1,
    type: 'weather1'
  },
  {
    id: 2,
    type: 'humidity'
  },
  {
    id: 3,
    type: 'weather2'
  },
  {
    id: 4,
    type: 'light'
  },
  {
    id: 5,
    type: 'temperature'
  },
];


@Injectable({
  providedIn: 'root'
})
export class SensorService {

  constructor(private http: HttpClient) {
  }

  getSensorList(): Observable<SensorModel[]> {
    return of(sensorList);
  }

  dataForSensors(from: Date, to: Date): Observable<SensorDataModel[]> {
    let toDate = from;
    if (!isNullOrUndefined(to)) {
      toDate = to;
    }
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((from.getTime() - toDate.getTime()) / (oneDay))) + 1;

    const sensorDataList: SensorDataModel[] = [];
    sensorList.forEach( sensor => {
      const sensorData: SensorDataModel = {
        sensorId: sensor.id,
        sensorName: sensor.type,
        data: []
      };
      for (let i = 0; i < diffDays * 8; i++) {
        sensorData.data.push(Math.random() * 100);
      }
      sensorDataList.push(sensorData);
    });
    return of(sensorDataList);
  }
}
