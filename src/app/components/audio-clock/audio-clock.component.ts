import {Component, OnInit} from '@angular/core';
import {ClockService} from '../../services/clock.service';

@Component({
    selector: 'app-audio-clock',
    templateUrl: './audio-clock.component.html',
    styleUrls: ['./audio-clock.component.css']
})
export class AudioClockComponent implements OnInit {

    constructor(private Clock: ClockService) {}

    ngOnInit() {}

    toggle() {
        if (this.Clock.active)
            this.Clock.stop();
        else
            this.Clock.play();
    }
}
