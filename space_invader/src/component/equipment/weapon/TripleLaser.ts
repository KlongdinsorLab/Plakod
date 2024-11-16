import { Laser } from './Laser'
import Player from 'component/player/Player'
import { LASER_SPEED, TRIPLE_LASER_X_SPEED, MARGIN } from 'config'
import { angularVelocity } from './AngularVelocity'

export class TripleLaser extends Laser {
	private scene: Phaser.Scene
	private player: Player
	private laser1!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
	private laser2!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody
	private laser3!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody

	private angularVelocityIndex1!: number
	private angularVelocityIndex2!: number
	private angularVelocityIndex3!: number

	private selectedCharacterId!: string

	constructor(scene: Phaser.Scene, player: Player) {
		super()
		this.scene = scene
		this.player = player
		this.angularVelocityIndex1 = Math.floor(Math.random() * 8)
		this.angularVelocityIndex2 = Math.floor(Math.random() * 8)
		this.angularVelocityIndex3 = Math.floor(Math.random() * 8)
		this.selectedCharacterId = this.scene.registry.get('selectedCharacterId')
	}
	shoot(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody[] {
		const { x, y } = this.player.getLaserLocation()
		this.laser1 =
			this.selectedCharacterId === '1'
				? this.scene.physics.add.image(x, y, 'laser')
				: this.scene.physics.add.image(x, y, 'player', 'mc_bullet.png')
		this.laser2 =
			this.selectedCharacterId === '1'
				? this.scene.physics.add.image(x + MARGIN, y, 'laser')
				: this.scene.physics.add.image(x + MARGIN, y, 'player', 'mc_bullet.png')
		this.laser3 =
			this.selectedCharacterId === '1'
				? this.scene.physics.add.image(x - MARGIN, y, 'laser')
				: this.scene.physics.add.image(x - MARGIN, y, 'player', 'mc_bullet.png')
		this.laser1.setVelocityY(-1 * LASER_SPEED)
		this.laser2.setVelocityY(-1 * LASER_SPEED)
		this.laser2.setVelocityX(TRIPLE_LASER_X_SPEED)
		this.laser3.setVelocityY(-1 * LASER_SPEED)
		this.laser3.setVelocityX(-1 * TRIPLE_LASER_X_SPEED)
		this.laser1.setAngularVelocity(angularVelocity[this.angularVelocityIndex1])
		this.laser2.setAngularVelocity(angularVelocity[this.angularVelocityIndex2])
		this.laser3.setAngularVelocity(angularVelocity[this.angularVelocityIndex3])

		return [this.laser1, this.laser2, this.laser3]
	}

	destroy(): void {
		this.laser1?.destroy()
		this.laser2?.destroy()
		this.laser3?.destroy()
	}
}
