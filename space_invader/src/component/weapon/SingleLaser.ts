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

	constructor(scene: Phaser.Scene, player: Player) {
		super()
		this.scene = scene
		this.player = player
		// this.shootSound = this.scene.sound.add('shootSound', { volume: 2 })
		this.soundEffect = scene.sound.addAudioSprite('mcSound')
	}
	shoot(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] {
		const { x, y } = this.player.getLaserLocation()
		this.laser = this.scene.physics.add.image(x, y, 'laser')
		this.laser.setVelocityY(-1 * LASER_SPEED)
		this.laser.setAngularVelocity(LASER_SPEED / Math.floor(Math.random() * 8))
		// new SoundManager(this.scene).play(this.shootSound!)
		this.soundEffect.play("shooting")
		return [this.laser]
	}

	destroy(): void {
		this.laser?.destroy()
	}
}
