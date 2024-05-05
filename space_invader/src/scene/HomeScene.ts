import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import { MARGIN, MEDIUM_FONT_SIZE } from 'config'
import SoundManager from 'component/sound/SoundManager'
import WebFont from 'webfontloader'

const Difficulty = {
	easy: "difficulty_easy",
	medium: "difficulty_medium",
	hard: "difficulty_hard",
}

export default class HomeScene extends Phaser.Scene {
	private bgm?: Phaser.Sound.BaseSound

	constructor() {
		super('home')
	}

	init({bgm}: {bgm:Phaser.Sound.BaseSound}) {
        this.bgm = bgm
        console.log(bgm)
    }

	preload() {
		this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)
		this.load.svg('mute', 'assets/icon/mute.svg')
		this.load.svg('unmute', 'assets/icon/unmute.svg')
	}

	create() {
		const { width, height } = this.scale
		// this.bgm = this.sound.add('bgm', { volume: 0.5, loop: true })
		// const soundManager = new SoundManager(this)
		// soundManager.init()
		// soundManager.play(this.bgm)

		this.add
			.tileSprite(0, 0, width, height, 'titleBackground')
			.setOrigin(0)
			.setScrollFactor(0, 0)
			.postFX.addBokeh(0.5, 10, 0)

		this.add.rectangle(0, 0, width, height, 0xffffff, 0.2).setOrigin(0, 0)

		// Level Progress
		const currentLevel = 1
		const levelText = this.add.text(MARGIN + 120, 1.5 * MARGIN, `LV.${currentLevel}`).setOrigin(0.5,0)
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
			.fillRoundedRect(width / 2, MARGIN, 336, 56, 28)
		this.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(width / 2, MARGIN, 336, 56, 30)
        // TODO: Choosing airflow
		const airFlowLevelText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width / 2 + MARGIN,
				MARGIN + 6,
				'home_airflow_level',
                {level: 600}
			)
			.setAlign('center')

		// Difficulty
		this.add
			.graphics()
			.fillStyle(0xffffff, 0.5)
			.fillRoundedRect(width / 2, 2 * MARGIN + 20, 336, 56, 28)
		this.add
			.graphics()
			.lineStyle(3, 0x57453b, 1)
			.strokeRoundedRect(width / 2, 2 * MARGIN + 20, 336, 56, 30)
        // TODO: Choosing difficulty
		const difficultyText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width / 2 + MARGIN,
				2 * MARGIN + 26,
				`${Difficulty['medium']}`,
			)
			.setAlign('center')

		this.add.image(width / 2, height / 2, 'logo').setOrigin(0.5, 1)

		const reminderText = I18nSingleton.getInstance()
			.createTranslatedText(this, width / 2, height / 2, 'home_reminder')
			.setAlign('center')
			.setOrigin(0.5, 0)

		// Play Button
		this.add
			.graphics()
			.fillStyle(0x99441a, 1)
			.fillRoundedRect(144, height / 2 + 3 * MARGIN, 432, 170, 40)
		this.add
			.graphics()
			.fillStyle(0xd35e24, 1)
			.fillRoundedRect(144, height / 2 + 3 * MARGIN, 432, 160, 40)
		const startText = I18nSingleton.getInstance()
			.createTranslatedText(this, 420, height / 2 + 185, 'home_start_game')
			.setAlign('center')
			.setOrigin(0.5, 0)
		this.add
			.image(160, height / 2 + 160, 'ui', 'play.png')
			.setOrigin(0, 0)
			.setScale(1.5)
		const playButton = this.add
			.rectangle(144, height / 2 + 3 * MARGIN, 432, 160, 0xffffff, 0)
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
			.fillRoundedRect(144, height / 2 + 7 * MARGIN, 128, 138, 40)
		this.add
			.graphics()
			.fillStyle(0xd4cfc5, 1)
			.fillRoundedRect(144, height / 2 + 7 * MARGIN, 128, 128, 40)
		const rankingText = I18nSingleton.getInstance()
			.createTranslatedText(this, 154, height / 2 + 9 * MARGIN, 'home_ranking')
			.setAlign('center')
			.setOrigin(0, 0.5)
		const rankingButton = this.add
			.rectangle(144, height / 2 + 7 * MARGIN, 128, 128, 0xffffff, 0)
			.setOrigin(0, 0)
		rankingButton.setInteractive()
		rankingButton.on('pointerdown', () => {
            // TODO: Link to ranking
			console.log('ranking')
		})

		// Reward Button
		this.add
			.graphics()
			.fillStyle(0xbeb6a7, 1)
			.fillRoundedRect(296, height / 2 + 7 * MARGIN, 128, 138, 40)
		this.add
			.graphics()
			.fillStyle(0xd4cfc5, 1)
			.fillRoundedRect(296, height / 2 + 7 * MARGIN, 128, 128, 40)
		const rewardText = I18nSingleton.getInstance()
			.createTranslatedText(this, 306, height / 2 + 9 * MARGIN, 'home_reward')
			.setAlign('center')
			.setOrigin(0, 0.5)
		const rewardButton = this.add
			.rectangle(296, height / 2 + 7 * MARGIN, 128, 128, 0xffffff, 0)
			.setOrigin(0, 0)
		rewardButton.setInteractive()
		rewardButton.on('pointerdown', () => {
            // TODO: Link to reward
			console.log('reward')
		})

		// Setting Button
		this.add
			.graphics()
			.fillStyle(0xbeb6a7, 1)
			.fillRoundedRect(448, height / 2 + 7 * MARGIN, 128, 138, 40)
		this.add
			.graphics()
			.fillStyle(0xd4cfc5, 1)
			.fillRoundedRect(448, height / 2 + 7 * MARGIN, 128, 128, 40)
		const settingText = I18nSingleton.getInstance()
			.createTranslatedText(this, 465, height / 2 + 9 * MARGIN, 'home_setting')
			.setAlign('center')
			.setOrigin(0, 0.5)
		const settingButton = this.add
			.rectangle(448, height / 2 + 7 * MARGIN, 128, 128, 0xffffff, 0)
			.setOrigin(0, 0)
		settingButton.setInteractive()
		settingButton.on('pointerdown', () => {
            // TODO: Link to setting
			console.log('setting')
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
		new SoundManager(this)
			.createSoundToggle(60, height - 3 * MARGIN + 10)
			.setOrigin(0, 0)

		// Manual Button
		this.add
			.graphics()
			.fillStyle(0x99441a, 1)
			.fillRoundedRect(width - MARGIN - 160, height - 3 * MARGIN, 200, 106, 20)
		this.add
			.graphics()
			.fillStyle(0xd35e24, 1)
			.fillRoundedRect(width - MARGIN - 160, height - 3 * MARGIN, 200, 96, 20)
		const manualText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width - 2 * MARGIN ,
				height - 2 * MARGIN,
				'home_manual',
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)
		const manualButton = this.add
			.rectangle(
				width - MARGIN - 160,
				height - 3 * MARGIN,
				128,
				128,
				0xffffff,
				0,
			)
			.setOrigin(0, 0)
		manualButton.setInteractive()
		manualButton.on('pointerdown', () => {
            // TODO: link to manual
			console.log('manual')
		})

		// const self = this
		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const homeSceneStyle = {
					fontFamily: 'Mali',
                    fontStyle: "bold"
				}

                levelText
					.setStyle({
						...homeSceneStyle,
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)
					.setStroke('#9E461B', 6)

				airFlowLevelText
					.setStyle({
						...homeSceneStyle,
						color: '#57453B',
					})
					.setFontSize('28px')

				difficultyText
					.setStyle({
						...homeSceneStyle,
						color: '#57453B',
					})
					.setFontSize('28px')

				reminderText
					.setStyle({
						...homeSceneStyle,
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)
					.setStroke('#57453B', 12)

				startText
					.setStyle({
						...homeSceneStyle,
						color: 'white',
					})
					.setFontSize('6em')
					.setStroke('#9E461B', 3)

				rankingText
					.setStyle({
						...homeSceneStyle,
						color: '#7A7367',
					})
					.setFontSize('2.8em')
					.setStroke('white', 5)

				rewardText
					.setStyle({
						...homeSceneStyle,
						color: '#7A7367',
					})
					.setFontSize('2.8em')
					.setStroke('white', 5)

				settingText
					.setStyle({
						...homeSceneStyle,
						color: '#7A7367',
					})
					.setFontSize('2.8em')
					.setStroke('white', 5)

				manualText
					.setStyle({
						...homeSceneStyle,
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)
					.setStroke('#9E461B', 5)
			},
		})
	}
}
