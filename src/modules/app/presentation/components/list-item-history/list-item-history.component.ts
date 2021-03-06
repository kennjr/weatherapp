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
  @Input() key!: string;

  @Output() on_delete_item: EventEmitter<string> = new EventEmitter()
  @Output() on_click_item: EventEmitter<string> = new EventEmitter()

  constructor(private repo: AppRepo) { }

  ngOnInit(): void {
  }

  on_delete_clicked(){
    this.delete_item()
  }

  on_item_clicked(){
    this.click_item()
  }

  private delete_item(){
    console.log("Delete clicked ")
    this.on_delete_item.emit(this.key);
  }

  private click_item(){
    this.on_click_item.emit(this.key)
  }
}
