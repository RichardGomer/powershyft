import Appliance from "./Appliance";
import Flow from "./Flow";

/**
 * Represent a slice of time during which power flows occur
 */
class Slot {
    private startTime: Date;
    private flows: Flow[];

    constructor(startTime: Date) {

        // Check if startTime is not on a multiple of ten minutes
        if (startTime.getMinutes() % 10 !== 0 || startTime.getSeconds() !== 0 || startTime.getMilliseconds() !== 0) {
            throw new Error('startTime must begin on a multiple of ten minutes.');
        }

        this.startTime = startTime;
    }

    private nextSlot: Slot | null;

    public getNextSlot() : Slot {

        if(this.nextSlot == null) {
            this.nextSlot = new Slot(new Date(this.startTime.getTime() + 10 * 60000));
        }
        
        return this.nextSlot;
    }

    /**
     * Add a single flow to the 
     * @param flow 
     */
    public addFlow(flow: Flow) {
        this.flows.push(flow);
    }

    /**
     * Get all flows involving the given appliance
     * @param appliance
     */
    public getFlowsByAppliance(appliance: Appliance) : Flow[] {
        return this.flows.filter((f, i) => {
            return f.from === appliance || f.to === appliance;
        });
    }

    /**
     * Get the overall balance for an appliance within this slot
     * Positive balances indicate net supply, negative balances indicate net consumption
     */
    public getBalance(appliance: Appliance) : number {
        return this.getFlowsByAppliance(appliance).reduce((balance: number, flow: Flow) => {
            return balance + (flow.from === appliance ? flow.power : flow.power * -1);
        }, 0);
    }




}

export default Slot;