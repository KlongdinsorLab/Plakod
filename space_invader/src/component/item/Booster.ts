import Player from 'component/player/Player'
import Score from 'component/ui/Score'
import { BULLET_SPEED, MARGIN } from 'config'
// import SoundManager from 'component/sound/SoundManager'
import { Item } from './Item'
import InhaleGauge from 'component/ui/InhaleGauge'

const boosterList = [
	'booster_3waybullet.png',
	'booster_heal.png',
	'booster_scoreX2.png',
	'booster_speedbullet.png',
	'booster_strongbullet.png',
	"booster_random.png"
]

export class Booster extends Item {
	// private soundManager: SoundManager

	constructor(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		gauge: InhaleGauge,
		isTutorial?: boolean,
	) {
		super(scene, player, score, gauge, isTutorial)
		this.move()
	}

	create(
		isTutorial?: boolean,
	): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
		const { width } = this.scene.scale
		const boosterIndex = Math.floor(Math.random() * boosterList.length)
		const startingX = isTutorial ? width / 2 : Math.floor(Math.random() * width)
		this.item = this.scene.physics.add.image(
			startingX,
			-MARGIN,
			'bossAsset',
			boosterList[boosterIndex],
		)

		const boosterCollider = this.scene.physics.add.overlap(
			this.item,
			this.player.getBody(),
			() => {
				// TODO Player get booster
				this.scene.tweens.add({ targets: this.item, duration: 200, alpha: 0 })
				boosterCollider.active = false
			},
		)
		return this.item
	}

	move(): void {
		this.item.setVelocityY(BULLET_SPEED)
		const velocityX = Math.floor(
			Math.random() * (BULLET_SPEED / 3) - BULLET_SPEED / 6,
		)
		this.item.setVelocityX(this.isTutorial ? -120 : velocityX)
	}

	hit(): void {}

	getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
		return this.item
	}

	isActive(): boolean {
		return this.item.active
	}
}