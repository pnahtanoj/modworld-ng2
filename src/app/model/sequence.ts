import {Step} from './step';

export class Sequence {
    steps: Step[];
    active: number;

    constructor() {
        this.steps = [];
        this.active = 0;
    }

    getLength() {
        return this.steps.length;
    }

    setLength(len) {
        this.steps = [];

        for (var i = 0; i < len; i++) {
            this.steps.push(new Step());
        }
        return this;
    }

    setStep(step, value) { // ONE BASED //
        if (step < 1 || step > this.getLength())
            throw new Error(`Sequence tried to set step outside of current length: step: ${step} length: ${this.getLength()}`);
        if (!value)
            value = 0;

        this.steps[step - 1].setValue(value);

        return this;
    }

    stepForward() {
        this.active = (this.active === this.steps.length - 1) ? 0 : this.active + 1;
        for(let i = 0; i < this.steps.length; i++) {
            this.steps[i].setActive((this.active === i) ? true : false);
        }
    }

    getActiveStep() {
        return this.steps[this.active];
    }
}
