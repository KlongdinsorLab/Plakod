import Player from 'component/player/Player'
import Score from 'component/ui/Score'

import { BOSS2_SKILL_SCORE_REDUCTION, PLAYER_HIT_DELAY_MS } from 'config'

// import { BoosterEffect } from 'component/booster/booster'
export class B2Bullet {
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
			.image(x, y, 'b2v1', 'b2_skill1.png')
			.setOrigin(0.5, 0.5)
		this.enemy.depth = 1

		this.scene.physics.add.overlap(
			this.player.getBody(),
			this.enemy,
			(_, _meteor) => {
				if (this.player.getIsHit()) return
				this.player.setIsHit(true)
				this.player.damaged()
				this.score.add(BOSS2_SKILL_SCORE_REDUCTION)
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
		// this.isInItemPhase
		// 	? this.enemy.setVelocityY(METEOR_ITEMPHASE_SPEED)
		// 	: this.enemy.setVelocityY(METEOR_SPEED)
		// const velocityX = Math.floor(
		// 	Math.random() * (METEOR_SPEED / 3) - METEOR_SPEED / 6,
		// )
		// this.enemy.setVelocityX(this.isTutorial ? -120 : velocityX)
		// this.enemy.setAngularVelocity(METEOR_SPIN_SPEED)

		this.enemy.setVelocityY(600)
	}

	getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
		return this.enemy
	}

	isActive(): boolean {
		return this.enemy.active
	}
}
