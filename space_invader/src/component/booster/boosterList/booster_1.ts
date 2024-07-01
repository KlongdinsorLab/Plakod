import { Booster, BoosterName } from "../booster";

export class Booster1 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_1);
    }
    applyBooster():void{}
}