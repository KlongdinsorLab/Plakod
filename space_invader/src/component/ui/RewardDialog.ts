import { boosterList } from 'component/item/Booster'
import { MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'

const RewardDescription = {
	scoreX2: 'reward_dialog_scoreX2',
	speedbullet: '',
	strongbullet: '',
}

export default class RewardDialog {
	private rewardDescriptionText!: Phaser.GameObjects.Text
	private rewardText!: Phaser.GameObjects.Text
	private dialog!: Phaser.GameObjects.Graphics
	private rewardReceived!: Phaser.GameObjects.Image

	constructor(scene: Phaser.Scene) {
		const { width } = scene.scale
		const i18n = I18nSingleton.getInstance()
		this.rewardText = i18n
			.createTranslatedText(scene, width / 2, 556 + 80, 'receive_item')
			.setAlign('center')
			.setOrigin(0.5, 0)

		this.dialog = scene.add
			.graphics()
			.fillStyle(0xffffff, 1)
			.fillRoundedRect(
				96,
				this.rewardText.y + this.rewardText.height + 48,
				528,
				160,
				20,
			)
		this.rewardReceived = scene.add
			.image(
				96 + MARGIN / 2,
				this.rewardText.y + this.rewardText.height + 48 + 80,
				'bossAsset',
				boosterList[2],
			)
			.setOrigin(0, 0.5)
		this.rewardDescriptionText = i18n
			.createTranslatedText(
				scene,
				96 + this.rewardReceived .width + MARGIN,
				this.rewardText.y + this.rewardText.height + 48 + 80,
				RewardDescription['scoreX2'],
			)
			.setOrigin(0, 0.5)
	}

	initFontStyle() {
		this.rewardDescriptionText
			.setStyle({
				fontFamily: 'Mali',
				color: 'black',
			})
			.setFontSize('24px')

		this.rewardText
			.setStyle({
				fontFamily: 'Mali',
				fontStyle: 'bold',
				color: 'white',
			})
			.setFontSize('32px')
			.setStroke('#3F088C', 6)
	}

	hide(){
		this.dialog.setVisible(false)
		this.rewardDescriptionText.setVisible(false)
		this.rewardText.setVisible(false)
		this.rewardReceived.setVisible(false)
	}
	show(){
		this.dialog.setVisible(true)
		this.rewardDescriptionText.setVisible(true)
		this.rewardText.setVisible(true)
		this.rewardReceived.setVisible(true)
	}
}
