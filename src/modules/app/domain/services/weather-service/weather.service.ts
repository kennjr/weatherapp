import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

import { AppUtils } from 'src/modules/app/common/AppUtils';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http_client: HttpClient) { }

  get_current_weather(city: string): Promise<any>{
    let query_url = this.construct_url(city)
    return lastValueFrom(this.http_client.get(query_url));
  }

  // we store the string so that we can make a new req. when the user comes back to the app
  store_recent_search_string(search_str: string){
    if(search_str.trim() != ""){
      localStorage.setItem(AppUtils.RECENTLY_SEARCHED_CITY_KEY, search_str);
    }
  }

  // this will give us the city the user search for (most recently), so that we can make an api req for that city
  get_recent_search_string(): string{
    let str = localStorage.getItem(AppUtils.RECENTLY_SEARCHED_CITY_KEY)
    if (str){
      return str;
    }else{
      return AppUtils.DEFAULT_CITY
    }
  }

  private construct_url(city_str: string): string{

    let url = `${AppUtils.CURRENT_WEATHER_URL}key=${environment.api_key}&q=${city_str}`;
    return url;
  }
}
