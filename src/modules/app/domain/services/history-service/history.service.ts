import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { AppUtils } from 'src/modules/app/common/AppUtils';
import { WeatherCurrentDto } from 'src/modules/app/data/dto/WeatherCurrentDto';
import { WeatherLocationDto } from 'src/modules/app/data/dto/WeatherLocationDto';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';

// This is needed if we are gon send data to the db or update data that's already in the db
const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  constructor(private http_client: HttpClient) { }

  // the return type is observable, we use that so that we get updates every time shit changes in the db
  get_all_weather_history(): Observable<WeatherCurrentDto[]>{
    return this.http_client.get<WeatherCurrentDto[]>(AppUtils.WEATHER_HISTORY_URL, httpOptions)
  }

  // the return type is observable, we use that so that we get updates every time shit changes in the db
  // eg: a delete
  get_all_location_history(): Observable<WeatherLocationDto[]>{
    return this.http_client.get<WeatherLocationDto[]>(AppUtils.LOCATION_HISTORY_URL, httpOptions)
  }

  get_single_location_history(location: WeatherLocation) :Observable<WeatherLocation>{
    const location_url = `${AppUtils.WEATHER_HISTORY_URL}/${location.id}`
    return this.http_client.get<WeatherLocation>(location_url, httpOptions)
  }

  get_single_weather_history(weather: WeatherCurrent) :Observable<WeatherCurrent>{
    const weather_url = `${AppUtils.LOCATION_HISTORY_URL}/${weather.id}`
    return this.http_client.get<WeatherCurrent>(weather_url, httpOptions)
  }

  add_new_location(location: WeatherLocation): Observable<WeatherLocation>{
    return this.http_client.post<WeatherLocation>(AppUtils.LOCATION_HISTORY_URL, location, httpOptions)
  }

  add_new_weather(weather: WeatherCurrent): Observable<WeatherCurrent>{
    return this.http_client.post<WeatherCurrent>(AppUtils.WEATHER_HISTORY_URL, weather, httpOptions)
  }



  delete_location(location: WeatherLocation): Observable<WeatherLocation>{
    const location_url = `${AppUtils.WEATHER_HISTORY_URL}/${location.id}`
    return this.http_client.delete<WeatherLocation>(location_url, httpOptions)
  }

  delete_weather(weather: WeatherCurrent): Observable<WeatherCurrent>{
    const weather_url = `${AppUtils.WEATHER_HISTORY_URL}/${weather.id}`
    return this.http_client.delete<WeatherCurrent>(weather_url, httpOptions)
  }


}
