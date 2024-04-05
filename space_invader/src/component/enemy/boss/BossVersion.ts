import { Boss } from "./Boss";
import { BossSkill } from "./BossSkill";

export abstract class BossVersion {
	abstract createAnimation(scene: Phaser.Scene): void
	abstract getMovePattern(scene: Phaser.Scene, boss: Boss): Phaser.Curves.Path
	abstract isShootAttack(): boolean
	abstract hasObstacle(): boolean
	abstract hasSkill(): boolean
	abstract useSkill(scene: Phaser.Scene, boss: Boss, bossSkill: BossSkill): void
	abstract getDurationPhase1(): number
	abstract getDurationPhase2(): number
	abstract playVsScene(scene: Phaser.Scene): void
	abstract playEscapePhase1(scene: Phaser.Scene): void
	abstract playEscapePhase2(scene: Phaser.Scene): void
	abstract playTutorialPhase1(scene: Phaser.Scene): void
	abstract playTutorialPhase2(scene: Phaser.Scene): void
	abstract playItemTutorial(scene: Phaser.Scene): void
}
