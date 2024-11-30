// import { METEOR_FREQUENCY_MS } from 'config'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'
import { ItemFactory } from './ItemFactory'
import InhaleGauge from 'component/ui/InhaleGauge'
import { Booster } from './Booster'
import { BOOSTER_FREQUENCT_MS } from 'config'

export class BoosterFactory extends ItemFactory {
	private boosters: Booster[] = []
	private boosterTimer = 0
	private isCreated!: boolean

	create(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		gauge: InhaleGauge,
		tutorial?: boolean,
	): Booster {
		return new Booster(scene, player, score, gauge, tutorial)
	}

	createByTime(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		gauge: InhaleGauge,
		delta: number,
	): void {
		this.boosterTimer += delta
		if (!this.isCreated && this.boosterTimer > BOOSTER_FREQUENCT_MS) {
			this.create(scene, player, score, gauge)
			this.isCreated = true
		}
	}

	getBoosters(): Booster[] {
		return this.boosters
	}
}
