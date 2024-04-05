import Player from 'component/player/Player'
import { Boss } from "../Boss";
import { BossSkill } from "../BossSkill";

export class B1BossSkill extends BossSkill{
    private path!: Phaser.Curves.Path
    private isActive!: boolean
    constructor(
		scene: Phaser.Scene,
        boss: Boss,
		player: Player,
	){
        super(scene, boss, player)

        const bossWidth = this.boss.getBody().width
        const bossHeight = this.boss.getBody().width
        this.isActive = false
        this.skill = this.scene.add.ellipse(0, 0, bossWidth + 50, bossHeight + 50, 0x5C5454, 1).setOrigin(0.5, 0.5).setStrokeStyle(6, 0xFB511C, 1);
        this.skill.setAlpha(0)
    }

    startSkill(): void {
        this.setActive(true)
    }

    stopSkill(): void {
        this.setActive(false)
    }

    setMovePath(path: Phaser.Curves.Path): void {
        this.path = path
    }

    move(): void {
        const follower = { t: 0, vec: new Phaser.Math.Vector2() };

		this.scene.tweens.add({
            targets: follower,
            t: 1,
            duration: 7000,
            repeat: -1,
			yoyo: true,
			onUpdate: () => {
				this.path.getPoint(follower.t, follower.vec);
				this.skill.setPosition(follower.vec.x, follower.vec.y)
			}
        });
    }

    applySkill(laser: Phaser.Types.Physics.Arcade.ImageWithDynamicBody): void {
        laser.destroy()
    }

    attack(): void {
    }

    setActive(isActive: boolean): void {
        this.scene.tweens.add({
            targets: this.skill,
            alpha: isActive ? 0.5 : 0,
            duration: 500
        })
        this.isActive = isActive
    }

    getBody() {
        return this.skill
    }

    getIsActive(): boolean {
        return this.isActive
    }
}