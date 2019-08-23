import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification.service';
import { HttpClickService } from '../services/click-http.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  isConnected: Boolean;
  notifications: string[];
  time: string;

  constructor(private notifService: NotificationService, private http: HttpClickService, private ngZone: NgZone) {
    this.isConnected = false;
    this.notifications = [];
   }

  ngOnInit() {
    this.checkConnection();
    this.subscribeForNotifications();
    this.subscribeForTime();
    this.notifService.registerForClickEvents();
  }

  private checkConnection(){
    this.notifService.startConnection().subscribe(e => {this.isConnected = e; 
        if (e) {
          this.notifService.StartTimer()
        }
    });
  }

  private subscribeForNotifications () {
    this.notifService.notificationReceived.subscribe(e => this.onNotification(e));
  }

  public onNotification(notif: string) {

     this.ngZone.run(() => { 
       this.notifications.push(notif);  
       console.log(this.notifications);
    });  
  }

  subscribeForTime() {
    this.notifService.registerForTimerEvents().subscribe(e => this.onTimeEvent(e));
  }

  public onTimeEvent(time: string){
    this.ngZone.run(() => { 
       this.time = time; 
    });  
    console.log(this.time);
  }

  public onClick() {
    if (this.isConnected) {
      this.http.click().subscribe(data => console.log(data));
    }
  } 

  public startTimer() {
    this.notifService.StartTimer();
  }

  public stopTimer() {
    this.notifService.StopTimer();
    this.time = "";
  }

}
