import { METEOR_FREQUENCY_MS } from 'config'
import { EnemyFactory } from './EnemyFactory'
import { Obstacle } from './Obstacle'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

export class ObstacleFactory extends EnemyFactory {
	private obstacles: Obstacle[] = []
	private obstacleTimer = 0

	create(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		tutorial?: boolean,
		itemPhase?: boolean
	): Obstacle {
		return new Obstacle(scene, player, score, tutorial, itemPhase)
	}

	createByTime(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		delta: number,
		itemPhase?: boolean
	): void {
		this.obstacleTimer += delta
		while (this.obstacleTimer > METEOR_FREQUENCY_MS) {
			this.obstacleTimer -= METEOR_FREQUENCY_MS
			const obstacle = this.create(scene, player, score, false, itemPhase)
			this.obstacles.forEach((obstacle) => {
				if (!obstacle.isActive()) {
					this.obstacles.splice(this.obstacles.indexOf(obstacle), 1)
					return
				}
			})
			this.obstacles.push(obstacle)
		}
	}

	getObstacles(): Obstacle[] {
		return this.obstacles
	}
}
