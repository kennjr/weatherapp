import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HistoryService } from '../../domain/services/history-service/history.service';
import { WeatherService } from '../../domain/services/weather-service/weather.service';
import { WeatherCurrent, WeatherLocation } from '../model/weather';

@Injectable({
    providedIn: 'root'
})
export class AppRepo{

  constructor(private weather_service: WeatherService, private history_service: HistoryService){ }

  get_current_weather_of_city(city: string): Promise<any>{
    return this.weather_service.get_current_weather(city);
  }


    // the return type is observable, we use that so that we get updates every time shit changes in the db
    get_all_weather_history(): Observable<WeatherCurrent[]>{
      return this.history_service.get_all_weather_history()
    }
  
    // the return type is observable, we use that so that we get updates every time shit changes in the db
    // eg: a delete
    get_all_location_history(): Observable<WeatherLocation[]>{
      return this.history_service.get_all_location_history()
    }
  
    get_single_location_history(location: WeatherLocation) :Observable<WeatherLocation>{
      return this.history_service.get_single_location_history(location)
    }
  
    get_single_weather_history(weather: WeatherCurrent) :Observable<WeatherCurrent>{
      return this.history_service.get_single_weather_history(weather)
    }
  
    add_new_location_to_history(location: WeatherLocation): Promise<WeatherLocation>{
      return this.history_service.add_new_location(location);
    }
  
    add_new_weather_to_history(weather: WeatherCurrent): Promise<WeatherCurrent>{
      return this.history_service.add_new_weather(weather);
    }
  
  
  
    delete_location_from_history(location: WeatherLocation): Observable<WeatherLocation>{
      return this.history_service.delete_location(location);
    }
  
    delete_weather_from_history(weather: WeatherCurrent): Observable<WeatherCurrent>{
      return this.history_service.delete_weather(weather)
    }
  

}