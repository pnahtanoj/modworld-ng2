import { Component } from '@angular/core';
import { ClockService } from './services/clock.service';
import { AudioApiService } from './services/audio-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ ClockService, AudioApiService ]
})
export class AppComponent {
  title = 'app works!';
}
