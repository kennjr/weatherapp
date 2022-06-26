import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AppUtils } from 'src/modules/app/common/AppUtils';
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

  history_records_array = new BehaviorSubject<any[]>([]);

  constructor() { }

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
        // remove the record from the localStorage too
        if(oldest_item){
          this.remove_history_item_from_localStorage(oldest_item);
        }
        history_items.push(key)
        localStorage.setItem(AppUtils.HISTORY_ITEMS_KEY, JSON.stringify(history_items));
      }else{
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
    let item_json_array = [{location}, {weather}]
    // we're returning a string bc that's one of the few types that's accepted by localStorage
    return JSON.stringify(item_json_array)
  }

  add_record_to_history(location: WeatherLocation, weather: WeatherCurrent){
    // the key that we'll be using for the record
    let key = this.construct_history_item_key();
    this.add_record_to_storage(location, weather, key)
    // add the key to the keys array
    this.add_item_key_to_keys_array(key)
    let keys = this.get_history_item_keys()
    this.get_all_history_records(keys?keys:[])
  }

  remove_record_from_history(key: string){
    if(key.trim() != ""){
      this.remove_history_item_key_from_array(key);
      this.remove_history_item_from_localStorage(key);
      
      let keys = this.get_history_item_keys()
      this.get_all_history_records(keys?keys:[])
    }
  }

  private remove_history_item_key_from_array(key: string){
    let history_items = this.get_history_item_keys()
    if(history_items){
      let updated_history_items_array = history_items.filter(function(value, index, arr){ 
        return value != key;
      });
      localStorage.setItem(AppUtils.HISTORY_ITEMS_KEY, JSON.stringify(updated_history_items_array));
    }
  }

  private remove_history_item_from_localStorage(key: string, record?: object){
    localStorage.removeItem(key);
  }

  get_all_history_records(keys_array: Array<string>){
    if(keys_array != null && keys_array.length >= 1){
      let records_list = []
      for(let key of keys_array){
        let record = localStorage.getItem(key)
        if(record != null){
          records_list.push(JSON.parse(record))
        }
      }
      this.history_records_array.next(records_list);
      // return records_list
    }
    else{
      // return []
    }
  }

  get_history_record_from_localStorage(key: string): string | null{
    let record = localStorage.getItem(key)
    if(record != null){
      return JSON.parse(record)
    }else{
      return null
    }
  }

}
