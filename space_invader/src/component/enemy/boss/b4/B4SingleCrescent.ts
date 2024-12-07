import Player from 'component/player/Player'
import Score from 'component/ui/Score'

import {
	BOSS4_CRESCENT_SCALE_DURATION,
	BOSS4_CRESCENT_SCORE_REDUCTION,
	BOSS4_CRESCENT_VELOCITY_Y,
	PLAYER_HIT_DELAY_MS,
} from 'config'

// import { BoosterEffect } from 'component/booster/booster'
export default class B4SingleCrescent {
	// private boosterEffect!: BoosterEffect

	protected enemy!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | any
	protected scene: Phaser.Scene
	protected player: Player
	protected score: Score

	constructor(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		x: number,
		y: number,
	) {
		this.scene = scene
		this.player = player
		this.score = score
		this.create(x, y)

		// this.boosterEffect = scene.registry.get('boosterEffect')

		this.move()
	}

	create(
		x: number,
		y: number,
	): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
		this.enemy = this.scene.physics.add
			.image(x, y, 'b4v1', 'b4_skill1.png')
			.setOrigin(0.5, 0.5)
		this.enemy.depth = 1

		this.scene.tweens.add({
			targets: this.enemy,
			scaleX: 1.75,
			scaleY: 1.75,
			ease: 'Linear',
			duration: BOSS4_CRESCENT_SCALE_DURATION,
			repeat: 0,
		})

		this.scene.physics.add.overlap(
			this.player.getBody(),
			this.enemy,
			(_, _meteor) => {
				if (this.player.getIsHit()) return
				this.player.setIsHit(true)
				this.player.damaged()
				this.score.add(BOSS4_CRESCENT_SCORE_REDUCTION)
				this.scene.time.delayedCall(PLAYER_HIT_DELAY_MS, () => {
					this.player.setIsHit(false)
					this.player.recovered()
				})
			},
		)
		this.scene.time.delayedCall(5000, () => {
			this.enemy.destroy()
		})

		return this.enemy
	}

	move(): void {
		this.enemy.setVelocityY(BOSS4_CRESCENT_VELOCITY_Y)
	}

	getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
		return this.enemy
	}

	isActive(): boolean {
		return this.enemy.active
	}
}
