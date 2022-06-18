import { Component, OnInit, Input } from '@angular/core';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';

@Component({
  selector: 'app-main-card-head',
  templateUrl: './main-card-head.component.html',
  styleUrls: ['./main-card-head.component.css']
})
export class MainCardHeadComponent implements OnInit {

  @Input() current_location!: WeatherLocation;
  @Input() current_weather!: WeatherCurrent;

  constructor() { }

  ngOnInit(): void {
  }

}
