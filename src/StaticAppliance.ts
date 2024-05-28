import Appliance from "./Appliance";
import PowerSeries from "./PowerSeries";

/**
 * An appliance with a fixed power consumption
 */
class StaticAppliance extends Appliance {

    private power;

    constructor(name, power) {
        super(name);
    }
    
    public calculateEnergy(): PowerSeries {
        
        var ps = new PowerSeries();

        ps.setPoint( 0, this.power );
        
        return ps;

    }

}