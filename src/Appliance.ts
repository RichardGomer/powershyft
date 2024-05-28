class Appliance {
    private name: string;
    private powerConsumption: number;

    constructor(name: string, powerConsumption: number) {
        this.name = name;
        this.powerConsumption = powerConsumption;
    }

    calculatePower(startTime: Date, endTime: Date): number {
        // Calculate the power consumption for the given time period
        // You can implement your own logic here based on the appliance's behavior
        // For example, you can calculate the power consumption based on the appliance's power rating and the duration of the time period
        const duration = endTime.getTime() - startTime.getTime();
        const power = this.powerConsumption * (duration / (60 * 1000)); // Assuming power consumption is in watts and duration is in milliseconds
        return power;
    }
}

export default Appliance;