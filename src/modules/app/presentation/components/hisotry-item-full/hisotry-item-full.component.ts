import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';

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

  constructor(private router: Router, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.get_history_item_key();
  }

  private get_history_item_key(){
    this.key = this.route.snapshot.paramMap.get('id');
  }

  private get_history_item_data(){
    if (this.key != null && this.key.trim() != ""){

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
