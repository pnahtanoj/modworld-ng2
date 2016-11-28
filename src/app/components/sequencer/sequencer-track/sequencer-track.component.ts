import {Component, OnInit, Input} from '@angular/core';
import {Sequence} from '../../../model/sequence'
import {ClockService} from '../../../services/clock.service';
import {SoundFile} from '../../../model/sound-file';
import {AudioApiService} from "../../../services/audio-api.service";

@Component({
    selector: 'app-sequencer-track',
    templateUrl: './sequencer-track.component.html',
    styleUrls: ['./sequencer-track.component.css']
})

export class SequencerTrackComponent implements OnInit {
    sequence: Sequence;
    sound: SoundFile;

    @Input() file: string;

    constructor(private Clock: ClockService, private Audio: AudioApiService) {
        this.sequence = new Sequence();
        this.sound = new SoundFile().setContext(this.Audio.getContext());

        // temps //
        this.sequence.setLength(16).setStep(1, 1).setStep(10, 3);
    }

    ngOnInit() {
        // Subscribe to a clock value //
        this.Clock.get('d4').subscribe(time => this.advance(time));

        // Load file, if provided //
        if (this.file)
            this.sound.loadFile(this.file);
    }

    advance(time) {
        this.sequence.stepForward();
        let step = this.sequence.getActiveStep();
        let volume = this.getVelocityMultiplier(step.value);

        if (volume > 0)
            this.sound.setVolume(volume).play(time);
    }

    getVelocityMultiplier(velocity) {
        if (velocity === 0)
            return 0;

        return 0.6 + ((velocity - 1) * 0.2);
    }
}
