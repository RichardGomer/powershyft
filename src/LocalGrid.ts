import Appliance from "./Appliance";
import PowerSeries from "./PowerSeries";

/**
 * LocalGrid represents the local grid; it is an energy source/sink
 * Primarily used while flows are being resolved to represent the null source/sink
 */
class LocalGrid extends Appliance {

    constructor() {
        super('local-grid');
    }

    // The local grid canot consume or produce energy!
    public calculateEnergy() : PowerSeries {
        var out = new PowerSeries();
        out.setPoint(0,0);
        return out;
    }

}

export default LocalGrid;