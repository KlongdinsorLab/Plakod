import { Laser } from './Laser'
import Player from 'component/player/Player'
import { LASER_SPEED } from 'config'
// import SoundManager from 'component/sound/SoundManager'

export class SingleLaser extends Laser {
	private scene: Phaser.Scene
	private player: Player
	private laser: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined
	// private shootSound?: Phaser.Sound.BaseSound
	private soundEffect!: Phaser.Sound.NoAudioSound | Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound

	private angularVelocity = [LASER_SPEED / 1, LASER_SPEED / 2, LASER_SPEED / 3, LASER_SPEED / 4, LASER_SPEED / 5, LASER_SPEED / 6, LASER_SPEED / 7, LASER_SPEED / 8]
	private angularVelocityIndex = 1

	constructor(scene: Phaser.Scene, player: Player) {
		super()
		this.scene = scene
		this.player = player
		// this.shootSound = this.scene.sound.add('shootSound', { volume: 2 })
		this.soundEffect = scene.sound.addAudioSprite('mcSound')

		this.shuffle(this.angularVelocity)
	}
	shoot(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] {
		const { x, y } = this.player.getLaserLocation()
		this.laser = this.scene.physics.add.image(x, y, 'laser')
		this.laser.setVelocityY(-1 * LASER_SPEED)
		this.laser.setAngularVelocity(this.angularVelocity[this.angularVelocityIndex])
		// new SoundManager(this.scene).play(this.shootSound!)
		this.soundEffect.play("shooting")
		this.angularVelocityIndex = this.angularVelocityIndex+1%8
		return [this.laser]
	}

	destroy(): void {
		this.laser?.destroy()
	}

	shuffle(array: number[]): void {
		let currentIndex = array.length,
			randomIndex

		while (currentIndex != 0) {
			randomIndex = Math.floor(Math.random() * currentIndex)
			currentIndex--

			;[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			]
		}
	}
}
