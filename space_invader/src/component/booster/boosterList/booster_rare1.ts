import { Booster, BoosterName } from "../booster";
import { LaserFactoryByName } from "component/equipment/weapon/LaserFactoryByName";

export class BoosterRare1 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_RARE1);
    }
    applyBooster():{laserFactory: keyof typeof LaserFactoryByName, releaseBullet: number}{
        return {laserFactory:'triple', releaseBullet: 3}
    }

        
    
}