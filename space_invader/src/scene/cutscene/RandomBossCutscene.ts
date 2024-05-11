import { Boss } from 'component/enemy/boss/Boss'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'
import I18nSingleton from 'i18n/I18nSingleton'
import { BossByName } from 'scene/boss/bossInterface'
import WebFont from 'webfontloader'

const bossNameText = {
	"B1": "alien_boss_name"
}

export default class RandomBossCutScene extends Phaser.Scene {
	private boss!: Boss
	private bossVersion!: BossVersion
	private bossName!: keyof typeof BossByName

	constructor() {
		super('Cutscene_randomboss')
	}

	init() {}

	preload() {
		this.load.image('background', 'assets/background/background.jpg')
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
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

		this.load.image('boss_background', 'assets/background/bg_boss.jpg')
	}

	create() {
		const { width, height } = this.scale
		const i18n = I18nSingleton.getInstance()
		this.add
			.tileSprite(0, 0, width, height, 'background')
			.setOrigin(0)
			.setScrollFactor(0, 0)
			.postFX.addBokeh(0.5, 1, 0)

		// TODO: random player
		const player = new Player(this, this.add.layer())
		player.hide()
		const score = new Score(this)
		score.hide()

		this.bossName = this.randomBoss()
		this.boss = new BossByName[this.bossName](this, player, score, 6)
		this.bossVersion = this.boss.getVersion()

		this.add
			.graphics()
			.fillStyle(0xfff6e5, 1)
			.fillRoundedRect(48, height - 320, 624, 240, 40)
		this.add
			.graphics()
			.lineStyle(6, 0xd35e24, 1)
			.strokeRoundedRect(48, height - 320, 624, 240, 40)

		const playerName = i18n
			.createTranslatedText(this, 0, 0, 'player_name')
			.setVisible(false)

		const bossName = i18n
			.createTranslatedText(this, 0, 0, bossNameText[this.bossName])
			.setVisible(false)

		const dialogText = i18n
			.createTranslatedText(
				this,
				624 / 2 + 48,
				height - 200,
				'random_scene_dialog',
				{
					username: playerName.text,
					bossName: bossName.text,
				},
			)
			.setAlign('center')
			.setOrigin(0.5, 0.5)

		const self = this
		WebFont.load({
			google: {
				families: ['Mali'],
			},
			active: function () {
				const maliFontStyle = {
					fontFamily: 'Mali',
					fontStyle: 'bold',
				}

				self.bossVersion.playRandomScene(self, player)

				dialogText
					.setStyle({
						...maliFontStyle,
						color: '#57453B',
					})
					.setFontSize('36px')
			},
		})

		setTimeout(() => {
			this.scene.start('game', { bossName: this.bossName })
		}, 3000)
	}

	randomBoss(): keyof typeof BossByName {
		// TODO: weighted random
		const bossPool = Object.keys(BossByName)
		const randomIndex = Math.round(Math.random() * (bossPool.length - 1))
		return bossPool[randomIndex] as keyof typeof BossByName
	}
}
