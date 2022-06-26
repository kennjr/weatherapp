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

    // localStorage fun.s
    get_all_history_record_keys(): string[] | null{
      return this.history_service.get_history_item_keys()
    }

    get_all_history_records(keys_array: string[]){
      return this.history_service.get_all_history_records(keys_array)
    }

    get_single_history_record(key: string): string | null{
      return this.history_service.get_history_record_from_localStorage(key)
    }

    add_new_record_to_history(location: WeatherLocation, weather: WeatherCurrent){
      return this.history_service.add_record_to_history(location, weather)
    }

    remove_record_from_localStorage(key: string): any{
      return this.remove_record_from_localStorage(key)
    }

    get_observable_records_list(): Observable<any[]>{
      return this.history_service.history_records_array.asObservable()
    }


    
    set_recently_search_city(city_str: string){
      this.weather_service.store_recent_search_string(city_str);
    }

    get_recently_searched_city(): string{
      return this.weather_service.get_recent_search_string()
    }
}