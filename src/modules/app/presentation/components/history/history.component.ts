import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { WeatherCurrentDto } from 'src/modules/app/data/dto/WeatherCurrentDto';
import { WeatherLocationDto } from 'src/modules/app/data/dto/WeatherLocationDto';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  search_string!: string;
  
  search_weather_history!: WeatherCurrent[]
  search_location_history!: WeatherLocation[]

  weather_history_subscription!: Subscription;
  location_history_subscription!: Subscription;

  constructor(private repo: AppRepo, private location: Location) { }

  ngOnInit(): void {
    // make a request for the items, so that we can populate the list
    this.get_all_weather_history()
    this.get_all_locations_history()
  }

  ngOnDestroy(): void {
    // best practice
    this.weather_history_subscription.unsubscribe();
    this.location_history_subscription.unsubscribe();
  }

  private get_all_weather_history(){
    // init the sub. var we created
    this.weather_history_subscription = this.repo.get_all_weather_history().subscribe({
      next: ((value: WeatherCurrent[]) => {
        this.search_weather_history = value;
      }), error: ((error: any) => {
        // TODO figure out how to show an error msg to the user
        console.log("We got an error ", error.toString());
      })})
  }

  private get_all_locations_history(){
    // init the sub. var we created
    this.location_history_subscription = this.repo.get_all_location_history().subscribe({
      next: ((value: WeatherLocation[]) => {
        this.search_location_history = value;
        console.log("The response ", value)
      }), error: ((error: any) => {
        // TODO figure out how to show an error msg to the user
        console.log("We got an error ", error);
      })})
  }

  key_has_been_pressed(key :string){
    console.log("The key ", key)
    // check if the pressed key is Enter
    if(key == "Enter"){
      if (this.search_string != null && this.search_string.trim() != ""){
        
      }
      else{
        // TODO show some sort of snackbar that appears from the bottom or bottom-left
      }
    }
  }

  on_back_pressed(){
    this.navigate_to_prev_page()
  }

  private navigate_to_prev_page(){
    this.location.back()
  }

}
