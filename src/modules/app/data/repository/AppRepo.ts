import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { WeatherService } from '../../domain/services/weather-service/weather.service';

@Injectable({
    providedIn: 'root'
})
export class AppRepo{

  constructor(private weather_service: WeatherService){ }

  get_current_weather_of_city(city: string): Promise<any>{
    return this.weather_service.get_current_weather(city);
  }
}