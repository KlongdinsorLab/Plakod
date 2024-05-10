import Phaser from 'phaser'
import { MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import WebFont from 'webfontloader'
import { boosterList } from 'component/item/Booster'

const ItemDescription = {
	'scoreX2': "บูสเตอร์เพิ่มคะแนนกระสุน\n1.25 เท่า ในเกมถัดไปไม่จำกัด\nหมดอายุภายใน 3 ชม.",
	'speedbullet': "",
	'strongbullet': "",
}

export default class EndGameScene extends Phaser.Scene {
	private score!: number
	private isHighScore = true

	constructor() {
		super('end game')
	}

	init({ score }: { score: number }) {
		this.score = score
	}

	preload() {
		this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)
		this.load.image('landing_page_bg', 'assets/background/landing_page_bg.png')
		this.load.atlas(
			'landing_page',
			'assets/ui/landing_page_spritesheet.png',
			'assets/ui/landing_page_spritesheet.json',
		)

		this.load.image(
			'end_game_scene_bg',
			'assets/background/end_game_scene_bg.png',
		)
		this.load.atlas(
			'end_game_scene',
			'assets/ui/end_game_scene_spritesheet.png',
			'assets/ui/end_game_scene_spritesheet.json',
		)

		this.load.atlas(
			'bossAsset',
			'assets/sprites/boss/asset_boss.png',
			'assets/sprites/boss/asset_boss.json',
		)
	}

	create() {
		const { width, height } = this.scale
		const i18n = I18nSingleton.getInstance()

		this.add
			.tileSprite(0, 0, width, height, 'end_game_scene_bg')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		this.add
			.image(width / 2, 96, 'end_game_scene', 'heading_victory.png')
			.setOrigin(0.5, 0)

		const victoryText = i18n
			.createTranslatedText(this, width / 2, 148, 'victory')
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		const highScoreText = i18n
			.createTranslatedText(this, width / 2, 248, 'high_score')
			.setAlign('center')
			.setOrigin(0.5, 0)
			.setVisible(this.isHighScore)

		const scoreText = i18n
			.createTranslatedText(this, width / 2, 296, 'score', {
				score: this.score ?? 200800,
			})
			.setAlign('center')
			.setOrigin(0.5, 0)

		this.add
			.image(width / 2 - MARGIN / 2, 464, 'landing_page', 'heart_full.png')
			.setOrigin(1, 0)
		const heartCountdown1 = this.add
			.text(width / 2 - 1.5 * MARGIN, 556, `00:59:59`)
			.setOrigin(0.5, 0)
			.setVisible(false)
		this.add
			.image(width / 2 + MARGIN / 2, 464, 'landing_page', 'heart_empty.png')
			.setOrigin(0, 0)
		const heartCountdown2 = this.add
			.text(width / 2 + 1.5 * MARGIN, 556, `00:59:59`)
			.setOrigin(0.5, 0)
			.setVisible(true)

		// Received Booster dialog
		const receiveItemText = i18n
			.createTranslatedText(
				this,
				width / 2,
				heartCountdown2.y + 80,
				'receive_item',
			)
			.setAlign('center')
			.setOrigin(0.5, 0)
			
		this.add
			.graphics()
			.fillStyle(0xffffff, 1)
			.fillRoundedRect(96, receiveItemText.y + receiveItemText.height + 48, 528, 160, 20)
		const itemReceived = this.add
			.image(96 + MARGIN / 2, receiveItemText.y + receiveItemText.height + 48 + 80, 'bossAsset', boosterList[2])
			.setOrigin(0, 0.5)
		const itemDescriptionText = i18n
			.createTranslatedText(
				this,
				96 + itemReceived.width + MARGIN, receiveItemText.y + receiveItemText.height + 48 + 80,
				ItemDescription["scoreX2"],
			)
			.setOrigin(0, 0.5)

		// Restart button
		const restartButton = this.add
			.nineslice(width / 2, 900, 'end_game_scene', 'button_purple.png', 528, 96, 24, 24)
			.setOrigin(0.5, 0)
		restartButton.setInteractive()
		restartButton.on("pointerup", () => {
			this.scene.stop()
			i18n.destroyEmitter()
			this.scene.start("game")
		})
		const restartText = i18n
		.createTranslatedText(
			this,
			width / 2 + MARGIN / 2,
			900 + restartButton.height / 2,
			'restart',
		)
		.setAlign('center')
		.setOrigin(0.5, 0.5)
		this.add
			.image(width / 2  - restartText.width - 20, 900 + restartButton.height / 2, 'end_game_scene', 'logo_button_play again.png')
			.setOrigin(1, 0.5)

		// Back to home button
		const homeButton = this.add
			.nineslice(width / 2, 1018, 'end_game_scene', 'button_gray.png', 528, 96, 24, 24)
			.setOrigin(0.5, 0)
		homeButton.setInteractive()
		homeButton.on("pointerup", () => {
			this.scene.stop()
			i18n.destroyEmitter()
			this.scene.start("home")
		})
		const homeText = i18n
		.createTranslatedText(
			this,
			width / 2 + MARGIN / 2,
			height - 128 - MARGIN - 40,
			'home',
		)
		.setAlign('center')
		.setOrigin(0.5, 0.5)

		this.add
			.image(width / 2  - 2*MARGIN - 20 , height - 128 - MARGIN - 44, 'end_game_scene', 'logo_button_back to home.png')
			.setOrigin(1, 0.5)

		WebFont.load({
			google: {
				families: ['Mali', 'Jua'],
			},
			active: function () {
				const maliFontStyle = {
					fontFamily: 'Mali',
					fontStyle: 'bold',
				}

				const juaFontStyle = {
					fontFamily: 'Jua',
				}

				victoryText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('64px')
					.setStroke('#3F088C', 6)

				highScoreText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('32px')
					.setStroke('#3F088C', 6)

				scoreText
					.setStyle({
						...juaFontStyle,
						color: 'white',
					})
					.setFontSize('110px')
					.setStroke('#3F088C', 12)
				
				// TODO: Finalize itemDescription text style
				itemDescriptionText
					.setStyle({
					fontFamily: "Mali",
					color: 'black',
					})
					.setFontSize('24px')

				heartCountdown1
					.setStyle({
						...juaFontStyle,
						color: '#DD2D04',
					})
					.setFontSize('24px')
					.setStroke('white', 3)

				heartCountdown2
					.setStyle({
						...juaFontStyle,
						color: '#DD2D04',
					})
					.setFontSize('24px')
					.setStroke('white', 3)

				receiveItemText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('32px')
					.setStroke('#3F088C', 6)

				restartText.setStyle({
					...maliFontStyle,
					color: 'white',
				})
				.setFontSize('32px')
				.setStroke('#3F088C', 6)

				homeText.setStyle({
					...maliFontStyle,
					color: 'white',
				})
				.setFontSize('32px')
				.setStroke('#7A7367', 6)
			},
		})
	}
}
