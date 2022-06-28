import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent } from './presentation/components/history/history.component';
import { HomeComponent } from './presentation/components/home/home/home.component';
import { SettingsComponent } from './presentation/components/settings/settings.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'settings', component:SettingsComponent },
  { path: 'history', component: HistoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
