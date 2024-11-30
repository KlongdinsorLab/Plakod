import Player from 'component/player/Player'
import { Boss } from '../Boss'
import { BossSkill } from '../BossSkill'
import Score from 'component/ui/Score'
import B4SingleCrescent from './B4SingleCrescent'
import B4DoubleCrescent from './B4DoubleCrescent'

export class B4BossSkill extends BossSkill {
	private path!: Phaser.Curves.Path
	private score!: Score
	private isActive: boolean
	constructor(scene: Phaser.Scene, boss: Boss, player: Player, score: Score) {
		super(scene, boss, player)
		this.skill = this.scene.physics.add
			.image(0, 0, 'b4v1', 'b4_skill1.png')
			.setOrigin(0.5, 0.5)
			.setVisible(false)
		this.score = score
		this.isActive = true
	}

	startSkill(): void {
		this.shootSingleCrescent()

		this.scene.time.delayedCall(1500, () => {
			this.shootSingleCrescent()
		})

		this.scene.time.delayedCall(3000, () => {
			this.shootSingleCrescent()
		})

		this.scene.time.delayedCall(4500, () => {
			this.shootSingleCrescent()
		})

		this.scene.time.delayedCall(6000, () => {
			this.shootSingleCrescent()
		})
	}
	stopSkill(): void {
		this.skill.destroy()
	}
	attack(): void {
		this.shootDoubleCrescent()

		this.scene.time.delayedCall(1500, () => {
			this.shootSingleCrescent()
		})
	}
	applySkill(_laser: Phaser.Types.Physics.Arcade.ImageWithDynamicBody): void {}
	move() {
		const follower = { t: 0, vec: new Phaser.Math.Vector2() }

		this.scene.tweens.add({
			targets: follower,
			t: 1,
			duration: 7000,
			repeat: -1,
			yoyo: true,
			onUpdate: () => {
				this.path.getPoint(follower.t, follower.vec)
				this.skill.setPosition(follower.vec.x, follower.vec.y)
			},
		})
	}
	setMovePath(path: Phaser.Curves.Path): void {
		this.path = path
	}
	setActive(isActive: boolean): void {
		this.isActive = isActive
	}
	getIsActive(): boolean {
		return false
	}
	getBody() {}
	getPath() {
		return this.path
	}

	shootSingleCrescent() {
		if (this.isActive)
			new B4SingleCrescent(
				this.scene,
				this.player,
				this.score,
				this.skill.x,
				this.skill.y,
			)
	}

	shootDoubleCrescent() {
		if (this.isActive)
			new B4DoubleCrescent(
				this.scene,
				this.player,
				this.score,
				this.skill.x,
				this.skill.y,
			)
	}
}
