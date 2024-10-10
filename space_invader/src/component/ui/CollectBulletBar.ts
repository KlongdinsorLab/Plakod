import { MARGIN, HOLD_BAR_BORDER, COLLECT_BULLET_COUNT } from 'config'

export default class CollectBulletBar {
	private bulletText!: Phaser.GameObjects.Text
	private collectBulletBar!: Phaser.GameObjects.Image

	constructor(scene: Phaser.Scene) {
		const { width, height } = scene.scale

		this.collectBulletBar = scene.add
			.image(
				width / 2,
				height - MARGIN + HOLD_BAR_BORDER + 29,
				'inGameUI',
				'collect_bullet_bar.png',
			)
			.setOrigin(0.5, 1)
			.setDepth(10)
			.setVisible(false)

		this.bulletText = scene.add
			.text(
				width / 2 + 32,
				height - MARGIN + HOLD_BAR_BORDER + 14,
				` /${COLLECT_BULLET_COUNT}`,
			)
			.setOrigin(0.5, 1)
			.setDepth(11)
			.setVisible(false)
	}

	setBulletText(bulletText: number) {
		this.bulletText.setText(` ${bulletText} / ${COLLECT_BULLET_COUNT}`)
	}

	show() {
		this.bulletText.setVisible(true)
		this.collectBulletBar.setVisible(true)
	}

	hide() {
		this.bulletText.setVisible(false)
		this.collectBulletBar.setVisible(false)
	}

	initFontStyle() {
		this.bulletText
			.setStyle({
				fontFamily: 'Jua',
				color: 'white',
			})
			.setFontSize('48px')
			.setStroke('#42342C', 10)
	}
}
