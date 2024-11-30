import { Booster, BoosterName, BoosterEffect } from '../booster'

export class Booster2 extends Booster {
	private remainingTime: number
	constructor() {
		super(BoosterName.BOOSTER_2)
		this.remainingTime = 15
	}
	getBoosterEffect(): BoosterEffect {
		return {
			remainingUses: 0,
			remainingTime: this.remainingTime,
			hitMeteorScore: 0,
			laserFrequency: 0,
			bulletCount: 0,
			shootingPhase: 0,
			destroyMeteorScore: 0,
			laserFactory: 'single',
			releasedBullet: 0,
			bulletMultiply: 0,
			score: 0,
		}
	}
}
