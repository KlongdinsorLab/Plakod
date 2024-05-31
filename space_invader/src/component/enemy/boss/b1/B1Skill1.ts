import Player from 'component/player/Player'
import { Boss } from "../Boss";
import { BossSkill } from "../BossSkill";

export class B1Skill1 extends BossSkill{
    private path!: Phaser.Curves.Path
    constructor(
		scene: Phaser.Scene,
        boss: Boss,
		player: Player,
        path: Phaser.Curves.Path
	){
        super(scene, boss, player)
        this.skill = this.scene.physics.add.image(0, 0, 'b1v2_shield').setOrigin(0.5, 0.5).setAlpha(0)
        this.setMovePath(path)
    }

    start(): void {
        this.skillTimer = 0
        this.setActive(true)
        this.move()
    }

    activate(delta: number): void{
        this.skillTimer += delta
        if (this.skillTimer > 12000 && this.skillTimer < 18000) {
			this.setActive(true)
			return
		}

		if (this.skillTimer > 36000 && this.skillTimer < 42000) {
			this.setActive(true)
			return
		}

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
            alpha: isActive ? 1 : 0,
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