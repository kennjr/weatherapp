import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUtils } from 'src/modules/app/common/AppUtils';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, OnDestroy {

  search_string!: string;
  
  weather_history_subscription!: Subscription;
  location_history_subscription!: Subscription;

  history_records_subscription!: Subscription;
  history_records_array!: any[]
  filtered_history_records_array!: any[]

  search_str_pattern_checker = RegExp(AppUtils.ALPHABET_PATTERN)

  constructor(private repo: AppRepo, private location: Location) { }

  ngOnInit(): void {
    // make a request for the items, so that we can populate the list
    this.set_history_records_observable_array()
    let keys = this.repo.get_all_history_record_keys()
    this.repo.get_all_history_records(keys?keys:[])
    // init the filter fun.
  }

  ngOnDestroy(): void {
    // best practice
    if (this.weather_history_subscription){
      this.weather_history_subscription.unsubscribe();
    }
    if (this.history_records_subscription){
      this.history_records_subscription.unsubscribe()
    }
    if (this.location_history_subscription){
      this.location_history_subscription.unsubscribe();
    }
    
  }

  private set_history_records_observable_array(){
    this.history_records_subscription = this.repo.get_observable_records_list().subscribe({
      next: ((value: any) => {
        this.history_records_array = value;
        this.filtered_history_records_array = this.history_records_array;
      }),
      error: ((error: any) => {
        // TODO show the user the error msg
      })
    })
  }

  key_has_been_pressed(key :string){
    // check if the pressed key is Enter
    if(key == "Enter"){
      if (this.search_string != null && this.search_string.trim() != ""){    
          let _array = this.history_records_array.filter((value: any, index: number, filtered_array: any[]) => {
            
            return value[1].location.name.toLowerCase().includes(this.search_string.toLowerCase())
          })

          this.filtered_history_records_array = _array;
      }
    }
    else{
      // TODO show some sort of snackbar that appears from the bottom or bottom-left
      this.filtered_history_records_array = this.history_records_array;
    }
  }

  delete_history_item(key: string){
    console.log("The delete was clicked ", key)
    // this.delete_single_item_weather(weather);
    this.repo.remove_record_from_localStorage(key)
  }

  on_back_pressed(){
    this.navigate_to_prev_page()
  }

  private navigate_to_prev_page(){
    this.location.back()
  }


}
