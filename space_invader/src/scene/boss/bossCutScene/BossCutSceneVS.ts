import { Boss, BossCutScene, BossName } from 'component/enemy/boss/Boss'
import { BossByName, BossInterface } from '../bossInterface'
import SoundManager from 'component/sound/SoundManager'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import WebFont from 'webfontloader'
import Score from 'component/ui/Score'
import { PlayerByName } from 'component/player/playerInterface'

export default class BossCutSceneVS extends Phaser.Scene {
	private props!: BossInterface
	private bossVersion!: BossVersion
	private boss!: Boss

	constructor() {
		super({ key: BossCutScene.VS })
	}

	preload() {
		this.load.image(
			'boss_cutscene_background',
			'assets/background/bg_set5_cutscene.png',
		)
		this.load.atlas(
			'player',
			'assets/character/player/mc1_spritesheet.png',
			'assets/character/player/mc1_spritesheet.json',
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
		this.load.audio('mcHit1', 'sound/mc1-hit1.mp3')
		this.load.audio('mcHit2', 'sound/mc1-hit2.mp3')
		this.load.audio('mcHit3', 'sound/mc1-hit3.mp3')
		this.load.audio('mc1Vs', 'sound/mc1-vs.mp3')
	}

	init(props: BossInterface) {
		this.props = props
	}

	create() {
		const { name, score, playerX, reloadCount } = this.props
		const soundManager = new SoundManager(this)

		const bossVs = this.sound.add('bossVs')
		soundManager.play(bossVs, false)

		// TODO: recieve player from gameScene
		const sceneLayer = this.add.layer()
		const player = new PlayerByName['MC1'](this, sceneLayer)
		player.hide()

		const scoreObj = new Score(this)
		scoreObj.hide()

		this.boss = new BossByName[name ?? 'B1'](
			this,
			player,
			scoreObj,
			reloadCount,
		)
		this.bossVersion = this.boss.getVersion()

		const self = this
		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				self.bossVersion.playVsScene(self, player)
			},
		})

		setTimeout(() => {
			this.scene.stop()
			this.scene.start('bossScene', {
				name: BossName.B1,
				score: score,
				playerX: playerX,
				reloadCount: reloadCount,
			})
		}, 3000)
	}
}
