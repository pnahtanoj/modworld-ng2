import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Step} from '../../../model/step';

@Component({
    selector: 'app-sequencer-step',
    templateUrl: './sequencer-step.component.html',
    styleUrls: ['./sequencer-step.component.css']
})
export class SequencerStepComponent implements OnInit {
    // state: number;
    stateClass: string;
    activeClass: string;

    @Input() step: Step;
    @Output() stepChange: EventEmitter<number> = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {
        if (!this.step)
            this.step = new Step();
        this.setClass();
    }

    increment() {
        this.step.value += 1;
        if (this.step.value > 3)
            this.step.value = 0;

        this.setClass();
    }

    setClass() {
        if (this.step.value === 0)
            this.stateClass = 'off';
        if (this.step.value === 1)
            this.stateClass = 'soft';
        if (this.step.value === 2)
            this.stateClass = 'medium';
        if (this.step.value === 3)
            this.stateClass = 'hard';

        return this;
    }

    getActiveClass() {
        return (this.step.active) ? 'active' : 'inactive';
    }

    // setActive(active) {
    //     this.activeClass = (active === true) ? 'active' : 'inactive';
    //     return this;
    // }
}
