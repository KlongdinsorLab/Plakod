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
import { BossSkill } from '../BossSkill'
import { B1BossSkill } from './B1BossSkill'
import { B1BossVersion1 } from './B1BossVersion1'
import { B1BossVersion2 } from './B1BossVersion2'

let isHit = false

export class B1Boss extends Boss {
	private soundManager: SoundManager
	private phaseCount!: number
	private isStartAttack = false
	private isItemPhase = false
	private isAttackPhase = true
	private isSecondPhase = false
	private bossVersion!: BossVersion
	private bossSkill!: BossSkill

	constructor(scene: Phaser.Scene, player: Player, score: Score, lap: number) {
		super(scene, player, score, lap)
		this.soundManager = new SoundManager(scene)
		this.phaseCount = 0

		console.log(lap)
		this.bossVersion = this.setVersion(lap)
		this.enemy = this.bossVersion.createAnimation(this.scene)
		this.enemy.depth = 3

		this.enemy.play('boss-move')
		this.scene.physics.world.enable(this.enemy)

		this.bossSkill = new B1BossSkill(this.scene, this, this.player)
		this.scene.physics.world.enable(this.bossSkill.getBody())
	}

	create(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody | void {
		// return this.enemy
	}

	path(): void {}

	move(): void {
		const path = this.bossVersion.getMovePattern(this.scene, this)
		this.enemy.setPath(path)
		this.enemy.startFollow({
			positionOnPath: true,
			duration: 7000,
			yoyo: true,
			repeat: -1,
			rotateToPath: false,
		})
	}

	attack(): void {
		if (!this.isSecondPhase) {
			this.move()
			setTimeout(() => {
				this.remove()
			}, this.bossVersion.getDurationPhase1())
		} else {
			this.move()
			setTimeout(() => {
				this.remove()
			}, this.bossVersion.getDurationPhase2())
		}
	}

	hit(): void {
		if (isHit) return

		const bossHit1 = this.scene.sound.add('bossHit1')
		const bossHit2 = this.scene.sound.add('bossHit2')
		const bossHit3 = this.scene.sound.add('bossHit3')
		const bossHit4 = this.scene.sound.add('bossHit4')

		// TODO fixes me
		const randomSoundIndex = Math.floor(Math.random() * 4) + 1
		if (randomSoundIndex === 1) {
			this.soundManager.play(bossHit1, false)
		} else if (randomSoundIndex === 2) {
			this.soundManager.play(bossHit2, false)
		} else if (randomSoundIndex === 3) {
			this.soundManager.play(bossHit3, false)
		} else if (randomSoundIndex === 4) {
			this.soundManager.play(bossHit4, false)
		}

		this.enemy.stop()
		// this.enemy.setTexture('boss')
		this.enemy.play('boss-hit')

		isHit = true
		this.enemy.setAlpha(0.75)
		setTimeout(() => {
			isHit = false
			this.enemy.setAlpha(1)
			this.enemy.stop()
			// this.enemy.setTexture('boss')
			this.enemy.play('boss-move')
		}, BOSS_HIT_DELAY_MS)
		this.soundManager.play(this.enermyDestroyedSound!, true)
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
		this.enemy.setPath(path).startFollow({ duration: 200 })
		setTimeout(() => {
			this.endAttackPhase()
		}, 1500)
	}

	startAttackPhase(): void {
		this.phaseCount++
		this.isSecondPhase = this.phaseCount === 2
		this.isStartAttack = true
		setTimeout(() => {
			this.isAttackPhase = true
			this.isItemPhase = false
			this.attack()
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
		this.bossVersion = new bossVersions[version]()

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

	getSkill(): any {
		return this.bossSkill
	}

	playAttack(delta: number): void {
		if (this.isSecondPhase) {
			this.bossVersion.createObstacleByTime(
				this.scene,
				this.player,
				this.score,
				delta,
			)
			this.bossVersion.useSkill(this.bossSkill, delta)
		}
	}
}
