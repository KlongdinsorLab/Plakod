import { LaserFactoryByName } from "component/equipment/weapon/LaserFactoryByName";
export enum BoosterName{
    BOOSTER_1,
    BOOSTER_2,
    BOOSTER_3,
    BOOSTER_4,
    BOOSTER_5,
    BOOSTER_RARE1,
    BOOSTER_RARE2,
}
export interface BoosterEffect {
    remainingUses: number;
    remainingTime: number;
    hitMeteorScore: number;
    laserFrequency: number;
    bulletCount: number;
    shootingPhase: number;
    destroyMeteorScore: number;
    laserFactory: keyof typeof LaserFactoryByName; 
    releasedBullet: number; 
    bulletMultiply: number;
    score:number;
}

// Abstract Booster class
export abstract class Booster {
    protected name: BoosterName;

    protected constructor(name: BoosterName) {
        this.name = name;
    }
    getBoosterEffect():BoosterEffect{
        return{
            remainingUses: 0,
            remainingTime: 0,
            hitMeteorScore: 1,
            laserFrequency: 1,
            bulletCount: 1,
            shootingPhase: 1,
            destroyMeteorScore: 1,
            laserFactory: 'single',
            releasedBullet: 1,
            bulletMultiply: 1,
            score: 1,
        }
    }
}
