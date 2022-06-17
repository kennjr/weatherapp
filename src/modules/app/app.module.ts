import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainCardHeadComponent } from './presentation/components/main-card-head/main-card-head/main-card-head.component';
import { MainCardBodyComponent } from './presentation/components/main-card-body/main-card-body/main-card-body.component';
import { HomeComponent } from './presentation/components/home/home/home.component';
import { WeatherDataPipe } from './domain/pipes/weather-data/weather-data.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MainCardHeadComponent,
    MainCardBodyComponent,
    HomeComponent,
    WeatherDataPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
