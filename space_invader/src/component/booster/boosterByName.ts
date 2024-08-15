import { Booster1 } from "./boosterList/booster_1";
import { Booster2 } from "./boosterList/booster_2";
import { Booster3 } from "./boosterList/booster_3";
import { Booster4 } from "./boosterList/booster_4";
import { Booster5 } from "./boosterList/booster_5";
import { BoosterRare1 } from "./boosterList/booster_rare1";
import { BoosterRare2 } from "./boosterList/booster_rare2";
import { BoosterName } from "./booster";

export const boosterByName = {
    [BoosterName.BOOSTER_1]: Booster1,
    [BoosterName.BOOSTER_2]: Booster2,
    [BoosterName.BOOSTER_3]: Booster3,
    [BoosterName.BOOSTER_4]: Booster4,
    [BoosterName.BOOSTER_5]: Booster5,
    [BoosterName.BOOSTER_RARE1]: BoosterRare1,
    [BoosterName.BOOSTER_RARE2]: BoosterRare2,
};
