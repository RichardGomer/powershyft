/**
 * Represent power consumption or production across a period of time
 * Times are assumed to be timestamps, in milliseconds
 * Values are assumed to be power in kilowatts
 * Consumption is assumed to be 
 */
class PowerSeries {
    private periods: { startTime: number; power: number }[];

    constructor() {
        this.periods = [];
    }

    /**
     * Add power consumption for a period of time (and return to 0 afterwards)
     */
    setPeriod(startTime: number, endTime: number, power: number): void {
        this.setPoint(startTime, power);
        this.setPoint(endTime, 0);
    }

    /**
     * Set power consumption from a point, with no specified end
     */
    setPoint(startTime: number, power: number ) {
        this.periods.push({ startTime, power });
        this.periods.sort(this.timeSort);
    }

    private timeSort(a, b) {
        return a.startTime - b.startTime;
    }

    /**
     * Generate a new PowerSeries shifted by startTime milliseconds
     * @returns 
     */
    shiftTo(startTime: number): PowerSeries {
        const mappedSeries = new PowerSeries();
        for (const entry of this.periods) {
            const { power } = entry;
            const mappedStartTime = entry.startTime + startTime;
            mappedSeries.setPoint(mappedStartTime, power);
        }
        return mappedSeries;
    }

    /**
     * Get power at timestamp
     */
    getPowerAt(time: number): number {
        const period = this.periods.find((p) => p.startTime <= time);
        return period ? period.power : 0;
    }
    
    /** 
     * Return a new PowerSeries containing the sum of the two given series
     */
    static sum(series1: PowerSeries, series2: PowerSeries): PowerSeries {
        const combinedSeries = new PowerSeries();
        const allTimes = new Set<number>();
        for (const period of series1.periods) {
            allTimes.add(period.startTime);
        }
        for (const period of series2.periods) {
            allTimes.add(period.startTime);
        }
        for (const time of allTimes) {
            const power = series1.getPowerAt(time) + series2.getPowerAt(time);
            combinedSeries.setPoint(time, power);
        }
        return combinedSeries;
    }

    /**
     * Return a new PowerSeries containing the sum of an array of PowerSeries
     */
    static sumAll(...series: PowerSeries[]): PowerSeries {
        return series.reduce((acc, series) => PowerSeries.sum(acc, series));
    }

    /**
     * Return a powerSeries that only includes values between start and end times given
     * All other periods are set to 0
     */
    public clip(startTime: Date, endTime: Date) : PowerSeries {

        var out = this.copy();

        // Set start and end points explicitly, so we know those points exist
        const st = startTime.getTime();
        out.setPoint(st, out.getPowerAt(st));

        const et = endTime.getTime();
        out.setPoint(et, 0);

        // Now delete all the points that aren't in the range
        for(const i in out.periods) {
            const period = out.periods[i];

            if(period.startTime < st || period.startTime > et) {

            }
        }

        out.setPoint(0, 0);

        return out;

    }

    public copy() : PowerSeries {
        var out = new PowerSeries();

        for (const period of this.periods) {
            out.setPoint(period.startTime, period.power);
        }

        return out;
    }

    /**
     * Get a list of periods in the series, with start and end times
     */
    public getPeriods() : Array<{startTime: number, endTime: number, power: number}> {
        const out : Array<{startTime: number, endTime: number, power: number}> = [];

        var lastperiod;
        lastperiod = false;
        for(const period of this.periods) {

            if(lastperiod != false) {
                lastperiod.endTime = period.startTime;
            }

            lastperiod = {
                startTime: period.startTime,
                endTime: 0,
                power: period.power
            };

            out.push( lastperiod );
        }

        return out;
    }
}

export default PowerSeries;