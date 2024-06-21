import { METEOR_FREQUENCY_MS } from 'config'
import { B1BossObstacle } from './B1BossObstacle'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

export class B1BossObstacleFactory {
	private obstacles: B1BossObstacle[] = []
	private meteorTimer = 0

	create(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		tutorial?: boolean,
		itemPhase?: boolean
	): B1BossObstacle {
		return new B1BossObstacle(scene, player, score, tutorial, itemPhase)
	}

	createByTime(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		delta: number,
		itemPhase?: boolean
	): void {
        this.meteorTimer += delta
		while (this.meteorTimer > METEOR_FREQUENCY_MS) {
			this.meteorTimer -= METEOR_FREQUENCY_MS
			const meteor = this.create(scene, player, score, false, itemPhase)
			this.obstacles.forEach((obstacle) => {
				if (!obstacle.isActive()) {
					this.obstacles.splice(this.obstacles.indexOf(meteor), 1)
					return
				}
			})
			this.obstacles.push(meteor)
		}
	}

	getMeteors(): B1BossObstacle[] {
		return this.obstacles
	}
}
