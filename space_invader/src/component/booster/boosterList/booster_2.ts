import { Booster, BoosterName } from "../booster";

export  class Booster2 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_2);
    }
    applyBooster():void{}
}