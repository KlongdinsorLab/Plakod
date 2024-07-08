import { Booster, BoosterName } from "../booster";

export class Booster4 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_4);
    }
    applyBooster(laserFrequency:number, bulletCount:number, shootingPhase:number):{laserFrequency:number, bulletCount:number, shootingPhase:number}{
        return {laserFrequency: laserFrequency*0.8, bulletCount: bulletCount*1.2, shootingPhase: shootingPhase*1.2};
    }
}