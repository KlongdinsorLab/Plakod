import I18nSingleton from 'i18n/I18nSingleton'
//import TimeService from 'services/timeService'
import { Button } from './Button'

export default class PlayButton extends Button {
	//private timeService!: TimeService

	constructor(scene: Phaser.Scene, bgm: any) {
		super(scene)
		//this.timeService = new TimeService()

       	this.button = scene.add.nineslice(144, 772,'landing_page', 'button_red.png', 432, 170, 32, 32, 64, 64)
			                        .setOrigin(0,0)
		this.buttonText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 420, 748 + 24 + 80, 'home_start_game')
			.setAlign('center')
			.setOrigin(0.5, 0.5)
		this.buttonLogo = scene.add
			.image(240, 748 + 24 + 80, 'landing_page', 'logo_button_play.png')
			.setOrigin(0.5, 0.5)

		this.button.setInteractive()
		this.button.on('pointerup', () => {
			
			//this.timeService.saveLastPlayTime()

			//scene.scene.start('cutscene1', { bgm: bgm })

			const username = scene.registry.get('username');
			if (username) {
				scene.scene.start('redeem', { bgm : bgm })
			} else {
				scene.scene.start('display name', { bgm : bgm })
			}
		})
	}
 
	initFontStyle() {
		this.buttonText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: 'white',
			})
			.setFontSize('64px')
			.setStroke('#9E461B', 3)
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
