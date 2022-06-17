import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search_string!:string;

  constructor() { }

  ngOnInit(): void {
  }

  key_has_been_pressed(key :string){
    // check if the pressed key is Enter
    if(key == "Enter"){
      console.log("The search str ", this.search_string.trim())
    }
  }
}
