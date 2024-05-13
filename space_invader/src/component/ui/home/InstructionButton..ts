import { MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'

export default class InstructionButton {
	constructor(scene: Phaser.Scene) {
		const { width, height } = scene.scale

        const instructionButton =  scene.add
			.nineslice(width - MARGIN - 160, height - 3 * MARGIN,'landing_page', 'button_red.png', 160, 106, 32, 32, 64, 64)
			.setOrigin(0,0)
			
		scene.add
			.image(
				width - MARGIN - 160 + 20,
				height - 3 * MARGIN + 24,
				'landing_page',
				'logo_button_instruction.png',
			)
			.setOrigin(0, 0)
		const instructionText = I18nSingleton.getInstance()
			.createTranslatedText(
				scene,
				width - 160 + MARGIN + 8,
				height - 2 * MARGIN,
				'home_instruction',
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		instructionText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: 'white',
			})
			.setFontSize('30px')
			.setStroke('#9E461B', 3)
		instructionButton.setInteractive()
		instructionButton.on('pointerdown', () => {
			// TODO: link to instruction
		})
	}
}
