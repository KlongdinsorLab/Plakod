import Phaser from 'phaser'
import { MARGIN, VAS_COUNT, MAX_PLAYED } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import WebFont from 'webfontloader'
import Heart from 'component/ui/Heart'
import RewardDialog from 'component/ui/RewardDialog'
import RestartButton from 'component/ui/Button/RestartButton'
import HomeButton from 'component/ui/Button/HomeButton'
import vas from 'component/ui/Vas'

export default class EndGameScene extends Phaser.Scene {
	private score!: number
	private isHighScore = true
	private heart1!: Heart
	private heart2!: Heart
	private isHeartEmpty!: boolean
	private rewardDialog!: RewardDialog
	private restartButton!: RestartButton
	private homeButton!: HomeButton
	//private playCount!: number
	private victoryText!: Phaser.GameObjects.Text
	private highScoreText!: Phaser.GameObjects.Text
	private scoreText!: Phaser.GameObjects.Text
	private completeText!: Phaser.GameObjects.Text

	private vas!: vas

	private playerJson = {"totalPlayed" : 20, "todayPlayed" : 9}

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

		this.load.atlas(
			'heart_spritesheet',
			'assets/heart_spritesheet/heart_spritesheet.png',
			'assets/heart_spritesheet/heart_spritesheet.json'
		)

		this.load.atlas(
			'vas',
			'assets/vas/vas_spritesheet.png',
			'assets/vas/vas_spritesheet.json'
		)

		this.load.atlas(
			'button',
			'assets/button/button_spritesheet.png',
			'assets/button/button_spritesheet.json'
		)
	}

	create() {
		const { width, height } = this.scale
		const i18n = I18nSingleton.getInstance()
		// TODO: call api
		
		//this.playCount = Number(localStorage.getItem('playCount') ?? '')
		this.add
			.tileSprite(0, 0, width, height, 'end_game_scene_bg')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		this.add
			.image(width / 2, 96, 'end_game_scene', 'heading_victory.png')
			.setOrigin(0.5, 0)

		this.victoryText = i18n
			.createTranslatedText(this, width / 2, 148, 'victory')
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		this.highScoreText = i18n
			.createTranslatedText(this, width / 2, 248, 'high_score')
			.setAlign('center')
			.setOrigin(0.5, 0)
			.setVisible(this.isHighScore)

		this.scoreText = i18n
			.createTranslatedText(this, width / 2, 296, 'score', {
				score: this.score ?? 200800,
			})
			.setAlign('center')
			.setOrigin(0.5, 0)

		this.completeText = i18n
			.createTranslatedText(this, width / 2, 608, 'endgame_complete')
			.setAlign('center')
			.setOrigin(0.5, 0)
			.setVisible(false)

		this.heart1 = new Heart(this, width / 2 + 1.5 * MARGIN, 464, 1)
		this.heart2 = new Heart(this, width / 2 - 1.5 * MARGIN, 464, 2)
		this.isHeartEmpty = !this.heart1.getIsRecharged() && !this.heart2.getIsRecharged()
		this.rewardDialog = new RewardDialog(this)

		this.restartButton = new RestartButton(this)
		this.homeButton = new HomeButton(this)

		if(this.playerJson.totalPlayed % VAS_COUNT == 0){
			this.homeButton.disable()
			this.homeButton.hide()
			this.restartButton.disable()
			this.restartButton.hide()
			this.rewardDialog.hide()
			this.completeText.setVisible(false)

			this.heart1.getBody().setVisible(false)
			this.heart2.getBody().setVisible(false)
			
			this.vas = new vas(this)
		}

		if(this.isHeartEmpty){
			this.restartButton.hide()
		}

		

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
				self.vas.initFontStyle()
				self.rewardDialog.initFontStyle()
				self.heart1.initFontStyle()
				self.heart2.initFontStyle()
				self.restartButton.initFontStyle()
				self.homeButton.initFontStyle()

				self.victoryText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('64px')
					.setStroke('#3F088C', 6)

				self.highScoreText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('32px')
					.setStroke('#3F088C', 6)

				self.scoreText
					.setStyle({
						...juaFontStyle,
						color: 'white',
					})
					.setFontSize('110px')
					.setStroke('#3F088C', 12)

				self.completeText
					.setStyle({
						...maliFontStyle,
						color: '#DD2D04',
					})
					.setFontSize('30px')
					.setStroke('white', 6)
			},
		})
	}

	update(_: number, __: number): void {
		this.isHeartEmpty = !this.heart1.getIsRecharged() && !this.heart2.getIsRecharged()
		if(!this.isHeartEmpty){
			this.restartButton.show()
		}
		if(this.vas.getIsCompleteVas()){
			this.ShowUI();
		}

	}

	ShowUI():void{ 
		this.isHeartEmpty = !this.heart1.getIsRecharged() && !this.heart2.getIsRecharged()
		if(!this.isHeartEmpty && this.playerJson.todayPlayed < MAX_PLAYED){
			this.restartButton.show()
		}else{
			this.restartButton.hide()
		}

		if(this.playerJson.todayPlayed == 10){
			this.completeText.setVisible(true)
			this.rewardDialog.hide()
		}else{
			this.rewardDialog.show()
		}
		this.homeButton.show()
		
		this.heart1.getBody().setVisible(true)
		this.heart2.getBody().setVisible(true)
	}
}
