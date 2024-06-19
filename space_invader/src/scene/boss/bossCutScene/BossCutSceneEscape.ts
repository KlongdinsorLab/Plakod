import {
	Boss,
	BossCutScene,
	BossTutorialScene,
} from 'component/enemy/boss/Boss'
// import SoundManager from 'component/sound/SoundManager'
import { BOSS_CUTSCENE_DELAY_MS } from 'config'

export default class BossCutSceneEscape extends Phaser.Scene {
	private boss!: Boss
	constructor() {
		super({ key: BossCutScene.ESCAPE })
	}

	init(boss: Boss) {
		this.boss = boss
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)
		// this.load.audio('bossEscape', 'sound/boss-escape.mp3')
		// this.load.audio('bossEscapeVoice', 'sound/boss-escape-voice.mp3')
	}

	create() {
		// const soundManager = new SoundManager(this)
		// const bossEscape = this.sound.add('bossEscape')
		// soundManager.play(bossEscape, false)
		const tutorialSound = this.sound.addAudioSprite('tutorialWarmupSound')
		tutorialSound.play('boss-escape')

		this.boss.getVersion().playEscapePhase1(this)

		this.time.addEvent({
			delay : BOSS_CUTSCENE_DELAY_MS,
			callback : () => {
				this.scene.stop()
				this.scene.launch(BossTutorialScene.COLLECT_ITEM, this.boss)
				this.scene.resume('bossScene')
			},
			loop : false
		})
	}
}
