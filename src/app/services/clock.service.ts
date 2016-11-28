import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {AudioApiService} from './audio-api.service';

@Injectable()
export class ClockService {
    // Rates Available //
    d4: Subject<number>;
    unity: Subject<number>;

    active: boolean;
    futureTickTime: number;
    tempo: number;

    constructor(private Audio: AudioApiService) {
        this.unity = new Subject();
        this.d4 = new Subject();

        this.active = true;
        this.tempo = 120; // default //
    }

    get(rate) {
        switch (rate) {
            case 'd4':
                return this.d4;
            default:
                return this.unity;
        }
    }

    play() {
        this.active = true;
        this.futureTickTime = this.Audio.getCurrentTime();
        this.loop();
    }

    stop() {
        this.active = false;
        // this.playing = false;
    }

    loop() {
        if (!this.active)
            return;

        while (this.futureTickTime < this.Audio.getCurrentTime() + 0.1) {
            this.d4.next(this.futureTickTime);
            this.updateFutureTick();
        }

        this.setLoopTimer();
    }

    updateFutureTick() {
        this.futureTickTime += this.sliceLength();
        // this.currentStep++;
        // if (this.currentStep > 48) // Weird //
        //     this.currentStep = 1;
    }

    sliceLength() {
        return (60 / this.tempo) * 0.25; // 16ths, for now
    }

    setLoopTimer() {
        setTimeout(() => this.loop(), 50)
    }
}
