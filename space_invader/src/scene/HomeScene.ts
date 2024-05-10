import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import { MARGIN, MEDIUM_FONT_SIZE } from 'config'
import SoundManager from 'component/sound/SoundManager'
import WebFont from 'webfontloader'

const Difficulty = {
	easy: 'difficulty_easy',
	medium: 'difficulty_medium',
	hard: 'difficulty_hard',
}

const ReminderText = {
	firstRound: "home_reminder_first_play",
	playTommorow: "home_reminder_play_tomorrow",
	heartEmpty: "home_reminder_empty_heart",
}

export default class HomeScene extends Phaser.Scene {
	private bgm?: Phaser.Sound.BaseSound

	constructor() {
		super('home')
	}

	init({ bgm }: { bgm: Phaser.Sound.BaseSound }) {
		this.bgm = bgm
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
		this.load.svg('mute', 'assets/icon/mute.svg')
		this.load.svg('unmute', 'assets/icon/unmute.svg')
	}

	create() {
		const { width, height } = this.scale

		this.add
			.tileSprite(0, 0, width, height, 'landing_page_bg')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		// Level Progress
		const currentLevel = 10

		this.add
			.image(MARGIN + 120, 40, 'landing_page', 'logo_level.png')
			.setOrigin(0.5, 0)
		const levelText = this.add
			.text(MARGIN + 120, 72, `${currentLevel}`)
			.setOrigin(0.5, 0.5)
		this.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(MARGIN, 2 * MARGIN + 40, 240, 24, 10)
		this.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(MARGIN, 2 * MARGIN + 40, 240, 24, 32)

		// Airflow level
		this.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(336, 40, 336, 56, 28)
		this.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(336, 40, 336, 56, 30)
		this.add.image(336, 40, 'landing_page', 'bar_airflow.png').setOrigin(0.5, 0)
		// TODO: Choosing airflow
		const airFlowLevelText = I18nSingleton.getInstance()
			.createTranslatedText(this, 336 + 28, 40, 'home_airflow_level', {
				level: 600,
			})
			.setAlign('center')

		// Difficulty
		this.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(336, 40 + 56 + 8, 336, 56, 28)
		this.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(336, 40 + 56 + 8, 336, 56, 30)
		this.add
			.image(336, 40 + 56 + 8, 'landing_page', 'bar_difficulty.png')
			.setOrigin(0.5, 0)
		// TODO: Choosing difficulty
		const difficultyText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				336 + 336 / 2,
				40 + 56 + 8 + 6 + 24,
				`${Difficulty['easy']}`,
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		this.add
			.image(width / 2, 216, 'landing_page', 'logo_breathbuddy.png')
			.setOrigin(0.5, 0)
		
		// Heart
		this.add
			.image(
				width / 2 - MARGIN / 2,
				216 + 224 + 24,
				'landing_page',
				'heart_full.png',
			)
			.setOrigin(1, 0)
		const heartCountdown1 = this.add
			.text(width / 2 - 1.5 * MARGIN, 216 + 224 + 24 + 84 + 8, `00:59:59`)
			.setOrigin(0.5, 0)
			.setVisible(false)
		this.add
			.image(
				width / 2 + MARGIN / 2,
				216 + 224 + 24,
				'landing_page',
				'heart_empty.png',
			)
			.setOrigin(0, 0)
		const heartCountdown2 = this.add
			.text(width / 2 + 1.5 * MARGIN, 216 + 224 + 24 + 84 + 8, `00:59:59`)
			.setOrigin(0.5, 0)
			.setVisible(true)

		// Reminder
		const reminderText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width / 2,
				216 + 224 + 24 + 84 + 8 + 24 + 48,
				ReminderText['firstRound'],
			)
			.setAlign('center')
			.setOrigin(0.5, 0)

		// Play Button
		this.add
			.graphics()
			.fillStyle(0x99441a, 1)
			.fillRoundedRect(144, 748 + 24, 432, 170, 40)
		this.add
			.graphics()
			.fillStyle(0xd35e24, 1)
			.fillRoundedRect(144, 748 + 24, 432, 160, 40)
		const startText = I18nSingleton.getInstance()
			.createTranslatedText(this, 420, 748 + 24 + 80, 'home_start_game')
			.setAlign('center')
			.setOrigin(0.5, 0.5)
		this.add
			.image(240, 748 + 24 + 80, 'landing_page', 'logo_button_play.png')
			.setOrigin(0.5, 0.5)
		const playButton = this.add
			.rectangle(144, 748 + 24, 432, 160, 0xffffff, 0)
			.setOrigin(0, 0)
		playButton.setInteractive()
		playButton.on('pointerdown', () => {
			this.scene.start('game')
			new SoundManager(this).stop(this.bgm!)
		})

		// Ranking Button
		this.add
			.graphics()
			.fillStyle(0xbeb6a7, 1)
			.fillRoundedRect(144, 966, 128, 138, 20)
		this.add
			.graphics()
			.fillStyle(0xd4cfc5, 1)
			.fillRoundedRect(144, 966, 128, 128, 20)
		this.add
			.image(144 + 64, 966 + 48, 'landing_page', 'logo_button_ranking.png')
			.setOrigin(0.5, 0.5)
		const rankingText = I18nSingleton.getInstance()
			.createTranslatedText(this, 144 + 64, 966 + 48 + 24, 'home_ranking')
			.setAlign('center')
			.setOrigin(0.5, 0)
		const rankingButton = this.add
			.rectangle(144, 966, 128, 128, 0xffffff, 0)
			.setOrigin(0, 0)
		rankingButton.setInteractive()
		rankingButton.on('pointerdown', () => {
			// TODO: Link to ranking
		})

