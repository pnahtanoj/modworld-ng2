/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import 'hammerjs';

import {AudioClockComponent} from './audio-clock.component';
import {ClockService} from '../../services/clock.service';

class MockClockService {
    active: boolean;

    stop() {}
    play() {}
}

describe('AudioClockComponent', () => {
    let component: AudioClockComponent;
    let fixture: ComponentFixture<AudioClockComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ AudioClockComponent ],
            imports: [ FormsModule, MaterialModule ],
            providers: [
                { provide: ClockService, useClass: MockClockService }
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AudioClockComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('toggle', () => {
        let clock;

        beforeEach(inject([ClockService], (mockClock) => {
            clock = mockClock;
            spyOn(clock, 'play').and.callFake(() => null);
            spyOn(clock, 'stop').and.callFake(() => null);
        }))

        it('should call play when stopped ', () => {
            clock.active = false;
            component.toggle();
            expect(clock.stop).not.toHaveBeenCalled();
            expect(clock.play).toHaveBeenCalled();
        });

        it('should call stop when playing ', () => {
            clock.active = true;
            component.toggle();
            expect(clock.stop).toHaveBeenCalled();
            expect(clock.play).not.toHaveBeenCalled();
        });
    })
});
