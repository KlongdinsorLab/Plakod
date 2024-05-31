import Player from 'component/player/Player'
import Score from 'component/ui/Score'

import {
	DESTROY_METEOR_SCORE,
	BOSS_HIT_DELAY_MS,
	BOSS_TUTORIAL_DELAY_MS,
	BOSS_MULTIPLE_COUNT,
} from 'config'
import SoundManager from 'component/sound/SoundManager'
import { Boss } from '../Boss'
import { BossVersion } from '../BossVersion'
import { B1BossVersion1 } from './B1BossVersion1'
import { B1BossVersion2 } from './B1BossVersion2'

let isHit = false

export class B1Boss extends Boss {
	private soundManager: SoundManager
	private bossHitSounds!: (Phaser.Sound.NoAudioSound
		| Phaser.Sound.WebAudioSound
		| Phaser.Sound.HTML5AudioSound)[]

	constructor(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		lap: number = 1,
	) {
		super(scene, player, score, lap)
		this.soundManager = new SoundManager(scene)
		this.phaseCount = 0
		this.bossVersion = this.setVersion(lap)
		this.enemy = this.bossVersion.createAnimation(this.scene)
		this.enemy.depth = 3

		this.enemy.play('boss-move')
		this.scene.physics.world.enable(this.enemy)

		this.bossHitSounds = [...Array(4)].map((_, i) =>
			this.scene.sound.add(`bossHit${i+1}`),
		)
		this.movePath = this.bossVersion.getMovePattern(this.scene, this)
	}

	create(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody | void {
		// return this.enemy
	}

	path(): void {}

	move(): void {
		this.enemy.setPath(this.movePath)
		this.enemy.startFollow({
			positionOnPath: true,
			duration: 7000,
			yoyo: true,
			repeat: -1,
			rotateToPath: false,
		})
	}

	attack(delta: number): void {
		this.bossTimer += delta
		if(!this.isSecondPhase){
			if(this.bossTimer >= this.bossVersion.getDurationPhase1() && !this.bossRemoved) this.remove()
		} else {
			if(this.bossTimer >= this.bossVersion.getDurationPhase2() && !this.bossRemoved) this.remove()
		}
	}

	hit(): void {
		if (isHit) return

		// TODO fixes me
		const randomSoundIndex = Math.floor(Math.random() * 4)
		this.soundManager.play(this.bossHitSounds[randomSoundIndex], false)

		this.enemy.stop()
		this.enemy.play('boss-hit')

		isHit = true
		this.enemy.setAlpha(0.75)
		setTimeout(() => {
			isHit = false
			this.enemy.setAlpha(1)
			this.enemy.stop()
			this.enemy.play('boss-move')
		}, BOSS_HIT_DELAY_MS)
		this.soundManager.play(this.enemyDestroyedSound!, true)
		this.score.add(DESTROY_METEOR_SCORE)
	}

	destroy() {
		// TODO
	}

	getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody {
		return this.enemy
	}

	isActive(): boolean {
		return this.enemy.active
	}

	remove(): void {
		const { width } = this.scene.scale
		const path = new Phaser.Curves.Path(this.enemy.x, this.enemy.y).lineTo(
			width / 2,
			-140,
		)
		this.bossRemoved = true
		this.enemy.setPath(path).startFollow({ duration: 300, onComplete:() => this.endAttackPhase() })
	}

	startAttackPhase(): void {
		this.phaseCount++
		this.isSecondPhase = this.phaseCount === 2
		this.isStartAttack = true
		setTimeout(() => {
			this.isAttackPhase = true
			this.isItemPhase = false
			this.bossRemoved = false
			this.bossTimer = 0
			this.move()
			this.player.startReload()
		}, BOSS_TUTORIAL_DELAY_MS)
	}

	endAttackPhase(): void {
		if (!this.isSecondPhase) {
			this.isItemPhase = true
			this.isAttackPhase = false
			this.isStartAttack = false
		} else {
			this.isAttackPhase = false
			this.isItemPhase = false
		}
	}

	getIsStartAttack(): boolean {
		return this.isStartAttack
	}

	getIsAttackPhase(): boolean {
		return this.isAttackPhase
	}

	getIsItemPhase(): boolean {
		return this.isItemPhase
	}

	getIsSecondPhase(): boolean {
		return this.isSecondPhase
	}

	resetState(): void {
		this.isStartAttack = false
		this.isAttackPhase = true
		this.isItemPhase = false
		this.isSecondPhase = false
	}

	setVersion(lap: number): BossVersion {
		const version = Math.floor((10 - lap) / BOSS_MULTIPLE_COUNT)
		const bossVersions = [B1BossVersion1, B1BossVersion2]
		this.bossVersion = new bossVersions[version](this.scene, this, this.player)

		this.scene.anims.remove('boss-move')
		this.scene.anims.remove('boss-hit')
		this.enemy = this.bossVersion.createAnimation(this.scene)
		this.enemy.depth = 3
		this.enemy.play('boss-move')
		this.scene.physics.world.enable(this.enemy)
		return this.bossVersion
	}

	getVersion(): BossVersion {
		return this.bossVersion
	}

	playAttack(delta: number): void {
		this.attack(delta)
		this.bossVersion.useSkill(this.isSecondPhase, delta)
	}
}
