import { Boss, BossCutScene, BossName } from 'component/enemy/boss/Boss'
import { BossByName, BossInterface } from '../bossInterface'
import SoundManager from 'component/sound/SoundManager'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import Player from 'component/player/Player'
import WebFont from 'webfontloader'
import Score from 'component/ui/Score'
import { B1BossVersion1 } from 'component/enemy/boss/b1/B1BossVersion1'
import { B1BossVersion2 } from 'component/enemy/boss/b1/B1BossVersion2'


export default class BossCutSceneVS extends Phaser.Scene {
	private props!: BossInterface
	private bossVersion!: BossVersion
	private boss!: Boss

	constructor() {
		super({ key: BossCutScene.VS })
	}

	preload() {
		this.load.image('boss_cutscene_background', 'assets/background/bg_set5_cutscene.png')
		this.load.atlas(
			'player',
			'assets/character/player/mc_spritesheet.png',
			'assets/character/player/mc_spritesheet.json',
		)

		this.load.atlas(
			'b1v1',
			'assets/character/enemy/b1v1_spritesheet.png',
			'assets/character/enemy/b1v1_spritesheet.json',
		)

		this.load.atlas(
			'b1v2',
			'assets/character/enemy/b1v2_spritesheet.png',
			'assets/character/enemy/b1v2_spritesheet.json',
		)

    this.load.audio('bossVs', 'sound/boss-vs.mp3')
    this.load.audio('bossB1', 'sound/boss-b1.mp3')
	}

	init(props: BossInterface) {
		this.props = props
	}

	async create() {
		const { name, score, playerX, reloadCount} = this.props
		const soundManager = new SoundManager(this)
		
		const bossVs = this.sound.add('bossVs')
		soundManager.play(bossVs, false)

		// TODO: recieve player from gameScene
		const sceneLayer = this.add.layer()
		const player = new Player(this, sceneLayer)
		player.hide()

		const scoreObj = new Score(this)
		this.bossVersion = new B1BossVersion2()
		this.boss = new BossByName[name](this, player, scoreObj, this.bossVersion)
		
		const self = this
		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				self.boss.getVersion().playVsScene(self)
				player.playVsScene(self)
			},
		})

		setTimeout(() => {
			this.scene.stop()
			this.scene.start("bossScene", {
				name: BossName.B1,
				score: score,
				playerX: playerX,
				reloadCount: reloadCount,
			  	}
			  )
		}, 3000)
	}
}
