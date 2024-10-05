import { METEOR_FREQUENCY_MS } from 'config'
import { BossObstacle } from './BossObstacle'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

export class BossObstacleFactory {
	private obstacles: BossObstacle[] = []
	private obstacleTimer = 0

	create(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		soundEffect:
			| Phaser.Sound.NoAudioSound
			| Phaser.Sound.WebAudioSound
			| Phaser.Sound.HTML5AudioSound,
		tutorial?: boolean,
		itemPhase?: boolean,
	): BossObstacle {
		return new BossObstacle(
			scene,
			player,
			score,
			soundEffect,
			tutorial,
			itemPhase,
		)
	}

	createByTime(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		delta: number,
		soundEffect:
			| Phaser.Sound.NoAudioSound
			| Phaser.Sound.WebAudioSound
			| Phaser.Sound.HTML5AudioSound,
		itemPhase?: boolean,
	): void {
		this.obstacleTimer += delta
		while (this.obstacleTimer > METEOR_FREQUENCY_MS) {
			this.obstacleTimer -= METEOR_FREQUENCY_MS
			const obstacle = this.create(
				scene,
				player,
				score,
				soundEffect,
				false,
				itemPhase,
			)
			this.obstacles.forEach((obstacle) => {
				if (!obstacle.isActive()) {
					this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)
					return
				}
			})
			this.obstacles.push(obstacle)
		}
	}

	getObstacle(): BossObstacle[] {
		return this.obstacles
	}
}
