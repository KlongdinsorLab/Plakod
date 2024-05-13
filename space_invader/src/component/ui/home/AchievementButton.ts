import I18nSingleton from 'i18n/I18nSingleton'

export default class AchievementButton {
	constructor(scene: Phaser.Scene) {
		// Reward Button
		const achievementButton = scene.add
								.nineslice(296, 966,'landing_page', 'button_grey.png', 128, 138, 10, 10, 64, 64)
								.setOrigin(0,0)
		scene.add
			.image(296 + 64, 966 + 48, 'landing_page', 'logo_button_achievement.png')
			.setOrigin(0.5, 0.5)
		const achievementText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 296 + 64, 966 + 48 + 24, 'home_achievement')
			.setAlign('center')
			.setOrigin(0.5, 0)
		// const achievementButton = scene.add
		// 	.rectangle(296, 966, 128, 128, 0xffffff, 0)
		// 	.setOrigin(0, 0)
		achievementButton.setInteractive()
		achievementButton.on('pointerdown', () => {
			// TODO: Link to achievement
		})

		achievementText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: '#7A7367',
			})
			.setFontSize('30px')
			.setStroke('white', 5)
	}
}
