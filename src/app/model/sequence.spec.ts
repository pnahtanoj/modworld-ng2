/* tslint:disable:no-unused-variable */

import {Sequence} from './sequence';

describe('Step Model', () => {
    let seq;

    beforeEach(() => {
        seq = new Sequence();
    });

    it('should exist with defaults ', () => {
        expect(seq).toBeTruthy();
        expect(seq.steps).toEqual([]);
    });

    describe('setLength', () => {
        it('should set steps to array of steps of length ', () => {
            expect(seq.getLength()).toBe(0);
            seq.setLength(10);
            expect(seq.getLength()).toBe(10);
            seq.setLength(20);
            expect(seq.getLength()).toBe(20);
        })
    })

    describe('setStep', () => {
        beforeEach(() => {
            seq.setLength(10);
        })
        it('should set step value to value', () => {
            seq.setStep(1, 23);
            seq.setStep(5, 99);

            expect(seq.steps[0].value).toBe(23);
            expect(seq.steps[4].value).toBe(99);
        })

        it('should throw error when out of bounds', () => {
            expect(() => seq.setStep(12, 23)).toThrowError();
        })

        it('should set to zero if value not provided', () => {
            seq.steps[0].value = 10;

            seq.setStep(1);
            expect(seq.steps[0].value).toBe(0);
        })
    })

    describe('stepForward', () => {
        beforeEach(() => {
            seq.setLength(3);
            seq.setStep(1, 23);
            seq.setStep(2, 99);
            seq.setStep(3, 8);
        })
        it('stepForward should increment active step ', () => {
            seq.active = 1;
            seq.stepForward();
            expect(seq.active).toBe(2);
            expect(seq.steps[0].active).toBeFalsy();
            expect(seq.steps[1].active).toBeFalsy();
            expect(seq.steps[2].active).toBeTruthy();
        })
        it('stepForward should increment loop to beginning at end ', () => {
            seq.active = 2;
            seq.stepForward();
            expect(seq.active).toBe(0);
            expect(seq.steps[0].active).toBeTruthy();
            expect(seq.steps[1].active).toBeFalsy();
            expect(seq.steps[2].active).toBeFalsy();
        })
    })

    it('getActiveStep should return step at active index', () => {
        seq.setLength(10);
        seq.setStep(1, 10);
        seq.active = 0;

        expect(seq.getActiveStep()).toBe(seq.steps[0]);
    })
});
