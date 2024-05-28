import PowerSeries from "./PowerSeries";

class Appliance {
    private name: string;
    private powerConsumption: number;

    constructor(name: string) {
        this.name = name;
    }

    calculateEnergy(): PowerSeries {
        return new PowerSeries();
    }
}

export default Appliance;