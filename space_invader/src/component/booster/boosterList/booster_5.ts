import { Booster, BoosterName } from "../booster";

export class Booster5 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_5);
    }
    applyBooster(destroyMeteorScore: number):number{
        return destroyMeteorScore*1.1;
    }
}