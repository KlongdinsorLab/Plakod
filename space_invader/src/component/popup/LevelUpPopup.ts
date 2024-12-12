import I18nSingleton from 'i18n/I18nSingleton'
import { Popup } from './Popup'
import { MARGIN } from 'config'
import i18next from 'i18next'
import { BoosterUI } from 'component/booster/boosterUI'

export type LevelResponse = {
	id: number
	boss_id: number | null
	level: number
	score_required: number
	booster_id_1: number | null
	booster_id_2: number | null
	booster_id_3: number | null
	booster_amount_1: number | null
	booster_amount_2: number | null
	booster_amount_3: number | null
}

export class LevelUpPopup extends Popup {
	private isConfirmLevelUp = false

	private layer!: Phaser.GameObjects.Layer
	private screenOverlay!: Phaser.GameObjects.Rectangle

	private levelText!: Phaser.GameObjects.Text
	private headText!: Phaser.GameObjects.Text
	private bossUnlockedText!: Phaser.GameObjects.Text
	private bossDetailText!: Phaser.GameObjects.Text
	private rewardReceivedText!: Phaser.GameObjects.Text
	private buttonText!: Phaser.GameObjects.Text

	private levelUpIcon!: Phaser.GameObjects.Image
	private bossImage!: Phaser.GameObjects.Image
	private popupAuraEffect!: Phaser.GameObjects.Image

	private booster1!: BoosterUI
	private booster2!: BoosterUI
	private booster3!: BoosterUI

	private levelResponse!: LevelResponse

	private submitButton!: Phaser.GameObjects.NineSlice

