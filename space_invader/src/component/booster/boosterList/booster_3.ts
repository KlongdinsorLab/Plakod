import { Booster, BoosterName } from "../booster";

export  class Booster3 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_3);
    }
    applyBooster(hitMeteorScore:number):number{
        return hitMeteorScore*0.5
    }
}