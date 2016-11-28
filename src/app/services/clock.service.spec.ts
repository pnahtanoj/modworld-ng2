/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';

import {ClockService} from './clock.service';
import {AudioApiService} from './audio-api.service';

class MockAudioApiService {
    constructor() {
    }

    getCurrentTime() {
        return 0;
    }
}

describe('ClockService', () => {
    let service: ClockService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ClockService,
                {provide: AudioApiService, useClass: MockAudioApiService}
            ]
        });
    });

    beforeEach(inject([ClockService], (s) => {
        service = s;
    }));

    it('should exist with defaults', () => {
        expect(service).toBeTruthy();
        expect(service.active).toBe(true);
        expect(service.tempo).toBe(120);
    });

    describe('play', () => {
        beforeEach(inject([AudioApiService], (mockAudio) => {
            spyOn(mockAudio, 'getCurrentTime').and.callFake(() => 1234);
        }))

        it('should set active, time and call activate main loop ', () => {
            spyOn(service, 'loop').and.callFake(() => null);

            service.play();
            expect(service.active).toBeTruthy();
            expect(service.futureTickTime).toBe(1234);
            expect(service.loop).toHaveBeenCalledWith();
        })
    })

    describe('stop', () => {
        it('should set active to false', () => {
            service.active = true;
            service.stop();
            expect(service.active).toBeFalsy();
        })
    });

    describe('updateFutureTick', () => {
        it('should add slicelength', () => {
            spyOn(service, 'sliceLength').and.callFake(() => 100);
            service.futureTickTime = 100;
            service.updateFutureTick();
            expect(service.futureTickTime).toBe(200);
        })
    })

    it('sliceLength should reflect tempo', () => {
        service.tempo = 100;
        expect(service.sliceLength()).toBe(0.15);
        service.tempo = 150;
        expect(service.sliceLength()).toBe(0.1);
    })

    it('setTimer should call loop after 50 ms', () => {
        jasmine.clock().uninstall();
        jasmine.clock().install();

        spyOn(service, 'loop').and.callFake(() => null);
        service.setLoopTimer();

        jasmine.clock().tick(49);
        expect(service.loop).not.toHaveBeenCalled();
        jasmine.clock().tick(1);
        expect(service.loop).toHaveBeenCalled();

        jasmine.clock().uninstall();
    })

    describe('loop', () => {
        let updateSpy, d4Spy;

        beforeEach(inject([AudioApiService], (mockAudio) => {
            spyOn(mockAudio, 'getCurrentTime').and.callFake(() => 150);
            spyOn(service, 'setLoopTimer').and.callFake(() => null);

            d4Spy = spyOn(service.d4, 'next').and.callFake(() => null);
            updateSpy = spyOn(service, 'updateFutureTick').and.callFake(() => null);
        }))

        it('should return and do nothing if inactive', () => {
            service.active = false;
            service.loop();
            expect(service.d4.next).not.toHaveBeenCalled();
            expect(service.updateFutureTick).not.toHaveBeenCalled();
            expect(service.setLoopTimer).not.toHaveBeenCalled();
        })

        it('should set loop timer if future tick time greater than current', () => {
            service.active = true;
            service.futureTickTime = 150.5; // > current + 0.1
            service.loop();

            expect(service.d4.next).not.toHaveBeenCalled();
            expect(service.updateFutureTick).not.toHaveBeenCalled();
            expect(service.setLoopTimer).toHaveBeenCalled();
        })

        it('should loop until future tick time greater that current', () => {
            updateSpy.and.callFake(() => service.futureTickTime = 100000000000000);
            service.active = true;
            service.futureTickTime = 150; // < current + 0.1
            service.loop();

            expect(service.d4.next).toHaveBeenCalled();
            expect(service.updateFutureTick).toHaveBeenCalled();
            expect(service.setLoopTimer).toHaveBeenCalled();
            expect(updateSpy.calls.count()).toEqual(1);
            expect(d4Spy.calls.count()).toEqual(1);
        })
    })
});
