import I18nSingleton from 'i18n/I18nSingleton'

export default class SettingButton {
	constructor(scene: Phaser.Scene) {
        const settingButton = scene.add
							.nineslice(448, 966,'landing_page', 'button_grey.png', 128, 138, 10, 10, 64, 64)
							.setOrigin(0,0)
		scene.add
			.image(448 + 64, 966 + 48, 'landing_page', 'logo_button_setting.png')
			.setOrigin(0.5, 0.5)
		const settingText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 448 + 64, 966 + 48 + 24, 'home_setting')
			.setAlign('center')
			.setOrigin(0.5, 0)
		settingButton.setInteractive()
		settingButton.on('pointerdown', () => {
			// TODO: Link to setting
		})

		settingText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: '#7A7367',
			})
			.setFontSize('30px')
			.setStroke('white', 5)
	}
}
