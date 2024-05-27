import { METEOR_FREQUENCY_MS } from 'config'
import { EnemyFactory } from '../EnemyFactory'
import { B1Obstacle } from './B1Obstacle'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'

export class B1ObstacleFactory extends EnemyFactory {
	private obstacles: B1Obstacle[] = []
	private obstacleTimer = 0

	create(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		tutorial?: boolean,
		itemPhase?: boolean
	): B1Obstacle {
		return new B1Obstacle(scene, player, score, tutorial, itemPhase)
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

	getObstacles(): B1Obstacle[] {
		return this.obstacles
	}
}
