import I18nSingleton from 'i18n/I18nSingleton'

export default class RankingButton {
	constructor(scene: Phaser.Scene) {
		const rankingButton = scene.add
							.nineslice(144, 966,'landing_page', 'button_grey.png', 128, 138, 10, 10, 64, 64)
							.setOrigin(0,0)
		scene.add
			.image(144 + 64, 966 + 48, 'landing_page', 'logo_button_ranking.png')
			.setOrigin(0.5, 0.5)
		const rankingText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 144 + 64, 966 + 48 + 24, 'home_ranking')
			.setAlign('center')
			.setOrigin(0.5, 0)
		rankingButton.setInteractive()
		rankingButton.on('pointerdown', () => {
			// TODO: Link to ranking
		})

		rankingText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: '#7A7367',
			})
			.setFontSize('30px')
			.setStroke('white', 5)
	}
}
