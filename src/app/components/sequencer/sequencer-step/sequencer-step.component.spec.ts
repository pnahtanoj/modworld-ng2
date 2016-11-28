/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';
import {Step} from '../../../model/step';

import {SequencerStepComponent} from './sequencer-step.component';

describe('SequencerStepComponent', () => {
    let component: SequencerStepComponent;
    let fixture: ComponentFixture<SequencerStepComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SequencerStepComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SequencerStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        component.step = new Step();
    });

    it('should create with defaults ', () => {
        expect(component).toBeTruthy();
        expect(component.stateClass).toBe('off');
    });

    describe(' increment ', () => {
        it('should increment state and class', () => {
            expect(component.step.value).toBe(0);
            expect(component.stateClass).toBe('off');

            component.increment();
            expect(component.step.value).toBe(1);
            expect(component.stateClass).toBe('soft');

            component.increment();
            expect(component.step.value).toBe(2);
            expect(component.stateClass).toBe('medium');

            component.increment();
            expect(component.step.value).toBe(3);
            expect(component.stateClass).toBe('hard');

            component.increment();
            expect(component.step.value).toBe(0);
            expect(component.stateClass).toBe('off');
        })
    })

    describe(' getActiveClass ', () => {
        it('should reflect step active state ', () => {
            component.step.active = true;
            expect(component.getActiveClass()).toBe('active');

            component.step.active = false;
            expect(component.getActiveClass()).toBe('inactive');
        })
    })
});
