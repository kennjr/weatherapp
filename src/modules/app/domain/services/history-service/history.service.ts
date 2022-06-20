import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { AppUtils } from 'src/modules/app/common/AppUtils';
import { WeatherCurrentDto } from 'src/modules/app/data/dto/WeatherCurrentDto';
import { WeatherLocationDto } from 'src/modules/app/data/dto/WeatherLocationDto';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';

import * as moment from 'moment';

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

  private construct_history_item_key(): string{
    // we use the current time bc it's a nice way to give a unique key to an item
    var current_timestamp = moment.now();
    return current_timestamp.toString()
  }

  private add_item_key_to_keys_array(key: string){
    let history_items = this.get_history_item_keys()
    if(history_items){
      // check if the length is > 10, so that we can trim the array
      if(history_items.length >= 10){
        let oldest_item = history_items.shift()
        history_items.push(key)
        localStorage.setItem(AppUtils.HISTORY_ITEMS_KEY, JSON.stringify(history_items));
      }
    }else{
      // if the list is empty then we create a new one and add the new item to it
      let new_items_list = [key]
      localStorage.setItem(AppUtils.HISTORY_ITEMS_KEY, JSON.stringify(new_items_list));
    }
  }

  get_history_item_keys(): Array<string> | null{
    let items = localStorage.getItem(AppUtils.HISTORY_ITEMS_KEY)
    if(items){
      // return JSON.parse(items?items:"")
      return JSON.parse(items)
    }else{
      return null
    }
  }

  private add_record_to_storage(location: WeatherLocation, weather: WeatherCurrent, key: string){
    let local_weather = {
      "temp_c": weather.temp_c,
      "temp_f": weather.temp_f,
      "is_day": weather.is_day,
      "condition_txt": weather.condition_txt,
      "wind_kph": weather.wind_kph,
      "wind_mph": weather.wind_mph,
      "wind_degree": weather.wind_degree,
      "wind_dir": weather.wind_dir,
      "pressure_in": weather.pressure_in,
      "pressure_mb": weather.pressure_mb,
      "humidity": weather.humidity,
      "id": weather.id
    }

    let local_location = {
      "id": location.id,
      "name": location.name,
      "lat": location.lat,
      "long": location.long,
      "country": location.country,
      "localtime": location.localtime,
      "tz_id": location.tz_id
    }

    let string_history_record = this.construct_history_record_json_string(local_location, local_weather)
    // store the record
    localStorage.setItem(key, string_history_record)
  }

  private construct_history_record_json_string(location: object, weather: object) :string{
    let item_json_array = [location, weather]
    // we're returning a string bc that's one of the few types that's accepted by localStorage
    return JSON.stringify(item_json_array)
  }

  add_record_to_history(location: WeatherLocation, weather: WeatherCurrent){
    // the key that we'll be using for the record
    let key = this.construct_history_item_key();
    this.add_record_to_storage(location, weather, key)
    // add the key to the keys array
    this.add_item_key_to_keys_array(key)
  }

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

  async add_new_location(location: WeatherLocation): Promise<any>{
    try {
      const value = await lastValueFrom(this.http_client.post<WeatherLocation>(AppUtils.LOCATION_HISTORY_URL, location, httpOptions));
    } catch { (error:any) => {
      console.log("An error was caught ", error.toString())
    } }
  }

  async add_new_weather(weather: WeatherCurrent): Promise<any>{
    try {
      const value = await lastValueFrom(this.http_client.post<WeatherCurrent>(AppUtils.WEATHER_HISTORY_URL, weather, httpOptions));
      console.log("The weather we store ", value);
    } catch { (error:any) => {
      console.log("An error was caught ", error.toString())
    } }
  }

  async delete_location(location: WeatherLocation): Promise<any>{
    try {
      const location_url = `${AppUtils.WEATHER_HISTORY_URL}/${location.id}`
      const value = await lastValueFrom(this.http_client.delete<WeatherLocation>(location_url, httpOptions));
      console.log("The location we delete ", value);
    } catch { (error:any) => {
      console.log("An error was caught ", error.toString())
    } }
  }

  async delete_weather(weather: WeatherCurrent): Promise<any>{
    try {
      const weather_url = `${AppUtils.WEATHER_HISTORY_URL}/${weather.id}`
      const value = await lastValueFrom(this.http_client.delete<WeatherCurrent>(weather_url, httpOptions));
      console.log("The weather we delete ", value);
    } catch { (error:any) => {
      console.log("An error was caught ", error.toString())
    } }
  }


}
