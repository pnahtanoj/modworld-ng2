export class Step {
    value: number;
    min: number;
    max: number;
    active: boolean;

    constructor() {
        this.setMin(0).setMax(0).setValue(0).setActive(false);
    }

    setMin(min: number) {
        this.min = min;
        return this;
    }

    setMax(max: number) {
        this.max = max;
        return this;
    }

    setValue(val: number) {
        if (val >= this.min && (val <= this.max || this.max === 0))
            this.value = val;
        return this;
    }

    setActive(active: boolean) {
        this.active = active;
    }
}
