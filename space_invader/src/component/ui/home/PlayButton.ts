import SoundManager from 'component/sound/SoundManager'
import I18nSingleton from 'i18n/I18nSingleton'
import TimeService from 'services/timeService'

export default class PlayButton {
	constructor(scene: Phaser.Scene, bgm: any) {
		const timeService = new TimeService(scene)

        const playButton = scene.add.nineslice(144, 772,'landing_page', 'button_red.png', 432, 170, 32, 32, 64, 64)
			                        .setOrigin(0,0)
		const startText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 420, 748 + 24 + 80, 'home_start_game')
			.setAlign('center')
			.setOrigin(0.5, 0.5)
		scene.add
			.image(240, 748 + 24 + 80, 'landing_page', 'logo_button_play.png')
			.setOrigin(0.5, 0.5)
		playButton.setInteractive()
		playButton.on('pointerdown', () => {
			timeService.stampLastPlayTime(1)
			scene.scene.start('Cutscene_randomboss')
			new SoundManager(scene).stop(bgm!)
		})

		startText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: 'white',
			})
			.setFontSize('64px')
			.setStroke('#9E461B', 3)
	}
}
