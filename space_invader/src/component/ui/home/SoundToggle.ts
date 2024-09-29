import { MARGIN } from 'config'

export default class SoundToggle {
	private soundToggle: Phaser.GameObjects.NineSlice
	constructor(scene: Phaser.Scene, x: number, y: number) {
		this.soundToggle = scene.add
			.nineslice(x, y, 'button', 'button_red.png', 96, 106, 32, 32, 64, 64)
			.setOrigin(0.5, 0.5)
		const volumeLogo = scene.add
			.image(
				this.soundToggle.x,
				this.soundToggle.y - MARGIN / 8,
				'icon',
				scene.sound.mute ? 'icon_volumn_off.png' : 'icon_volumn_on.png',
			)
			.setOrigin(0.5, 0.5)

		this.soundToggle.setInteractive()
		this.soundToggle.on('pointerup', () => {
			scene.sound.mute = !scene.sound.mute
			localStorage.setItem('mute', !scene.sound.mute ? 'true' : '')
			volumeLogo.setTexture(
				'icon',
				scene.sound.mute ? 'icon_volumn_on.png' : 'icon_volumn_off.png',
			)
		})
	}

	getBody(): Phaser.GameObjects.NineSlice {
		return this.soundToggle
	}
}
