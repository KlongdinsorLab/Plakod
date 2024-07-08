import { Booster, BoosterName } from "../booster";

export class BoosterRare2 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_RARE2);
    }
    applyBooster(score:number):number{
        return score*1.5
    }

        
    
}