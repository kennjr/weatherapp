import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  search_string!: string;
  fake_array: number[] = [1,2,3,4,5,6,7,8,9];

  constructor() { }

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
