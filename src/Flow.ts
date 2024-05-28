// Represents a flow of energy, occurring in a given time slot, between two Appliances

import Appliance from "./Appliance";

class Flow {

    public from: Appliance;
    public to: Appliance;
    public energy: number; // Energy flow in KWh

    constructor(from: Appliance, to: Appliance, energy: number) {

        // Normalise the flow to be positive
        if(energy < 0) {
            var x = from;
            from = to;
            to = x;
            energy *= -1;
        }

        this.from = from;
        this.to = to;
        this.energy = energy;

    }

}

export default Flow;