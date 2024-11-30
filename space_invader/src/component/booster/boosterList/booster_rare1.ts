import { Booster, BoosterName, BoosterEffect } from '../booster'

export class BoosterRare1 extends Booster {
	constructor() {
		super(BoosterName.BOOSTER_RARE1)
	}
	getBoosterEffect(): BoosterEffect {
		return {
			remainingUses: 0,
			remainingTime: 0,
			hitMeteorScore: 0,
			laserFrequency: 0,
			bulletCount: 0,
			shootingPhase: 0,
			destroyMeteorScore: 0,
			laserFactory: 'triple',
			releasedBullet: 2,
			bulletMultiply: 2,
			score: 0,
		}
	}
}
