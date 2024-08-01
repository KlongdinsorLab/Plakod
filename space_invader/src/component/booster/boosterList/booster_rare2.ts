import { Booster, BoosterName, BoosterEffect } from "../booster";

export class BoosterRare2 extends Booster {
    constructor() {
        super(BoosterName.BOOSTER_RARE2);
    }

    getBoosterEffect():BoosterEffect{
        return {
            remainingUses: 0,
            remainingTime: 0,
            hitMeteorScore: 0,
            laserFrequency: 0,
            bulletCount: 0,
            shootingPhase: 0,
            destroyMeteorScore: 0, 
            laserFactory: 'single',
            releasedBullet: 0,
            bulletMultiply: 0,
            score: 0.5,
        }
    }

        
    
}