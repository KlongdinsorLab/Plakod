import { Booster, BoosterName } from "../booster";
import { LaserFactoryByName } from "component/equipment/weapon/LaserFactoryByName";

export class BoosterRare1 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_RARE1);
    }
    applyBooster():{laserFactory: keyof typeof LaserFactoryByName, releasedBullet: number, bulletMultiply: number}{
        return {laserFactory:'triple', releasedBullet: 3, bulletMultiply: 3}
    }

        
    
}