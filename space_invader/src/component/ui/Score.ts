import { DARK_BROWN, MEDIUM_FONT_SIZE, MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'

export default class Score {
	private score = 0
	private scoreText!: Phaser.GameObjects.Text
	private layer: Phaser.GameObjects.Layer
	private scoreLogo!: Phaser.GameObjects.Image
	private scoreBackground!: Phaser.GameObjects.Graphics
	private scene!: Phaser.Scene

	constructor(scene: Phaser.Scene) {
		this.scene = scene
		const { width } = scene.scale
		this.layer = scene.add.layer()
		this.scoreBackground = scene.add.graphics()
		const backgroundWidth = (width - MARGIN) / 3
		this.scoreBackground.fillStyle(0xffffff, 0.5)
		this.scoreBackground.fillRoundedRect(
			MARGIN,
			MARGIN,
			backgroundWidth,
			MARGIN,
			MARGIN / 2,
		)
		this.scoreBackground.lineStyle(4, DARK_BROWN, 1)
		this.scoreBackground.strokeRoundedRect(
			MARGIN,
			MARGIN,
			backgroundWidth,
			MARGIN,
			MARGIN / 2,
		)
		this.layer.add(this.scoreBackground)

		this.scoreLogo = scene.add
			.image(
				this.scoreBackground.x + MARGIN / 4,
				this.scoreBackground.y + MARGIN / 2,
				'ui',
				'score.png',
			)
			.setOrigin(0, 0)
		this.layer.add(this.scoreLogo)

		this.scoreText = scene.add
			.text(
				this.scoreBackground.x + backgroundWidth + 0.75 * MARGIN,
				this.scoreBackground.y + MARGIN + 4,
				`${this.score}`,
				{ fontFamily: 'Jua', color: `#${DARK_BROWN.toString(16)}` },
			)
			.setFontSize(MEDIUM_FONT_SIZE)
			.setOrigin(1, 0)
		this.layer.add(this.scoreText)
		this.layer.setDepth(10)
	}

	add(added_score: number) {
		this.score += added_score
		if (this.score < 0) {
			this.score = 0
		}
		I18nSingleton.getInstance().setTranslatedText(this.scoreText, 'score', {
			score: this.score,
		})
	}

	getBody(): Phaser.GameObjects.Text {
		return this.scoreText
	}

	getLayer(): Phaser.GameObjects.Layer {
		return this.layer
	}

	getScore(): number {
		return this.score
	}

	setScore(score: number): void {
		this.score = score > 0 ? score : 0
		I18nSingleton.getInstance().setTranslatedText(this.scoreText, 'score', {
			score: this.score,
		})
		this.scene.scene.scene.registry.set('score', this.score)
	}

	hide(): void {
		this.scoreText.setVisible(false)
		this.scoreLogo.setVisible(false)
		this.scoreBackground.setVisible(false)
	}
}
