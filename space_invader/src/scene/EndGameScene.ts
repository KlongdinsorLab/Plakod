import Phaser from 'phaser'
import { MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import WebFont from 'webfontloader'
import Heart from 'component/ui/Heart'
import RewardDialog from 'component/ui/RewardDialog'



export default class EndGameScene extends Phaser.Scene {
	private score!: number
	private isHighScore = true
	private heart1!: Heart
	private heart2!: Heart
	private rewardDialog!: RewardDialog

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

		this.heart1 = new Heart(this, width / 2 - 1.5 * MARGIN, 464, 1)
		this.heart2 = new Heart(this, width / 2 + 1.5 * MARGIN, 464, 2)

		this.rewardDialog = new RewardDialog(this)

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

		const self = this
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

				self.rewardDialog.initFontStyle()
				self.heart1.initFontStyle()
				self.heart2.initFontStyle()

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
