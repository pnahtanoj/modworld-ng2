import {Injectable} from '@angular/core';

@Injectable()
export class AudioApiService {
    context: any;

    constructor() {
        if (typeof AudioContext !== 'undefined')
            this.context = new AudioContext();
        // if (typeof webkitAudioContext !== 'undefined')
        //   return new webkitAudioContext();
        // if (typeof mozAudioContext !== 'undefined')
        //   return new mozAudioContext();
        else
            throw new Error('No Audio Context: This will not go well');
    }

    getContext() {
        return this.context;
    }

    getOsc() {
        return this.context.createOscillator();
    }

    getGain() {
        return this.context.createGain();
    }

    getCurrentTime() {
        return this.context.currentTime;
    }
}
