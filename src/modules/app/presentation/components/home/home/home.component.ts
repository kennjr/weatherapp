import { Component, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private repo: AppRepo, private router: Router, private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.search_string = this.repo.get_recently_searched_city()
    if (this.search_string.trim() != ""){
      this.make_search_request(this.search_string)
    }
    // default values
    // let current_location = new WeatherLocation("Gaborone", "Botswana", 53, -12, "2022-06-19 21:34", "Africa")

    // let current_weather = new WeatherCurrent(18, 71, 0, "Cloudy", 22, 9.8, 210, "NW", 982, 26.3, 38);
    // this.current_location = current_location;
    // this.current_weather = current_weather;
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

  navigate_to_diff_page(path: string){
    // check if the path is empty, so that we don't redirect to the same page
    if (path.trim() != ""){
      this.router.navigate([`/${path}`], {relativeTo: this .route})
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

        console.log("response location" ,response_location)
        console.log("response weather" ,response_current)

        if(response_error != null){
          // the request wasn't successful
          // TODO figure out what to do (probably show the user old data or a msg)
        }else{
          // the request was successful
          // set the location and current_weather
          let current_location = new WeatherLocation(response_location.name, response_location.country, response_location.lat, response_location.lon, response_location.localtime, response_location.tz_id)

          // let current_location = new WeatherLocation("Gaborone", "Botswana", 53, -12, "2022-06-19 21:34", "Africa")

          let current_weather = new WeatherCurrent(response_current.temp_c, response_current.temp_f, response_current.is_day, response_current.condition['text'], response_current.wind_kph, response_current.wind_mph, response_current.wind_degree, response_current.wind_dir, response_current.pressure_mb, response_current.pressure_in, response_current.humidity);

          // let current_weather = new WeatherCurrent(18, 71, 0, "Cloudy", 22, 9.8, 210, "NW", 982, 26.3, 38);

          // // after getting the data we emit it to the necessary components
          // this.onSendCurrentLocation.emit(current_location);
          // this.onSendCurrentWeather.emit(current_weather);

          this.current_location = current_location;
          this.current_weather = current_weather;

          // once we've gotten the result we can add the content to the history
          this.repo.add_new_record_to_history(current_location, current_weather);
          this.repo.set_recently_search_city(this.search_string)
        }
      }, 
      // the reason for the request rejection
      (reason: any) => {})
  }
}