		// Reward Button
		this.add
			.graphics()
			.fillStyle(0xbeb6a7, 1)
			.fillRoundedRect(296, 966, 128, 138, 20)
		this.add
			.graphics()
			.fillStyle(0xd4cfc5, 1)
			.fillRoundedRect(296, 966, 128, 128, 20)
		this.add
			.image(296 + 64, 966 + 48, 'landing_page', 'logo_button_achievement.png')
			.setOrigin(0.5, 0.5)
		const achievementText = I18nSingleton.getInstance()
			.createTranslatedText(this, 296 + 64, 966 + 48 + 24, 'home_achievement')
			.setAlign('center')
			.setOrigin(0.5, 0)
		const achievementButton = this.add
			.rectangle(296, 966, 128, 128, 0xffffff, 0)
			.setOrigin(0, 0)
		achievementButton.setInteractive()
		achievementButton.on('pointerdown', () => {
			// TODO: Link to achievement
		})

		// Setting Button
		this.add
			.graphics()
			.fillStyle(0xbeb6a7, 1)
			.fillRoundedRect(448, 966, 128, 138, 20)
		this.add
			.graphics()
			.fillStyle(0xd4cfc5, 1)
			.fillRoundedRect(448, 966, 128, 128, 20)
		this.add
			.image(448 + 64, 966 + 48, 'landing_page', 'logo_button_setting.png')
			.setOrigin(0.5, 0.5)
		const settingText = I18nSingleton.getInstance()
			.createTranslatedText(this, 448 + 64, 966 + 48 + 24, 'home_setting')
			.setAlign('center')
			.setOrigin(0.5, 0)
		const settingButton = this.add
			.rectangle(448, 966, 128, 128, 0xffffff, 0)
			.setOrigin(0, 0)
		settingButton.setInteractive()
		settingButton.on('pointerdown', () => {
			// TODO: Link to setting
		})

		// Sound Toggle
		this.add
			.graphics()
			.fillStyle(0x99441a, 1)
			.fillRoundedRect(MARGIN, height - 3 * MARGIN, 96, 106, 20)
		this.add
			.graphics()
			.fillStyle(0xd35e24, 1)
			.fillRoundedRect(MARGIN, height - 3 * MARGIN, 96, 96, 20)

		const soundToggle = this.add
			.rectangle(MARGIN, height - 3 * MARGIN, 96, 96, 0xffffff, 0)
			.setOrigin(0, 0)
		const volumeLogo = this.add
			.image(
				2 * MARGIN,
				height - 2 * MARGIN,
				'landing_page',
				this.sound.mute ? 'logo_volumn_off.png' : 'logo_volumn_on.png',
			)
			.setOrigin(0.5, 0.5)

		soundToggle.setInteractive()
		soundToggle.on('pointerup', () => {
			this.sound.mute = !this.sound.mute
			localStorage.setItem('mute', !this.sound.mute ? 'true' : '')
			volumeLogo.setTexture(
				'landing_page',
				this.sound.mute ? 'logo_volumn_on.png' : 'logo_volumn_off.png',
			)
		})

		// instruction Button
		this.add
			.graphics()
			.fillStyle(0x99441a, 1)
			.fillRoundedRect(width - MARGIN - 160, height - 3 * MARGIN, 160, 106, 20)
		this.add
			.graphics()
			.fillStyle(0xd35e24, 1)
			.fillRoundedRect(width - MARGIN - 160, height - 3 * MARGIN, 160, 96, 20)
		this.add
			.image(
				width - MARGIN - 160 + 20,
				height - 3 * MARGIN + 24,
				'landing_page',
				'logo_button_instruction.png',
			)
			.setOrigin(0, 0)
		const instructionText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width - 160 + MARGIN + 8,
				height - 2 * MARGIN,
				'home_instruction',
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)
		const instructionButton = this.add
			.rectangle(
				width - MARGIN - 160,
				height - 3 * MARGIN,
				128,
				128,
				0xffffff,
				0,
			)
			.setOrigin(0, 0)
		instructionButton.setInteractive()
		instructionButton.on('pointerdown', () => {
			// TODO: link to instruction
		})

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

				levelText
					.setStyle({
						...juaFontStyle,
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)

				airFlowLevelText
					.setStyle({
						...maliFontStyle,
						color: '#57453B',
					})
					.setFontSize('32px')
					.setStroke('white', 3)

				difficultyText
					.setStyle({
						...maliFontStyle,
						color: '#57453B',
					})
					.setFontSize('32px')

				reminderText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)
					.setStroke('#57453B', 12)

				startText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('64px')
					.setStroke('#9E461B', 3)

				rankingText
					.setStyle({
						...maliFontStyle,
						color: '#7A7367',
					})
					.setFontSize('30px')
					.setStroke('white', 5)

				achievementText
					.setStyle({
						...maliFontStyle,
						color: '#7A7367',
					})
					.setFontSize('30px')
					.setStroke('white', 5)

				settingText
					.setStyle({
						...maliFontStyle,
						color: '#7A7367',
					})
					.setFontSize('30px')
					.setStroke('white', 5)

				instructionText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize('30px')
					.setStroke('#9E461B', 3)

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
			},
		})
	}
}
