export enum BoosterName{
    NONE,
    BOOSTER_1,
    BOOSTER_2,
    BOOSTER_3,
    BOOSTER_4,
    BOOSTER_5,
    BOOSTER_RARE1,
    BOOSTER_RARE2,
}


// Abstract Booster class
export abstract class Booster {
    protected name: BoosterName;

    protected constructor(name: BoosterName) {
        this.name = name;
    }
}
