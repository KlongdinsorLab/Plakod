import I18nSingleton from 'i18n/I18nSingleton'
import { Button } from './Button'

export default class AchievementButton extends Button {
	constructor(scene: Phaser.Scene) {
		super(scene)
		this.button = scene.add
								.nineslice(296, 966,'landing_page', 'button_grey.png', 128, 138, 10, 10, 64, 64)
								.setOrigin(0,0)
		this.buttonLogo = scene.add
			.image(296 + 64, 966 + 48, 'landing_page', 'logo_button_achievement.png')
			.setOrigin(0.5, 0.5)
		this.buttonText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 296 + 64, 966 + 48 + 24, 'home_achievement')
			.setAlign('center')
			.setOrigin(0.5, 0)
		this.button.setInteractive()
		this.button.on('pointerdown', () => {
			this.scene.scene.start('mybag', {key: this.scene.scene.key})
			// TODO: Link to achievement
		})
	}

	initFontStyle() {
		this.buttonText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: '#7A7367',
			})
			.setFontSize('30px')
			.setStroke('white', 5)
	}

	activate() {
		this.button.setInteractive()
		this.button.setAlpha(1)
		this.buttonLogo.setAlpha(1)
		this.buttonText.setAlpha(1)
		this.isActive = true
	}

	disable() {
		this.button.removeInteractive()
		this.button.setAlpha(0.5)
		this.buttonLogo.setAlpha(0.5)
		this.buttonText.setAlpha(0.5)
		this.isActive = false
	}

	getIsActive(): boolean {
		return this.isActive
	}
	
	getBody(): Phaser.GameObjects.NineSlice | Phaser.GameObjects.Image {
		return this.button
	}

	hide(): void {
		this.button.setVisible(false)
		this.buttonLogo.setVisible(false)
		this.buttonText.setVisible(false)
		this.isActive = false
	}
}
