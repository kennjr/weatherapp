import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainCardHeadComponent } from './presentation/components/main-card-head/main-card-head/main-card-head.component';
import { MainCardBodyComponent } from './presentation/components/main-card-body/main-card-body/main-card-body.component';
import { HomeComponent } from './presentation/components/home/home/home.component';
import { WeatherDataPipe } from './domain/pipes/weather-data/weather-data.pipe';
import { SettingsComponent } from './presentation/components/settings/settings.component';
import { HistoryComponent } from './presentation/components/history/history.component';
import { ListItemHistoryComponent } from './presentation/components/list-item-history/list-item-history.component';
import { HisotryItemFullComponent } from './presentation/components/hisotry-item-full/hisotry-item-full.component';

@NgModule({
  declarations: [
    AppComponent,
    MainCardHeadComponent,
    MainCardBodyComponent,
    HomeComponent,
    WeatherDataPipe,
    SettingsComponent,
    HistoryComponent,
    ListItemHistoryComponent,
    HisotryItemFullComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
