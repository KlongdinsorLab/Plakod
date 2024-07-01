import { Booster, BoosterName } from "../booster";

export class BoosterRare1 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_RARE1);
    }
    applyBooster():string{
        return 'triple'
    }

        
    
}