import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import {
	DARK_BROWN,
	DARK_ORANGE,
	LARGE_FONT_SIZE,
	MARGIN,
	MEDIUM_FONT_SIZE,
	MODAL_BACKGROUND_COLOR,
} from 'config'
import SoundManager from 'component/sound/SoundManager'
import TimeService from 'services/timeService'
import { boosters } from './booster/RedeemScene'
import WebFont from 'webfontloader'
import SoundToggle from 'component/ui/home/SoundToggle'

export type Menu = {
	menu: Phaser.GameObjects.Image
}
export default class PauseScene extends Phaser.Scene {
	private menu!: Phaser.GameObjects.Image
	private sceneName!: string
	private timeService!: TimeService
	private playCount!: number
	private subSceneKeys!: string[]

	constructor() {
		super('pause')
	}

	init({
		menu,
		sceneName,
		subSceneKeys,
	}: {
		menu: Phaser.GameObjects.Image
		sceneName: string
		subSceneKeys: string[]
	}) {
		this.menu = menu
		this.sceneName = sceneName
		if (subSceneKeys) this.subSceneKeys = subSceneKeys
		else this.subSceneKeys = []
	}

	preload() {
		this.load.svg('mute', 'assets/icon/mute.svg')
		this.load.svg('unmute', 'assets/icon/unmute.svg')
		this.load.atlas(
			'button',
			'assets/ui/button_spritesheet.png',
			'assets/ui/button_spritesheet.json',
		)
		this.load.atlas(
			'icon',
			'assets/icon/icon_spritesheet.png',
			'assets/icon/icon_spritesheet.json',
		)
	}

	create() {
		const soundManager = new SoundManager(this)
		soundManager.pauseAll()
		this.timeService = new TimeService()
		// TODO: call api
		this.playCount = Number(localStorage.getItem('playCount') ?? '')

		const { width, height } = this.scale

		this.add.rectangle(0, 0, width, height, 0x000000, 0.75).setOrigin(0, 0)

		const i18n = I18nSingleton.getInstance()

		const MENU_HEAD_HEIGHT = 136
		const MENU_WIDTH = 576
		const MENU_HEIGHT = 576

		const menuHead = this.add.graphics()
		menuHead.fillStyle(DARK_ORANGE, 1)
		menuHead.fillRoundedRect(
			width / 10,
			height / 4,
			MENU_WIDTH,
			MENU_HEAD_HEIGHT,
			{
				tl: 40,
				tr: 40,
				bl: 0,
				br: 0,
			},
		)

		const menuModal = this.add.graphics()
		menuModal.fillStyle(MODAL_BACKGROUND_COLOR, 1)
		menuModal.fillRoundedRect(
			width / 10,
			height / 4 + MENU_HEAD_HEIGHT,
			MENU_WIDTH,
			MENU_HEIGHT,
			{
				tl: 0,
				tr: 0,
				bl: 40,
				br: 40,
			},
		)

		const pauseText = i18n
			.createTranslatedText(
				this,
				width / 2,
				height / 4 + MENU_HEAD_HEIGHT / 2,
				'pause',
			)
			.setFontSize(LARGE_FONT_SIZE)
			.setOrigin(0.5, 0.5)

		const soundToggle = new SoundToggle(
			this,
			width / 2,
			height / 4 + MENU_HEAD_HEIGHT + (5 * MARGIN) / 3,
		).getBody()

		const reminderText1 = i18n
			.createTranslatedText(
				this,
				width / 2,
				soundToggle.y + soundToggle.height / 2 + MARGIN + 8,
				'pause_reminder_text1',
			)
			.setFontSize(LARGE_FONT_SIZE)
			.setOrigin(0.5, 0.5)

		const reminderText2 = i18n
			.createTranslatedText(
				this,
				width / 2,
				reminderText1.y + MARGIN,
				'pause_reminder_text2',
			)
			.setFontSize(LARGE_FONT_SIZE)
			.setOrigin(0.5, 0.5)

		const resumeButton = this.add
			.nineslice(
				width / 2,
				reminderText2.y + reminderText2.height / 2 + (MARGIN * 2) / 3,
				'button',
				'button_red.png',
				480,
				106,
				32,
				32,
				64,
				64,
			)
			.setOrigin(0.5, 0)
		const resumeText = i18n
			.createTranslatedText(
				this,
				resumeButton.x,
				resumeButton.y + resumeButton.height / 2,
				'resume',
			)
			.setFontSize(MEDIUM_FONT_SIZE)
			.setOrigin(0.5, 0.5)
		resumeButton.setInteractive()
		resumeButton.on('pointerup', () => {
			soundManager.resumeAll()
			this.menu.setTexture('ui', 'pause.png')
			this.resumeAllScenes()
			this.scene.stop()
		})

		const homeButton = this.add
			.nineslice(
				width / 2,
				resumeButton.y + resumeButton.height + MARGIN / 2,
				'button',
				'button_gray.png',
				480,
				106,
				32,
				32,
				64,
				64,
			)
			.setOrigin(0.5, 0)

		const homeIcon = this.add
			.image(
				180,
				homeButton.y + homeButton.height / 2 - 4,
				'icon',
				'icon_backtohome.png',
			)
			.setOrigin(0, 0.5)

		const homeText = i18n
			.createTranslatedText(
				this,
				homeIcon.x + homeIcon.width + MARGIN / 4,
				homeButton.y + homeButton.height / 2,
				'home',
			)
			.setFontSize(MEDIUM_FONT_SIZE)
			.setOrigin(0, 0.5)
		homeButton.setInteractive()
		homeButton.on('pointerup', () => {
			this.stopAllScenes()
			this.scene.stop()
			i18n.destroyEmitter()
			this.scene.start('title')
		})

		WebFont.load({
			google: {
				families: ['Mali:500,600,700'],
			},
			active: () => {
				pauseText
					.setStyle({
						fontFamily: 'Mali',
						fontWeight: 600,
						fontStyle: 'bold',
						color: 'white',
					})
					.setFontSize(48)
					.setStroke('#9E461B', 12)
					.setLineSpacing(16)

				reminderText1
					.setStyle({
						fontFamily: 'Mali',
						fontWeight: 600,
						fontStyle: 'bold',
						color: '#57453B',
					})
					.setFontSize(32)
					.setLineSpacing(32)

				reminderText2
					.setStyle({
						fontFamily: 'Mali',
						fontWeight: 600,
						fontStyle: 'bold',
						color: '#D35E24',
					})
					.setFontSize(32)
					.setLineSpacing(32)

				resumeText
					.setStyle({
						fontFamily: 'Mali',
						fontWeight: 600,
						fontStyle: 'bold',
						color: 'white',
					})
					.setFontSize(32)
					.setStroke('#9E461B', 6)
					.setLineSpacing(16)

				homeText
					.setStyle({
						fontFamily: 'Mali',
						fontWeight: 600,
						fontStyle: 'bold',
						color: 'white',
					})
					.setFontSize(32)
					.setStroke('#7A7367', 6)
					.setLineSpacing(16)
			},
		})
	}

	stopAllScenes(): void {
		for (let i = 0; i < this.subSceneKeys.length; i++)
			this.scene.stop(this.subSceneKeys[i])
		this.scene.stop(this.sceneName)
	}

	resumeAllScenes(): void {
		this.scene.resume(this.sceneName)
		for (let i = 0; i < this.subSceneKeys.length; i++) {
			if (this.scene.isPaused(this.subSceneKeys[i])) {
				this.scene.resume(this.subSceneKeys[i])
			}
		}
	}
}
