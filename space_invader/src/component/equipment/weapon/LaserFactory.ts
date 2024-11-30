import { Laser } from './Laser'
import Player from '../../player/Player'
import { LASER_FREQUENCY_MS } from 'config'
import { Scene } from 'phaser'
import { Enemy } from '../../enemy/Enemy'
import { BossSkill } from 'component/enemy/boss/BossSkill'

export abstract class LaserFactory {
	protected bulletCount = 0
	protected timer = 0
	private laserFrequency!: number

	abstract create(scene: Phaser.Scene, player: Player): Laser

	createByTime(
		scene: Scene,
		player: Player,
		enemies: Enemy[],
		delta: number,
		options?: {
			bossSkill?: BossSkill
			laserFrequency?: number
		},
	): void {
		this.laserFrequency = options?.laserFrequency ?? LASER_FREQUENCY_MS
		this.timer += delta
		while (this.timer > this.laserFrequency) {
			this.timer -= this.laserFrequency
			if (this.bulletCount <= 0) return
			const laser = this.create(scene, player)
			const laserBodies = laser.shoot()
			this.bulletCount -= 1
			options?.bossSkill &&
				this.setSkillCollision(scene, laserBodies, options?.bossSkill)
			this.setEnemiesCollision(scene, laserBodies, enemies)
			scene.time.delayedCall(5000, () => {
				laser.destroy()
			})
		}
	}

	setEnemiesCollision(
		scene: Phaser.Scene,
		lasers: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[],
		enemies: Enemy[],
	) {
		if (!Array.isArray(enemies) || enemies.length === 0) return
		enemies.forEach((enemy) => {
			lasers.forEach((laser) => {
				scene.physics.add.overlap(laser, enemy.getBody(), () => enemy.hit())
			})
		})
	}

	setSkillCollision(
		scene: Phaser.Scene,
		lasers: Phaser.Types.Physics.Arcade.ImageWithDynamicBody[],
		bossSkill: BossSkill,
	) {
		if (!bossSkill) return
		lasers.forEach((laser) => {
			const collider = scene.physics.add.collider(
				laser,
				bossSkill.getBody(),
				() => bossSkill.applySkill(laser),
			)
			!bossSkill.getIsActive() && scene.physics.world.removeCollider(collider)
		})
	}

	set(bulletCount: number): void {
		this.bulletCount = bulletCount
	}
}
