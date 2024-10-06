/* eslint-disable @typescript-eslint/no-this-alias */
import { Meteor } from 'component/enemy/Meteor'
import Player from 'component/player/Player'
import SoundManager from 'component/sound/SoundManager'
import InhaleGaugeRegistry from 'component/ui/InhaleGaugeRegistry'
import Menu from 'component/ui/Menu'
import ReloadCount from 'component/ui/ReloadCount'
import Score from 'component/ui/Score'
import {
	DARK_BROWN,
	DARK_ORANGE,
	DARK_PURPLE,
	DESTROY_METEOR_SCORE,
	HIT_METEOR_SCORE,
	LARGE_FONT_SIZE,
	MARGIN,
	MEDIUM_FONT_SIZE,
	TUTORIAL_DELAY_MS,
} from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import Phaser from 'phaser'
import WebFont from 'webfontloader'

export type Character = {
	meteor: Meteor
	player: Player
	gameLayer: Phaser.GameObjects.Layer
}

export default class TutorialCharacterScene extends Phaser.Scene {
	private player!: Player
	private score!: Score
	private reloadCount!: ReloadCount
	private gaugeRegistry!: InhaleGaugeRegistry
	private menu!: Menu

	constructor() {
		super('tutorial character')
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)
		this.load.atlas(
			'player',
			'assets/character/player/mc1_spritesheet.png',
			'assets/character/player/mc1_spritesheet.json',
		)

		this.load.image('background', 'assets/background/background.jpg')

