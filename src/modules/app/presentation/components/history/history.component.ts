import { Component, OnInit } from '@angular/core';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  search_string!: string;
  
  search_weather_history!: WeatherCurrent[]
  search_location_history!: WeatherLocation[]

  constructor(private repo: AppRepo) { }

  ngOnInit(): void {
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

}
