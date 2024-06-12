import { Boss, BossTutorialScene } from 'component/enemy/boss/Boss'
// import SoundManager from 'component/sound/SoundManager'
import { BOSS_TUTORIAL_DELAY_MS } from 'config'

export default class BossTutorialPhase1 extends Phaser.Scene {
	private boss!: Boss

	constructor() {
		super({ key: BossTutorialScene.TUTORIAL_PHASE_1 })
	}

	init(boss: Boss) {
		this.boss = boss
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)
		// this.load.audio('bossAttack', 'sound/boss-attack.mp3')
	}

	create() {
		const tutorialSound = this.sound.addAudioSprite('tutorialWarmupSound')
		tutorialSound.play('boss-attack')

		// const soundManager = new SoundManager(this)
		// const bossAttack = this.sound.add('bossAttack')
		// soundManager.play(bossAttack, false)
		
		this.boss.getVersion().playTutorialPhase1(this)

		setTimeout(() => {
			this.scene.stop()
		}, BOSS_TUTORIAL_DELAY_MS)
	}
}
