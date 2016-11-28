/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {AudioApiService} from './audio-api.service';

describe('AudioApiService', () => {
    let service: AudioApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AudioApiService]
        });
    });
    beforeEach(inject([AudioApiService], s => {
        service = s;
    }));

    it('should exist with context', () => {
        expect(service).toBeTruthy();
        expect(service.context).toBeDefined();
    });

    it('get context should do so', () => {
        expect(service.context).toEqual(service.getContext());
    });

    it('get oscillator should do so', () => {
        expect(service.getOsc() instanceof OscillatorNode).toBeTruthy();
    });

    it('get oscillator should do so', () => {
        expect(service.getGain() instanceof GainNode).toBeTruthy();
    });

    it('getCurrentTime should do so', () => {
        expect(service.getCurrentTime()).toBe(service.context.currentTime);
    });

});
