import { MARGIN } from 'config'

export default class SoundToggle {
	constructor(scene: Phaser.Scene) {
		const { height } = scene.scale

		const soundToggle =  scene.add
			.nineslice(MARGIN, height - 3 * MARGIN,'landing_page', 'button_red.png', 96, 106, 32, 32, 64, 64)
			.setOrigin(0,0)
		const volumeLogo = scene.add
			.image(
				2 * MARGIN,
				height - 2 * MARGIN,
				'landing_page',
				scene.sound.mute ? 'logo_volumn_off.png' : 'logo_volumn_on.png',
			)
			.setOrigin(0.5, 0.5)

		soundToggle.setInteractive()
		soundToggle.on('pointerup', () => {
			scene.sound.mute = !scene.sound.mute
			localStorage.setItem('mute', !scene.sound.mute ? 'true' : '')
			volumeLogo.setTexture(
				'landing_page',
				scene.sound.mute ? 'logo_volumn_on.png' : 'logo_volumn_off.png',
			)
		})
	}
}
