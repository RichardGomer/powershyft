// Represents a flow of power, occurring in a given time slot, between two Appliances

import Appliance from "./Appliance";

class Flow {

    public from: Appliance;
    public to: Appliance;
    public power: number;

    constructor(from: Appliance, to: Appliance, power: number) {

        // Normalise the flow to be positive
        if(power < 0) {
            var x = from;
            from = to;
            to = x;
            power *= -1;
        }

        this.from = from;
        this.to = to;
        this.power = power;

    }

}

export default Flow;