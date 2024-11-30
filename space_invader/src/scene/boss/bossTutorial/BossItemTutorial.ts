import Phaser from 'phaser'
import { Boss, BossTutorialScene } from 'component/enemy/boss/Boss'
// import SoundManager from 'component/sound/SoundManager'

export default class BossItemTutorial extends Phaser.Scene {
	private boss!: Boss

	constructor() {
		super(BossTutorialScene.COLLECT_ITEM)
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)

		this.load.atlas(
			'bossAsset',
			'assets/sprites/boss/asset_boss.png',
			'assets/sprites/boss/asset_boss.json',
		)
		// this.load.audio('bossItem', 'sound/boss-item.mp3')
	}

	init(boss: Boss) {
		this.boss = boss
	}

	create() {
		const tutorialSound = this.sound.addAudioSprite('tutorialWarmupSound')
		tutorialSound.play('boss-item')

		// const soundManager = new SoundManager(this)
		// const bossItem = this.sound.add('bossItem')
		// soundManager.play(bossItem, false)

		this.boss.getVersion().playItemTutorial(this)
	}
}
