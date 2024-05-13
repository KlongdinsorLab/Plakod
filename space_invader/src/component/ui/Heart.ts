import { MARGIN } from 'config'

export default class Heart {
	constructor(scene: Phaser.Scene) {
		const { width } = scene.scale
		scene.add
			.image(
				width / 2 - MARGIN / 2,
				216 + 224 + 24,
				'landing_page',
				'heart_full.png',
			)
			.setOrigin(1, 0)
		const heartCountdown1 = scene.add
			.text(width / 2 - 1.5 * MARGIN, 216 + 224 + 24 + 84 + 8, `00:59:59`)
			.setOrigin(0.5, 0)
			.setVisible(false)
		scene.add
			.image(
				width / 2 + MARGIN / 2,
				216 + 224 + 24,
				'landing_page',
				'heart_empty.png',
			)
			.setOrigin(0, 0)
		const heartCountdown2 = scene.add
			.text(width / 2 + 1.5 * MARGIN, 216 + 224 + 24 + 84 + 8, `00:59:59`)
			.setOrigin(0.5, 0)

		heartCountdown1
			.setStyle({
				fontFamily: 'Jua',
				color: '#DD2D04',
			})
			.setFontSize('24px')
			.setStroke('white', 3)

		heartCountdown2
			.setStyle({
				fontFamily: 'Jua',
				color: '#DD2D04',
			})
			.setFontSize('24px')
			.setStroke('white', 3)
	}
}
