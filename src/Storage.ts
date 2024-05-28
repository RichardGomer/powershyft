import Appliance from "./Appliance";

class Storage extends Appliance {
    
    private capacity : number = 0;
    private efficiency : number = 0;

    constructor(name, capacity, efficiency=0.9) {

        super(name);

        this.capacity = capacity;
        this.efficiency = efficiency;

    }



}