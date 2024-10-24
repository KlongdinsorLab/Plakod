import { MARGIN, MEDIUM_FONT_SIZE } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'

const Difficulty = {
	1: 'difficulty_easy',
	2: 'difficulty_medium',
	3: 'difficulty_hard',
}

export default class HomeTopBar {
	constructor(scene: Phaser.Scene) {
		// TODO get from registry
		let progression = 9
		if(progression < 10) progression = 10

		// Level Progress
		const currentLevel = scene.registry.get('playerLevel').level
		scene.add
			.image(MARGIN + 120, 40, 'landing_page', 'logo_level.png')
			.setOrigin(0.5, 0)
		const levelText = scene.add
			.text(MARGIN + 120, 72, `${currentLevel}`)
			.setOrigin(0.5, 0.5)
		scene.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(MARGIN, 2 * MARGIN + 40, 240, 24, 10)

		scene.add
			.graphics()
			.fillStyle(0x43a99e)
			.fillRoundedRect(MARGIN, 2 * MARGIN + 40, 240 * progression / 100, 24, 10)

		scene.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(MARGIN, 2 * MARGIN + 40, 240, 24, 32)

		

		// Airflow level
		scene.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(336, 40, 336, 56, 28)
		scene.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(336, 40, 336, 56, 30)
		scene.add
			.image(336, 40, 'landing_page', 'bar_airflow.png')
			.setOrigin(0.5, 0)
		
		const airflowNumber = scene.registry.get('airflow')
		const airFlowLevelText = I18nSingleton.getInstance()
			.createTranslatedText(scene, 336 + 28, 40, 'home_airflow_level', {
				level: airflowNumber,
			})
			.setAlign('center')

		// Difficulty
		scene.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(336, 40 + 56 + 8, 336, 56, 28)
		scene.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(336, 40 + 56 + 8, 336, 56, 30)
		scene.add
			.image(336, 40 + 56 + 8, 'landing_page', 'bar_difficulty.png')
			.setOrigin(0.5, 0)
		
		const difficultyId: keyof typeof Difficulty = scene.registry.get('difficulty').id ?? 1
		const difficultyText = I18nSingleton.getInstance()
			.createTranslatedText(
				scene,
				336 + 336 / 2,
				40 + 56 + 8 + 6 + 24,
				`${Difficulty[difficultyId]}`,
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		levelText
			.setStyle({
				fontFamily: 'Jua',
				color: 'white',
			})
			.setFontSize(MEDIUM_FONT_SIZE)

		airFlowLevelText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: '#57453B',
			})
			.setFontSize('32px')
			.setStroke('white', 3)

		difficultyText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: '#57453B',
			})
			.setFontSize('32px')
	}
}
