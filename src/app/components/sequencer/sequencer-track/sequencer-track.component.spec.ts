/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {SequencerTrackComponent} from './sequencer-track.component';
import {SequencerStepComponent} from '../sequencer-step/sequencer-step.component';
import {ClockService} from '../../../services/clock.service';
import {AudioApiService} from '../../../services/audio-api.service';

class MockAudioApiService {
    getContext() { return 'context'; }

    getCurrentTime() {
        return 0;
    }
}

class MockClockService {
    get() {
        return {
            subscribe: () => {}
        }
    }
}

describe('SequencerTrackComponent', () => {
    let component: SequencerTrackComponent;
    let fixture: ComponentFixture<SequencerTrackComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SequencerTrackComponent, SequencerStepComponent],
            providers: [
                {provide: ClockService, useClass: MockClockService },
                {provide: AudioApiService, useClass: MockAudioApiService}
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SequencerTrackComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getVelocityMultiplier should reflect velocity 0.6 - 1', () => {
        expect(component.getVelocityMultiplier(0)).toBe(0);
        expect(component.getVelocityMultiplier(1)).toBe(0.6);
        expect(component.getVelocityMultiplier(2)).toBe(0.8);
        expect(component.getVelocityMultiplier(3)).toBe(1);
    })

    describe('advance', () => {
        let soundMock: any;

        beforeEach(() => {
            soundMock = {
                play: () => null
            }

            spyOn(component.sequence, 'stepForward').and.callFake(() => null);
            spyOn(component.sequence, 'getActiveStep').and.callFake(() => { return { value: 1 } });
            spyOn(component.sound, 'setVolume').and.callFake(() => soundMock);
            spyOn(soundMock, 'play').and.callFake(() => null);
        })

        it('should move sequence forward and play sound when step has volume.', () => {
            spyOn(component, 'getVelocityMultiplier').and.callFake(() => 0.5);

            component.advance(12345);
            expect(component.sequence.stepForward).toHaveBeenCalledWith();
            expect(component.sequence.getActiveStep).toHaveBeenCalledWith();
            expect(component.getVelocityMultiplier).toHaveBeenCalledWith(1);
            expect(component.sound.setVolume).toHaveBeenCalledWith(0.5);
            expect(soundMock.play).toHaveBeenCalledWith(12345);
        })

        it('should move sequence forward and NOT play sound when step has NO volume.', () => {
            spyOn(component, 'getVelocityMultiplier').and.callFake(() => 0);

            component.advance(12345);
            expect(component.sequence.stepForward).toHaveBeenCalledWith();
            expect(component.sequence.getActiveStep).toHaveBeenCalledWith();
            expect(component.getVelocityMultiplier).toHaveBeenCalledWith(1);
            expect(component.sound.setVolume).not.toHaveBeenCalledWith();
            expect(soundMock.play).not.toHaveBeenCalledWith();
        })
    })
});
