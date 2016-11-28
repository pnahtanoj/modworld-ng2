/* tslint:disable:no-unused-variable */

import {Step} from './step';

describe('Step Model', () => {
    let step;

    beforeEach(() => {
        step = new Step();
    });

    it('should exist with defaults ', () => {
        expect(step).toBeTruthy();
        expect(step.min).toBe(0);
        expect(step.max).toBe(0);
        expect(step.value).toBe(0);
    });

    it('should reject setting value outside of min/max', () => {
        step.setMin(1).setMax(100);
        step.setValue(50);

        step.setValue(150);
        step.setValue(190);
        expect(step.value).toBe(50);

        step.setValue(0);
        expect(step.value).toBe(50);
    })

    it('should allow any max value if max === 0 ', () => {
        step.setMin(0).setMax(0);

        expect(step.value).toBe(0);

        step.setValue(500);
        expect(step.value).toBe(500);
    })
});
