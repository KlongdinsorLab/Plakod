import I18nSingleton from 'i18n/I18nSingleton'
import { Button } from './Button'
import { MARGIN } from 'config'
// import TimeService from 'services/timeService'

export default class RestartButton extends Button {
	// private timeService!: TimeService
	// private playCount!: number

	constructor(scene: Phaser.Scene) {
		super(scene)
		const { width } = scene.scale
		const i18n = I18nSingleton.getInstance()
		// this.timeService = new TimeService()
		// TODO: get playCount from backend
		// this.playCount = Number(localStorage.getItem('playCount')) ?? 0

		this.button = this.scene.add
			.nineslice(
				width / 2,
				900,
				'end_game_scene',
				'button_purple.png',
				528,
				96,
				24,
				24,
			)
			.setOrigin(0.5, 0)

		this.button.setInteractive()
		this.button.on('pointerup', () => {
			scene.scene.stop()
			i18n.destroyEmitter()
			// this.timeService.saveLastPlayTime()

			scene.scene.start('cutscene_randomboss')
		})

		this.buttonText = i18n
			.createTranslatedText(
				scene,
				width / 2 + MARGIN / 2,
				900 + this.button.height / 2,
				'restart',
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		this.buttonLogo = scene.add
			.image(
				width / 2 - this.buttonText.width - 20,
				900 + this.button.height / 2,
				'end_game_scene',
				'logo_button_play again.png',
			)
			.setOrigin(1, 0.5)
	}

	initFontStyle() {
		this.buttonText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: 'white',
			})
			.setFontSize('32px')
			.setStroke('#3F088C', 6)
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

	show(): void {
		this.button.setVisible(true)
		this.buttonLogo.setVisible(true)
		this.buttonText.setVisible(true)
		this.isActive = true
	}

	hide(): void {
		this.button.setVisible(false)
		this.buttonLogo.setVisible(false)
		this.buttonText.setVisible(false)
		this.isActive = false
	}
}
