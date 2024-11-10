import { Laser } from './Laser'
import Player from 'component/player/Player'
import { LASER_SPEED } from 'config'
import { angularVelocity } from './AngularVelocity'
// import SoundManager from 'component/sound/SoundManager'

export class SingleLaser extends Laser {
	private scene: Phaser.Scene
	private player: Player
	private laser: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | undefined
	// private shootSound?: Phaser.Sound.BaseSound
	private soundEffect!:
		| Phaser.Sound.NoAudioSound
		| Phaser.Sound.WebAudioSound
		| Phaser.Sound.HTML5AudioSound

	private angularVelocityIndex = 1
	private selectedCharacterId!: string

	constructor(scene: Phaser.Scene, player: Player) {
		super()
		this.scene = scene
		this.player = player
		// this.shootSound = this.scene.sound.add('shootSound', { volume: 2 })
		this.soundEffect = scene.sound.addAudioSprite('mcSound')
		this.selectedCharacterId = this.scene.registry.get('selectedCharacterId')

		this.angularVelocityIndex = Math.floor(Math.random() * 8)
	}
	shoot(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] {
		const { x, y } = this.player.getLaserLocation()
		this.laser =
			this.selectedCharacterId === '1'
				? this.scene.physics.add.image(x, y, 'laser')
				: this.scene.physics.add.image(x, y, 'player', 'mc_bullet.png')
		this.laser.setVelocityY(-1 * LASER_SPEED)
		this.laser.setAngularVelocity(angularVelocity[this.angularVelocityIndex])
		// new SoundManager(this.scene).play(this.shootSound!)
		this.soundEffect.play('shooting')

		return [this.laser]
	}

	destroy(): void {
		this.laser?.destroy()
	}
}
