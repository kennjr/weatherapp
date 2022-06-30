import { Component, OnInit, Input } from '@angular/core';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';

@Component({
  selector: 'app-main-card-body',
  templateUrl: './main-card-body.component.html',
  styleUrls: ['./main-card-body.component.css']
})
export class MainCardBodyComponent implements OnInit {

  @Input() current_location!: WeatherLocation;
  @Input() current_weather!: WeatherCurrent;

  constructor() { }

  ngOnInit(): void {
  }

}
