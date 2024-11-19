import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Forecast } from './model/Forecast';
import { ForecastService } from './services/forecast.service';

@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit, AfterViewInit {

  forecast: Forecast = {
    "coord": {
      "lon": 0,
      "lat": 0
    },
    "weather": [
      {
        "id": 0,
        "main": "",
        "description": "",
        "icon": ""
      }
    ],
    "base": "",
    "main": {
      "temp": 0,
      "feels_like": 0,
      "temp_min": 0,
      "temp_max": 300.05,
      "pressure": 1015,
      "humidity": 64,
      "sea_level": 1015,
      "grnd_level": 933
    },
    "visibility": 10000,
    "wind": {
      "speed": 0.62,
      "deg": 349,
      "gust": 1.18
    },
    "rain": {
      "1h": 3.16
    },
    "clouds": {
      "all": 100
    },
    "dt": 1661870592,
    "sys": {
      "type": 2,
      "id": 2075663,
      "country": "IT",
      "sunrise": 1661834187,
      "sunset": 1661882248
    },
    "timezone": 7200,
    "id": 3163858,
    "name": "Zocca",
    "cod": 200
  };

  constructor(private forecastService: ForecastService) {
   }

  ngOnInit(): void {
    this.forecastService.getByCity("Lima")
    .subscribe((response:any) => {this.forecast = response});
  }

  ngAfterViewInit(): void {
  }

}
