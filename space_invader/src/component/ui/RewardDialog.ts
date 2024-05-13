import { boosterList } from 'component/item/Booster'
import { MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'

const ItemDescription = {
	scoreX2: 'reward_dialog_scoreX2',
	speedbullet: '',
	strongbullet: '',
}

export default class RewardDialog {
	private itemDescriptionText!: Phaser.GameObjects.Text
	private receiveItemText!: Phaser.GameObjects.Text

	constructor(scene: Phaser.Scene) {
		const { width } = scene.scale
		const i18n = I18nSingleton.getInstance()
		this.receiveItemText = i18n
			.createTranslatedText(scene, width / 2, 556 + 80, 'receive_item')
			.setAlign('center')
			.setOrigin(0.5, 0)

		scene.add
			.graphics()
			.fillStyle(0xffffff, 1)
			.fillRoundedRect(
				96,
				this.receiveItemText.y + this.receiveItemText.height + 48,
				528,
				160,
				20,
			)
		const itemReceived = scene.add
			.image(
				96 + MARGIN / 2,
				this.receiveItemText.y + this.receiveItemText.height + 48 + 80,
				'bossAsset',
				boosterList[2],
			)
			.setOrigin(0, 0.5)
		this.itemDescriptionText = i18n
			.createTranslatedText(
				scene,
				96 + itemReceived.width + MARGIN,
				this.receiveItemText.y + this.receiveItemText.height + 48 + 80,
				ItemDescription['scoreX2'],
			)
			.setOrigin(0, 0.5)
	}

	initFontStyle() {
		this.itemDescriptionText
			.setStyle({
				fontFamily: 'Mali',
				color: 'black',
			})
			.setFontSize('24px')

		this.receiveItemText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: 'white',
			})
			.setFontSize('32px')
			.setStroke('#3F088C', 6)
	}
}
