import PowerSeries from './PowerSeries';
import Appliance from './Appliance';
import Slot from './Slot';
import Flow from './Flow';
import LocalGrid from './LocalGrid';

/**
 * Represents a power system - i.e. a set of connected Appliances
 */
class System {
    private appliances: Appliance[];
    private storage: Storage[];

    public localGrid = new LocalGrid();

    public stepTime : number = 600; // Step time, in seconds

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
     * Simulate a single step from the given time
     * Flows are added to the given slot
     */
    stepAppliances(slot: Slot): void {

        // Calculate the end time by adding 10 minutes to the start time
        const endTime = slot.getEndTime();

        // Create an array to store the power values for each equipment
        const powerValues: number[] = [];

        // Iterate over each equipment
        for (const equipment of this.appliances) {
            // Calculate the power consumption or production for the given time period
            var ps = equipment.calculateEnergy();
            var clipped = ps.clip(slot.getStartTime(), slot.getEndTime());

            // Convert the clipped power series to energy, for the slot
            // TODO
            var periods = clipped.getPeriods();
            var energy = 0;
            for(var p of periods) {
                energy += p.power * ((p.endTime - p.startTime) / 3600000);
            }

            // Add the power flow to the system
            slot.addFlow(new Flow(this.localGrid, equipment, energy));
        }
    }

    /**
     * Apply storage to the given slot; i.e. generate power flows to/from storage appliances
     * @param slot
     */
    stepStorage(slot: Slot) {
        
        // We find the total surplus / deficit on the local grid

        // Then apply it to the storage devices...
        // How model 

    }

    /**
     * Simulate a number of steps from the given start time
     * @param startTime 
     * @param steps 
     * @returns 
     */
    simulate(startTime: Date, steps: number): Slot[] {
        let currentTime = new Date(startTime);

        var slot : Slot = new Slot(currentTime);
        var slots : Array<Slot> = [];

        for (let i = 0; i < steps; i++) {
            

            slots.push(slot);
            slot = slot.getNextSlot();
        }
        
        return slots;
    }

}



