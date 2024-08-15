let booster1: Booster1
let booster2: Booster2
import Player from 'component/player/Player'
import InhaleGaugeRegistry from 'component/ui/InhaleGaugeRegistry'
import Score from 'component/ui/Score'
import { LaserFactory } from 'component/equipment/weapon/LaserFactory'
import { LaserFactoryByName } from 'component/equipment/weapon/LaserFactoryByName'
import {
	LASER_FREQUENCY_MS,
	COLLECT_BULLET_COUNT,
	DARK_BROWN,
	HOLD_BAR_BORDER,
	LARGE_FONT_SIZE,
	MARGIN,
} from 'config'
import Phaser from 'phaser'
import MergedInput from 'phaser3-merged-input'
//import { TripleLaserFactory} from "../component/weapon/TripleLaserFactory";
// import { MeteorFactory } from 'component/enemy/MeteorFactory'
import { PosionFactory } from 'component/item/PoisonFactory'
import { BulletFactory } from 'component/item/BulletFactory'
import Menu from 'component/ui/Menu'
import ReloadCount from 'component/ui/ReloadCount'
import WebFont from 'webfontloader'
import {
	Boss,
	BossCutScene,
	BossTutorialScene,
} from 'component/enemy/boss/Boss'
import { BossByName, BossInterface } from './bossInterface'
import SoundManager from 'component/sound/SoundManager'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import { BoosterFactory } from 'component/item/BoosterFactory'
import { ShootingPhase } from 'component/player/Player'

import { boosters } from 'scene/booster/RedeemScene'
import { BoosterEffect } from 'component/booster/booster'
import { BoosterUI } from 'component/booster/boosterUI'

import { Booster1 } from 'component/booster/boosterList/booster_1'
import { Booster2 } from 'component/booster/boosterList/booster_2'


export default class BossScene extends Phaser.Scene {
	private background!: Phaser.GameObjects.TileSprite
	private player!: Player
	private gaugeRegistry!: InhaleGaugeRegistry
	private score!: Score

	private reloadCount!: ReloadCount
	private laserFactory!: LaserFactory
	private poisonFactory!: PosionFactory
	private bulletFactory!: BulletFactory
	private boosterFactory!: BoosterFactory
	// private menu!: Menu

	// TODO move to boss class
	private boss!: Boss
	private bossVersion!: BossVersion

	private bossLayer!: Phaser.GameObjects.Layer
	private isCompleteItemTutorial!: boolean
	private bulletText!: Phaser.GameObjects.Text

	private isCompleteInit = false
	private props!: BossInterface
	private bgm!: Phaser.Sound.BaseSound
	private soundManager: SoundManager

	private boosterEffect!: BoosterEffect

	constructor() {
		super({ key: 'bossScene' })
		this.soundManager = new SoundManager(this)
	}

	preload() {
		this.load.image('boss_background', 'assets/background/bg_boss.jpg')

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

		this.load.atlas(
			'b2v1',
			'assets/character/enemy/b2v1_spritesheet.png',
			'assets/character/enemy/b2v1_spritesheet.json',
		)

		this.load.atlas(
			'b2v2',
			'assets/character/enemy/b2v2_spritesheet.png',
			'assets/character/enemy/b2v2_spritesheet.json',
		)

		this.load.atlas(
			'bossAsset',
			'assets/sprites/boss/asset_boss.png',
			'assets/sprites/boss/asset_boss.json',
		)
		this.load.image('bossSkill_Shield', 'assets/sprites/boss/b1v2_shield.png')

		this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)

		this.load.image('laser', 'assets/effect/mc_bullet.png')

		
		this.load.image('progress_bar', 'assets/ui/progress_bar.png')
		
		this.load.svg('resume', 'assets/icon/resume.svg')
		
