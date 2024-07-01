import { Booster, BoosterName } from "../booster";
import { LaserFactoryByName } from "component/weapon/LaserFactoryByName";

export class BoosterRare1 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_RARE1);
    }
    applyBooster():keyof typeof LaserFactoryByName{
        return 'triple'
    }

        
    
}