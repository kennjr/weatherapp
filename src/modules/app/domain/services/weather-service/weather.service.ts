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

  private construct_url(city_str: string): string{

    let url = `${AppUtils.CURRENT_WEATHER_URL}key=${environment.api_key}&q=${city_str}`;
    return url;
  }
}
