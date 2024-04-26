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
        // this.skill = this.scene.physics.add.image(0, 0, 'bossSkill_Shield').setOrigin(0.5, 0.5).setAlpha(0)
        this.skill = this.scene.add.ellipse(0, 0, boss.getBody().width + 50, boss.getBody().width + 50, 0xFB511C, 1).setOrigin(0.5, 0.5);
        this.skill.setAlpha(0)
        this.isActive = false
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