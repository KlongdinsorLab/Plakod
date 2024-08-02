import { Booster, BoosterName, BoosterEffect } from "../booster";

export class Booster5 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_5);
    }
    applyBooster(destroyMeteorScore: number):number{
        return destroyMeteorScore*1.1;
    }
    getBoosterEffect():BoosterEffect{
        return {
            remainingUses: 0,
            remainingTime: 0,
            hitMeteorScore: 0,
            laserFrequency: 0,
            bulletCount: 0,
            shootingPhase: 0,
            destroyMeteorScore: 0.1, 
            laserFactory: 'single',
            releasedBullet: 0,
            bulletMultiply: 0,
            score: 0,
        }
    }
}