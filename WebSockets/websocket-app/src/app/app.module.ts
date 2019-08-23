import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component';
import { TimerComponent } from './timer/timer.component';
import { NotificationService } from './services/notification.service';
import { HttpClickService } from './services/click-http.service';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [NotificationService, HttpClickService],
  bootstrap: [AppComponent]
})
export class AppModule { }