		this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)
		this.load.image('obstacle', 'assets/character/enemy/obstacle.png')
		this.load.audio('chargingSound', 'sound/futuristic-beam-81215.mp3')
		this.load.audio('chargedSound', 'sound/sci-fi-charge-up-37395.mp3')

		this.load.atlas(
			'inGameUI',
			'assets/ui/ingameui_spritesheet.png',
			'assets/ui/ingameui_spritesheet.json',
		)
	}

	create() {
		const soundManager = new SoundManager(this)
		const isMute = soundManager.isMute()
		const tutorialSound = this.sound.addAudioSprite('tutorialWarmupSound')
		tutorialSound.play('tutorial-evade')

		const { width, height } = this.scale

		this.add
			.tileSprite(0, 0, width, height, 'background')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		this.add.rectangle(0, 0, width, height, 0, 0.5).setOrigin(0, 0)

		const tutorialLayer = this.add.layer()

		const i18n = I18nSingleton.getInstance()

		const meteor = this.physics.add.image(
			width / 2 - 3 * MARGIN,
			6 * MARGIN,
			'obstacle',
		)
		tutorialLayer.add(meteor)

		const meteorBoxWidth = 400
		const meteorBox = this.add
			.nineslice(
				meteor.x + MARGIN,
				meteor.y,
				'ui',
				'side purple bubble.png',
				meteorBoxWidth,
				200,
				56,
				36,
				36,
				112,
			)
			.setOrigin(0, 0.5)

		const meteorTitle = i18n
			.createTranslatedText(
				this,
				meteor.x + meteor.width + 2 * MARGIN,
				meteor.y - meteor.height / 2,
				'tutorial_enemy_title',
			)
			.setColor(`#${DARK_PURPLE.toString(16)}`)
			.setFontSize(LARGE_FONT_SIZE)
			.setOrigin(0, 0.5)

		const meteorDescription = i18n
			.createTranslatedText(
				this,
				meteor.x + meteor.width - 4,
				meteor.y - meteor.height / 2 + MARGIN / 2,
				'tutorial_enemy_description',
				{ score: HIT_METEOR_SCORE },
			)
			.setFontSize(MEDIUM_FONT_SIZE)
			.setWordWrapWidth(width / 2)
			.setColor(`#${DARK_PURPLE.toString(16)}`)
			.setOrigin(0, 0)

		this.score = new Score(this)
		this.reloadCount = new ReloadCount(this, width / 2, MARGIN)
		this.reloadCount.getBody().setOrigin(0.5, 0)
		this.menu = new Menu(this)

		this.gaugeRegistry = new InhaleGaugeRegistry(this)
		this.gaugeRegistry.createbyDivision(1)
		this.gaugeRegistry?.get(0).setVisible(false)

		this.player = new Player(this, tutorialLayer)
		const player = this.player.getBody()
		tutorialLayer.add(player)

		const playerBox = this.add
			.nineslice(
				player.x,
				player.y - player.height / 2,
				'ui',
				'orange bubble.png',
				480,
				240,
				36,
				112,
				36,
				56,
			)
			.setOrigin(0.5, 1)

		const playerTitle = i18n
			.createTranslatedText(
				this,
				playerBox.x,
				playerBox.y - playerBox.height + MARGIN / 2,
				'tutorial_player_title',
			)
			.setColor(`#${DARK_ORANGE.toString(16)}`)
			.setFontSize(LARGE_FONT_SIZE)
			.setOrigin(0.5, 0)

		const playerDescription = i18n
			.createTranslatedText(
				this,
				playerTitle.x,
				playerTitle.y + playerTitle.height,
				'tutorial_player_description',
				{ score: DESTROY_METEOR_SCORE },
			)
			.setWordWrapWidth(playerBox.width + MARGIN)
			.setColor(`#${DARK_ORANGE.toString(16)}`)
			.setFontSize(MEDIUM_FONT_SIZE)
			.setOrigin(0.5, 0)

		const continueText = i18n
			.createTranslatedText(this, width / 2, height / 2, 'tutorial_continue')
			.setFontSize(MEDIUM_FONT_SIZE)
			.setOrigin(0.5, 0)
			.setAlpha(0)

		const continueImage = this.add
			.image(
				width / 2,
				height / 2 - continueText.height - MARGIN / 2,
				'ui',
				'touch.png',
			)
			.setAlpha(0)

		this.tweens.add({
			targets: continueText,
			alpha: 1,
			duration: TUTORIAL_DELAY_MS,
			repeat: 0,
			ease: 'sine.in',
		})

		this.tweens.add({
			targets: continueImage,
			alpha: 1,
			duration: TUTORIAL_DELAY_MS,
			repeat: 0,
			ease: 'sine.in',
		})

		const pressAnim = this.tweens.add({
			targets: continueImage,
			scale: 1.25,
			duration: 1000,
			yoyo: true,
			repeat: -1,
			ease: 'sine.inOut',
		})
		pressAnim.pause()

		WebFont.load({
			google: {
				families: ['Mali', 'Jua'],
			},
			active: function () {
				const tutorialUiStyle = {
					fontFamily: 'Mali',
				}
				const menuUiStyle = {
					fontFamily: 'Jua',
					color: `#${DARK_BROWN.toString(16)}`,
				}

				self.score.getBody().setStyle(menuUiStyle)
				self.reloadCount.getBody().setStyle(menuUiStyle)
				meteorTitle.setStyle(tutorialUiStyle)
				meteorDescription.setStyle(tutorialUiStyle)
				playerTitle.setStyle(tutorialUiStyle)
				playerDescription.setStyle(tutorialUiStyle)
				continueText.setStyle(tutorialUiStyle)
			},
		})

		const self = this
		setTimeout(() => {
			pressAnim.play()
			self.input.once(
				'pointerdown',
				() => {
					self.scene.launch('tutorial HUD', {
						score: this.score,
						gauge: this.gaugeRegistry?.get(0),
						menu: this.menu,
						reloadCount: this.reloadCount,
						player: this.player,
					})
					isMute ? soundManager.mute() : soundManager.unmute()
					i18n.removeAllListeners(self)
					playerBox.setVisible(false)
					playerDescription.setVisible(false)
					playerTitle.setVisible(false)
					meteorBox.setVisible(false)
					meteorDescription.setVisible(false)
					meteorTitle.setVisible(false)
					meteor.setVisible(false)
					continueImage.setVisible(false)
					continueText.setVisible(false)
					pressAnim.remove()
				},
				this,
			)
		}, 2000)
	}
}
