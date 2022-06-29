import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-hisotry-item-full',
  templateUrl: './hisotry-item-full.component.html',
  styleUrls: ['./hisotry-item-full.component.css']
})
export class HisotryItemFullComponent implements OnInit {

    // the location and current
  current_weather!: WeatherCurrent;
  current_location!: WeatherLocation;
  key!: string | null;

  constructor(private repo: AppRepo, private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.get_history_item_key();
    this.get_history_item_data()
  }

  private get_history_item_key(){
    this.key = this.route.snapshot.paramMap.get('key');
  }

  private get_history_item_data(){
    if (this.key != null && this.key.trim() != ""){
      let item_data = this.repo.get_single_history_record(this.key)
      if(item_data != null){
        let json_data = JSON.parse(JSON.stringify(item_data))
        this.current_location = json_data[1].location
        this.current_weather = json_data[2].weather
        console.log(json_data)
      }
      else{
        this.navigate_to_prev_page()
      }
    }else{
      this.navigate_to_prev_page()
    }
  }

  navigate_to_prev_page(){
    this.location.back()
  }

  navigate_to_diff_page(path: string){
    // check if the path is empty, so that we don't redirect to the same page
    if (path.trim() != ""){
      this.router.navigate([`/${path}`], {relativeTo: this .route})
    }
  }
}
