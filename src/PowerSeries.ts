class PowerSeries {
    private periods: { startTime: number; power: number }[];

    constructor() {
        this.periods = [];
    }

    addPeriod(startTime: number, power: number): void {
        this.periods.push({ startTime, power });
    }

    shiftTo(startTime: number): PowerSeries {
        const mappedSeries = new PowerSeries();
        for (const entry of this.periods) {
            const { power } = entry;
            const mappedStartTime = entry.startTime + startTime;
            mappedSeries.addPeriod(mappedStartTime, power);
        }
        return mappedSeries;
    }

    getPowerAt(time: number): number {
        const period = this.periods.find((p) => p.startTime <= time && time < p.startTime + 10 * 60 * 1000);
        return period ? period.power : 0;
    }
    
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
            combinedSeries.addPeriod(time, power);
        }
        return combinedSeries;
    }

    static sumAll(...series: PowerSeries[]): PowerSeries {
        return series.reduce((acc, series) => PowerSeries.sum(acc, series));
    }
}

export default PowerSeries;