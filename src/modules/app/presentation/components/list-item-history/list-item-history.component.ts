import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WeatherCurrent, WeatherLocation } from 'src/modules/app/data/model/weather';
import { AppRepo } from 'src/modules/app/data/repository/AppRepo';

@Component({
  selector: 'app-list-item-history',
  templateUrl: './list-item-history.component.html',
  styleUrls: ['./list-item-history.component.css']
})
export class ListItemHistoryComponent implements OnInit {

  @Input() location!: any;
  @Input() weather!: any;

  @Output() on_delete_weather_item: EventEmitter<WeatherCurrent> = new EventEmitter()
  @Output() on_delete_location_item: EventEmitter<WeatherLocation> = new EventEmitter()

  constructor(private repo: AppRepo) { }

  ngOnInit(): void {
    
  }

  on_delete_clicked(){
    this.delete_item()
  }

  private delete_item(){
    console.log("Delete clicked ")
    this.on_delete_location_item.emit(this.location);
    this.on_delete_weather_item.emit(this.weather);
  }
}
