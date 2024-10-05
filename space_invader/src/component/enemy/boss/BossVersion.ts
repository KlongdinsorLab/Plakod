import Player from 'component/player/Player'
import { Boss } from './Boss'
import { BossSkill } from './BossSkill'
import Score from 'component/ui/Score'

export abstract class BossVersion {
	abstract createAnimation(scene: Phaser.Scene): void
	abstract getMovePattern(scene: Phaser.Scene, boss: Boss): Phaser.Curves.Path
	abstract isShootAttack(): boolean
	abstract hasObstacle(): boolean
	abstract hasSkill(): boolean
	abstract useSkill(bossSkill: BossSkill, delta: number): void
	abstract createObstacleByTime(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		delta: number,
	): void
	abstract getDurationPhase1(): number
	abstract getDurationPhase2(): number
	abstract playVsScene(scene: Phaser.Scene, player: Player): void
	abstract playEscapePhase1(scene: Phaser.Scene): void
	abstract playEscapePhase2(scene: Phaser.Scene): void
	abstract playItemTutorial(scene: Phaser.Scene): void
	abstract playRandomScene(scene: Phaser.Scene, player: Player): void
	abstract hasBoosterDrop(): boolean
}
