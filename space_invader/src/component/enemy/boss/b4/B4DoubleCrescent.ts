import Player from 'component/player/Player'
import Score from 'component/ui/Score'

import {
	BOSS4_CRESCENT_SCORE_REDUCTION,
	BOSS4_DOUBLE_CRESCENT_VELOCITY_X,
	BOSS4_CRESCENT_VELOCITY_Y,
	BOSS4_DOUBLE_CRESCENT_ANGLE,
	PLAYER_HIT_DELAY_MS,
	BOSS4_CRESCENT_SCALE_DURATION,
} from 'config'

// import { BoosterEffect } from 'component/booster/booster'
export default class B4DoubleCrescent {
	// private boosterEffect!: BoosterEffect

	protected enemy1!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
	protected enemy2!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
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

	create(x: number, y: number): void {
		this.enemy1 = this.scene.physics.add
			.image(x + 75, y, 'b4v1', 'b4_skill1.png')
			.setOrigin(0.5, 0.5)
		this.enemy1.angle = -BOSS4_DOUBLE_CRESCENT_ANGLE
		this.enemy1.depth = 1

		this.scene.tweens.add({
			targets: this.enemy1,
			scaleX: 1.75,
			scaleY: 1.75,
			ease: 'Linear',
			duration: BOSS4_CRESCENT_SCALE_DURATION,
			repeat: 0,
		})

		this.scene.physics.add.overlap(
			this.player.getBody(),
			this.enemy1,
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
			this.enemy1.destroy()
		})

		this.enemy2 = this.scene.physics.add
			.image(x - 75, y, 'b4v1', 'b4_skill1.png')
			.setOrigin(0.5, 0.5)
		this.enemy2.angle = BOSS4_DOUBLE_CRESCENT_ANGLE
		this.enemy2.depth = 1

		this.scene.tweens.add({
			targets: this.enemy2,
			scaleX: 1.75,
			scaleY: 1.75,
			ease: 'Linear',
			duration: BOSS4_CRESCENT_SCALE_DURATION,
			repeat: 0,
		})

		this.scene.physics.add.overlap(
			this.player.getBody(),
			this.enemy2,
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
			this.enemy2.destroy()
		})
	}

	move(): void {
		// this.isInItemPhase
		// 	? this.enemy.setVelocityY(METEOR_ITEMPHASE_SPEED)
		// 	: this.enemy.setVelocityY(METEOR_SPEED)
		// const velocityX = Math.floor(
		// 	Math.random() * (METEOR_SPEED / 3) - METEOR_SPEED / 6,
		// )
		// this.enemy.setVelocityX(this.isTutorial ? -120 : velocityX)
		// this.enemy.setAngularVelocity(METEOR_SPIN_SPEED)

		this.enemy1.setVelocityY(BOSS4_CRESCENT_VELOCITY_Y)
		this.enemy1.setVelocityX(BOSS4_DOUBLE_CRESCENT_VELOCITY_X)

		this.enemy2.setVelocityY(BOSS4_CRESCENT_VELOCITY_Y)
		this.enemy2.setVelocityX(-BOSS4_DOUBLE_CRESCENT_VELOCITY_X)
	}

	// getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
	// 	return this.enemy1
	// }

	// isActive(): boolean {
	// 	return this.enemy1.active
	// }
}
