import { Component, OnInit } from '@angular/core';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search_string!:string;

  // the location and current
  current_weather!: WeatherCurrent;
  current_location!: WeatherLocation;

  constructor(private repo: AppRepo) { }

  ngOnInit(): void {
  }

  key_has_been_pressed(key :string){
    // check if the pressed key is Enter
    if(key == "Enter"){
      if (this.search_string != null && this.search_string.trim() != ""){
        this.make_search_request(this.search_string);
      }
      else{
        // TODO show some sort of snackbar that appears from the bottom or bottom-left
      }
    }
  }

  private make_search_request(city: string){
    this.repo.get_current_weather_of_city(this.search_string).then(
      (response: any) => {
        // check what type of response we got
        let js_response = JSON.parse(JSON.stringify(response));
        let response_location = response['location']
        let response_error = response['error']
        let response_current = response['current']

        if(response_error != null){
          // the request wasn't successful
          // TODO figure out what to do (probably show the user old data or a msg)
        }else{
          // the request was successful
          // set the location and current_weather
          this.current_location = new WeatherLocation(response_location.name, response_location.country, response_location.lat, response_location.lon, response_location.localtime, response_location.tz_id)

          this.current_weather = new WeatherCurrent(response_current.temp_c, response_current.temp_f, response_current.is_day, response_current.condition['text'], response_current.wind_kph, response_current.wind_mph, response_current.wind_degree, response_current.wind_dir, response_current.pressure_mb, response_current.pressure_in, response_current.humidity);

        }
      }, 
      // the reason for the request rejection
      (reason: any) => {})
  }
}
