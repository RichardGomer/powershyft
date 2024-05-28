import PowerSeries from './PowerSeries';
import Appliance from './Appliance';
import Slot from './Slot';

/**
 * Represents a power system - i.e. a set of connected Appliances
 */
class System {
    private appliances: Appliance[];
    private storage: Storage[];

    constructor() {
        this.appliances = [];
        this.storage = [];
    }

    addEquipment(appliance: Appliance): void {
        this.appliances.push(appliance);
    }

    removeEquipment(appliance: Appliance): void {
        const index = this.appliances.indexOf(appliance);
        if (index !== -1) {
            this.appliances.splice(index, 1);
        }
    }

    addStorage(storage: Storage): void {
        this.storage.push(storage);
    }

    /**
     * Simulate a single ten minute step from the given time
     * @param startTime 
     * @returns 
     */
    stepAppliances(startTime: Date): number {



        // Calculate the end time by adding 10 minutes to the start time
        const endTime = new Date(startTime.getTime() + 10 * 60 * 1000);

        // Create an array to store the power values for each equipment
        const powerValues: number[] = [];

        var slot = new Slot(startTime);

        // Iterate over each equipment
        for (const equipment of this.appliances) {
            // Calculate the power consumption or production for the given time period
            const power = equipment.calculatePower(startTime, endTime);

            // Add the power flow to the system
            
        }

        // Calculate the net power consumption by summing up the power values
        const netPowerConsumption = powerValues.reduce((sum, power) => sum + power, 0);

        return netPowerConsumption;
    }

    stepStorage(startTime: Date) {
        
    }

    /**
     * Simulate a number of steps from the given start time
     * @param startTime 
     * @param steps 
     * @returns 
     */
    simulate(startTime: Date, steps: number): PowerSeries {
        let currentTime = new Date(startTime);
        const powerSeries: PowerSeries = new PowerSeries();
        for (let i = 0; i < steps; i++) {
            const netPowerConsumption = this.stepAppliances(currentTime);
            powerSeries.addPeriod(
                currentTime.getTime(),
                netPowerConsumption
            );
            currentTime = new Date(currentTime.getTime() + 10 * 60 * 1000);
        }
        return powerSeries;
    }

}



