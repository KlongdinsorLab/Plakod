import { Booster, BoosterName, BoosterEffect } from '../booster'

export class Booster4 extends Booster {
	constructor() {
		super(BoosterName.BOOSTER_4)
	}
	applyBooster(
		laserFrequency: number,
		bulletCount: number,
		shootingPhase: number,
	): { laserFrequency: number; bulletCount: number; shootingPhase: number } {
		return {
			laserFrequency: laserFrequency * 0.8,
			bulletCount: bulletCount * 1.2,
			shootingPhase: shootingPhase * 1.2,
		}
	}
	getBoosterEffect(): BoosterEffect {
		return {
			remainingUses: 0,
			remainingTime: 0,
			hitMeteorScore: 0,
			laserFrequency: 0.2,
			bulletCount: 0.2,
			shootingPhase: 0.2,
			destroyMeteorScore: 0,
			laserFactory: 'single',
			releasedBullet: 0,
			bulletMultiply: 0,
			score: 0,
		}
	}
}