		// this.load.audio('lapChangedSound', 'sound/soundeffect_count_round.mp3')
		// this.load.audio('shootSound', 'sound/shooting-sound-fx-159024.mp3')
		this.load.audio('meteorDestroyedSound', 'sound/rock-destroy-6409.mp3')
		this.load.audio('chargingSound', 'sound/futuristic-beam-81215.mp3')
		this.load.audio('chargedSound', 'sound/sci-fi-charge-up-37395.mp3')
		this.load.audio('boss_bgm', 'sound/BGM_BossScene.mp3')

		this.load.scenePlugin('mergedInput', MergedInput)
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)
	}

	init(props: BossInterface) {
		this.props = props
	}

	async create() {
		const { name, score, playerX, reloadCount } = this.props
		const { width, height } = this.scale

		this.background = this.add
			.tileSprite(0, 0, width, height, 'boss_background')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		this.bgm = this.sound.add('boss_bgm', { volume: 1, loop: true })
		this.soundManager.init()
		this.soundManager.play(this.bgm)

		this.bossLayer = this.add.layer()

		this.player = new Player(this, this.bossLayer)
		this.player.getBody().setX(playerX)
		this.player.addChargeParticle()
		

		new Menu(this)


		this.score = new Score(this)
		this.score.setScore(score)

		this.reloadCount = new ReloadCount(this, width / 2, MARGIN)
		this.reloadCount.getBody().setOrigin(0.5, 0)
		this.reloadCount.setCount(reloadCount)

		// const classRef = await importClassByName<Boss>(`${name}Boss`);
		// this.boss = new classRef(this, this.player, this.score)

		this.boss = new BossByName[name ?? 'B1'](
			this,
			this.player,
			this.score,
			reloadCount,
		)
		this.bossVersion = this.boss.getVersion()

		this.isCompleteInit = true

		this.gaugeRegistry = new InhaleGaugeRegistry(this)
		this.gaugeRegistry.createbyDivision(1)
		this.gaugeRegistry.get(0).setVisibleAll(false)

		this.poisonFactory = new PosionFactory()
		this.bulletFactory = new BulletFactory()
		this.boosterFactory = new BoosterFactory()

		this.isCompleteItemTutorial = false
		
		boosters.forEach(booster => {
			const boosterUI = new BoosterUI(this, booster, {x:594, y:1142})
			boosterUI.create()
		})

		this.boosterEffect = this.scene.scene.registry.get("boosterEffect")
		
		if(this.boosterEffect.remainingUses === 0 && this.boosterEffect.remainingTime > 0 && this.boosterEffect.remainingTime < 15){
			this.player.activateShield(this.boosterEffect.remainingTime)
		}

		this.laserFactory = new LaserFactoryByName[this.boosterEffect.laserFactory]();

		const self = this
		WebFont.load({
			google: {
				families: ['Jua'],
			},
			active: function () {
				const menuUiStyle = {
					fontFamily: 'Jua',
					color: `#${DARK_BROWN.toString(16)}`,
				}
				self.score.getBody().setStyle(menuUiStyle)
				self.reloadCount.getBody().setStyle(menuUiStyle)
			},
		})

		// Mock bullet count, delete when finish test
		this.bulletText = this.add
			.text(
				width / 2,
				height - MARGIN + HOLD_BAR_BORDER,
				` /${COLLECT_BULLET_COUNT}`,
			)
			.setFontSize(LARGE_FONT_SIZE)
			.setOrigin(0.5, 1)
		this.bulletText.setVisible(false)
	}

	update(_: number, delta: number) {
		if (!this.isCompleteInit) return

		const gauge = this.gaugeRegistry?.get(0)
		gauge.setVisibleAll(false)

		if (
			!this.boss.getIsSecondPhase() &&
			!this.boss.getIsStartAttack() &&
			!this.boss.getIsItemPhase()
		) {
			// Boss Phase 1
			this.boss.startAttackPhase()
			this.scene.launch(BossTutorialScene.TUTORIAL_PHASE_1, this.boss)
		}

		if (this.boss.getIsAttackPhase()) {
			this.boss.playAttack(delta)
		}

		if (!this.isCompleteItemTutorial && this.boss.getIsItemPhase()) {
			this.isCompleteItemTutorial = true
			this.scene.pause()
			this.scene.launch(BossCutScene.ESCAPE, this.boss)
		} else if (this.boss.getIsItemPhase() && !this.player.getIsBulletFull()) {
			// Collecting Item Phase
			this.bossVersion.createObstacleByTime(
				this,
				this.player,
				this.score,
				delta,
			)
			this.poisonFactory.createByTime(
				this,
				this.player,
				this.score,
				gauge,
				delta,
			)
			this.bulletFactory.createByTime(
				this,
				this.player,
				this.score,
				gauge,
				delta,
			)
			this.bossVersion.hasBoosterDrop() &&
				this.boosterFactory.createByTime(
					this,
					this.player,
					this.score,
					gauge,
					delta,
				)

			this.bulletText.setVisible(true)
			this.bulletText.setText(
				` ${this.player.getBulletCount()} / ${COLLECT_BULLET_COUNT}`,
			)
		} else if (this.player.getIsBulletFull() && !this.boss.getIsStartAttack()) {
			// Boss Phase 2
			this.bulletText.setVisible(false)
			this.boss.startAttackPhase()
			this.scene.launch(BossTutorialScene.TUTORIAL_PHASE_2, this.boss)
		}

		if (
			this.boss.getIsSecondPhase() &&
			!this.boss.getIsAttackPhase() &&
			!this.boss.getIsItemPhase()
		) {
			if(this.player.getIsUsedShield() && this.boosterEffect.remainingTime > 0) this.player.deactivateShield()
			this.scene.launch(BossCutScene.ESCAPE2, {
				score: this.score.getScore(),
				reloadCount: this.reloadCount.getCount(),
				boss: this.boss,
			})
			this.scene.pause()
			this.boss.resetState()
			setTimeout(() => {
				this.soundManager.stop(this.bgm)
			}, 5000)
		}

		if (this.input.pointer1.isDown) {
			const { x } = this.input.pointer1
			if (this.player.isRightOf(x)) {
				this.player.moveRight(delta)
			}
			if (this.player.isLeftOf(x)) {
				this.player.moveLeft(delta)
			}
		}

		// scroll the background
		this.background.tilePositionY += 1.5

		this.laserFactory.createByTime(
			this,
			this.player,
			[this.boss],
			delta,
			{
				bossSkill:this.boss.getSkill(),
				laserFrequency: LASER_FREQUENCY_MS * this.boosterEffect.laserFrequency,
			},
		)

		if (this.player.getIsReload()) {
			if (!this.boss.getIsSecondPhase()) {
				this.laserFactory.set(ShootingPhase.BOSS_PHASE_1*this.boosterEffect.shootingPhase)
				this.player.reloadSet(ShootingPhase.BOSS_PHASE_1*this.boosterEffect.shootingPhase, LASER_FREQUENCY_MS*this.boosterEffect.laserFrequency)
				gauge.set(
					ShootingPhase.BOSS_PHASE_1 * this.boosterEffect.shootingPhase * this.boosterEffect.bulletMultiply, 
					LASER_FREQUENCY_MS*this.boosterEffect.laserFrequency, 
					this.boosterEffect.releasedBullet
				)
			} else {
				this.laserFactory.set(ShootingPhase.BOSSV1_PHASE_2*this.boosterEffect.shootingPhase)
				this.player.reloadSet(ShootingPhase.BOSSV1_PHASE_2*this.boosterEffect.shootingPhase, LASER_FREQUENCY_MS*this.boosterEffect.laserFrequency)
				gauge.set(
					ShootingPhase.BOSSV1_PHASE_2 * this.boosterEffect.shootingPhase * this.boosterEffect.bulletMultiply, 
					LASER_FREQUENCY_MS*this.boosterEffect.laserFrequency, 
					this.boosterEffect.releasedBullet
				)
			}
		}
	}
}

// TODO create test
export {booster1}
export {booster2}