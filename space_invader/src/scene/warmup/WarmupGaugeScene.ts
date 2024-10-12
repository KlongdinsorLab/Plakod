import Phaser from 'phaser'
import { GREEN, MARGIN, PLAYER_START_MARGIN } from 'config'
import I18nSingleton from 'i18n/I18nSingleton'
import EventEmitter = Phaser.Events.EventEmitter
import WebFont from 'webfontloader'
// import SoundManager from 'component/sound/SoundManager'

export default class WarmupScene extends Phaser.Scene {
	private event!: EventEmitter

	constructor() {
		super('warmupGauge')
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)
		this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)
	}

	init({ event }: { event: EventEmitter }) {
		this.event = event
	}

	create() {
		const { width, height } = this.scale
		// const soundManager = new SoundManager(this)
		const warmupSound = this.sound.addAudioSprite('tutorialWarmupSound')

		// const warmupInhaleFull = this.sound.add('warmupInhaleFull')
		// const warmupAttack = this.sound.add('warmupAttack')

		warmupSound.play('warmup-inhale-full')
		// soundManager.play(warmupInhaleFull, false)

		const inhaleText1 = I18nSingleton.getInstance()
			.createTranslatedText(this, width / 2, 15 * MARGIN, 'tutorial_inhale_1')
			.setOrigin(0.5, 0)

		const arrow = this.add
			.image(
				width / 2,
				height - PLAYER_START_MARGIN + 2 * MARGIN,
				'ui',
				'arrow.png',
			)
			.setOrigin(0.5, 1)
		arrow.setVisible(false)

		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const warmupUiStyle = {
					fontFamily: 'Mali',
					fontStyle: 'Bold',
				}

				inhaleText1
					.setStyle({
						...warmupUiStyle,
						color: `#${GREEN.toString(16).padStart(6, '0')}`,
						fontWeight: 700,
					})
					.setFontSize('8em')
					.setStroke('#58595B', 16)
					.setPadding(0, 16, 0, 16)
			},
		})

		this.event.once('fullInhale', () => {
			this.event.emit('completeGaugeWarmUp')
			inhaleText1.setVisible(false)
		})
	}
}
