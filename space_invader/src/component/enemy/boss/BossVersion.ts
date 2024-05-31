import Player from "component/player/Player";
import { Boss } from "./Boss";
import { BossSkill } from "./BossSkill";

export abstract class BossVersion {
	protected skillTimer = 0
	protected movePattern!: Phaser.Curves.Path
	protected phase1Skills!: BossSkill[]
	protected phase2Skills!: BossSkill[]
	protected enemy!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | any
	protected scene!: Phaser.Scene

	constructor(scene: Phaser.Scene){
		this.scene = scene
	}

	abstract createAnimation(scene: Phaser.Scene): void
	abstract getMovePattern(scene: Phaser.Scene, boss: Boss): Phaser.Curves.Path
	abstract hasSkill(): boolean
	abstract getSkills(): BossSkill[]
	abstract useSkill(isSecondPhase: boolean, delta: number): void
	abstract getDurationPhase1(): number
	abstract getDurationPhase2(): number
	abstract playVsScene(scene: Phaser.Scene, player: Player): void
	abstract playEscapePhase1(scene: Phaser.Scene): void
	abstract playEscapePhase2(scene: Phaser.Scene): void
	abstract playTutorialPhase1(scene: Phaser.Scene): void
	abstract playTutorialPhase2(scene: Phaser.Scene): void
	abstract playItemTutorial(scene: Phaser.Scene): void
	abstract hasBoosterDrop(): boolean
}