	constructor(scene: Phaser.Scene, levelResponse: LevelResponse) {
		super(scene)
		this.levelResponse = levelResponse
	}
	create(): void {
		const {
			level,
			boss_id,
			booster_id_1,
			booster_id_2,
			booster_id_3,
			booster_amount_1,
			booster_amount_2,
			booster_amount_3,
		} = this.levelResponse

		this.layer = this.scene.add.layer()
		const i18n = I18nSingleton.getInstance()
		this.screenOverlay = this.scene.add
			.rectangle(
				0,
				0,
				this.scene.scale.width,
				this.scene.scale.height,
				0x000000,
			)
			.setOrigin(0)
			.setAlpha(0.9)
		this.layer.add(this.screenOverlay)

		this.headText = i18n
			.createTranslatedText(
				this.scene,
				this.scene.scale.width / 2,
				boss_id ? 144 : 240,
				'levelup_popup_heading',
			)
			.setFontSize(40)
			.setColor('#FFFFFF')
			.setStroke('#3F088C', 6)
			.setAlign('center')
			.setOrigin(0.5, 0)
		this.layer.add(this.headText)

		this.popupAuraEffect = this.scene.add
			.image(this.scene.scale.width / 2, boss_id ? 286 : 430, 'popupAuraEffect')
			.setOrigin(0.5, 0)
		this.layer.add(this.popupAuraEffect)

		this.levelUpIcon = this.scene.add
			.image(
				this.scene.scale.width / 2,
				boss_id ? 340 : 484,
				'icon',
				'icon_level.png',
			)
			.setScale(2, 2)
			.setOrigin(0.5, 0)
		this.layer.add(this.levelUpIcon)

		this.levelText = this.scene.add
			.text(
				this.scene.scale.width / 2,
				(boss_id ? 340 : 484) + this.levelUpIcon.height - MARGIN / 2,
				`${level}`,
			)
			.setFontSize(96)
			.setColor('#FFFFFF')
			.setAlign('center')
			.setOrigin(0.5, 0.5)
		this.layer.add(this.levelText)

		if (boss_id) {
			this.bossUnlockedText = i18n
				.createTranslatedText(
					this.scene,
					this.scene.scale.width / 2,
					this.popupAuraEffect.y + this.popupAuraEffect.height + MARGIN,
					'levelup_boss_unlock',
				)
				.setFontSize(32)
				.setColor('#FFFFFF')
				.setStroke('#3F088C', 6)
				.setOrigin(0.5, 0)
			this.layer.add(this.bossUnlockedText)

			this.bossImage = this.scene.add
				.image(
					this.scene.scale.width / 2,
					this.bossUnlockedText.y + this.bossUnlockedText.height + MARGIN / 2,
					`b${boss_id}v1`,
					`b${boss_id}v1_attack_00001.png`,
				)
				.setOrigin(0.5, 0)
			this.layer.add(this.bossImage)

			this.bossDetailText = i18n
				.createTranslatedText(
					this.scene,
					this.scene.scale.width / 2,
					this.bossImage.y + this.bossImage.height + MARGIN,
					'levelup_boss_detail',
					{ bossName: i18next.t(`b${boss_id}v1_name`) },
				)
				.setFontSize(32)
				.setColor('#FFFFFF')
				.setStroke('#3F088C', 6)
				.setOrigin(0.5, 0)
			this.layer.add(this.bossDetailText)
		} else {
			this.rewardReceivedText = i18n
				.createTranslatedText(
					this.scene,
					this.scene.scale.width / 2,
					714 + MARGIN,
					'levelup_reward_recieve',
				)
				.setFontSize(32)
				.setColor('#FFFFFF')
				.setStroke('#3F088C', 6)
				.setOrigin(0.5, 0)
			this.layer.add(this.rewardReceivedText)
		}

		if (
			booster_id_1 &&
			booster_id_2 &&
			booster_id_3 &&
			booster_amount_1 &&
			booster_amount_2 &&
			booster_amount_3
		) {
			this.booster1 = new BoosterUI(this.scene, booster_id_1, {
				x: this.scene.scale.width / 2 - 48 - 32 - 96,
				y: this.rewardReceivedText.y + 1.75 * MARGIN,
				amount: booster_amount_1,
			})

			this.booster2 = new BoosterUI(this.scene, booster_id_2, {
				x: this.scene.scale.width / 2 - 48,
				y: this.rewardReceivedText.y + 1.75 * MARGIN,
				amount: booster_amount_2,
			})

			this.booster3 = new BoosterUI(this.scene, booster_id_3, {
				x: this.scene.scale.width / 2 + 48 + 32,
				y: this.rewardReceivedText.y + 1.75 * MARGIN,
				amount: booster_amount_3,
			})

			this.booster1.create()
			this.booster2.create()
			this.booster3.create()

			this.layer.add(this.booster1.getBody())
			this.layer.add(this.booster2.getBody())
			this.layer.add(this.booster3.getBody())
		}

		this.submitButton = this.scene.add
			.nineslice(
				this.scene.scale.width / 2,
				boss_id ? 1073 : 990,
				'button',
				'button_red.png',
				376,
				96,
				32,
				32,
				64,
				64,
			)
			.setOrigin(0.5, 0)
		this.submitButton.setInteractive().on('pointerup', () => {
			this.isConfirmLevelUp = true
			this.destroy()
			this.booster1?.destroy()
			this.booster2?.destroy()
			this.booster3?.destroy()
		})
		this.layer.add(this.submitButton)

		this.buttonText = i18n
			.createTranslatedText(
				this.scene,
				this.scene.scale.width / 2,
				boss_id ? 1073 + MARGIN : 990 + MARGIN,
				'submit',
			)
			.setOrigin(0.5, 0.5)
			.setFontSize(32)
			.setColor('#FFFFFF')
			.setStroke('#9E461B', 6)
		this.layer.add(this.buttonText)
	}

	destroy(): void {
		this.layer.destroy()
	}

	initFontStyle() {
		this.booster1?.initBooster()
		this.booster2?.initBooster()
		this.booster3?.initBooster()

		this.levelText?.setStyle({
			fontFamily: 'Jua',
		})

		this.headText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})

		this.bossDetailText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})

		this.bossUnlockedText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})

		this.rewardReceivedText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})

		this.buttonText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})
	}

	getIsConfirmLevelUp(): boolean {
		return this.isConfirmLevelUp
	}

	setVisibleOn() {
		this.layer.setVisible(true)
	}

	setVisibleOff() {
		this.layer.setVisible(false)
	}
}
