import { Component, OnInit } from '@angular/core';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search_string!:string;

  

  constructor(private repo: AppRepo) { }

  ngOnInit(): void {
  }

  key_has_been_pressed(key :string){
    // check if the pressed key is Enter
    if(key == "Enter"){
      if (this.search_string != null && this.search_string.trim() != ""){
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

            }
          }, 
          // the reason for the request rejection
          (reason: any) => {})
      }
      else{
        // TODO show some sort of snackbar that appears from the bottom or bottom-left
      }
    }
  }
}
