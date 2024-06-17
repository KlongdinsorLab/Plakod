import {
	BULLET_COUNT,
	BOSS_PHASE1_BULLET_COUNT,
	BOSSV1_PHASE2_BULLET_COUNT,
	BOSSV2_PHASE2_BULLET_COUNT,
} from 'config'
import { Enemy } from '../Enemy'
import Player from 'component/player/Player'
import Score from 'component/ui/Score'
import { BossVersion } from './BossVersion'

export enum ShootingPhase {
	NORMAL = BULLET_COUNT,
	BOSS_PHASE_1 = BOSS_PHASE1_BULLET_COUNT,
	BOSSV1_PHASE_2 = BOSSV1_PHASE2_BULLET_COUNT,
	BOSSV2_PHASE_2 = BOSSV2_PHASE2_BULLET_COUNT,
}

export enum BossPhase {
	PHASE_1 = 'b1v1',
	PHASE_2 = 'b1v2',
}

export enum BossCutScene {
	VS = 'B1V1_CUTSCENE_VS',
	ESCAPE = 'B1V1_CUTSCENE_ESCAPE1',
	ESCAPE2 = 'B1V1_CUTSCENE_ESCAPE2',
	VICTORY = 'B1V2_CUTSCENE_VICTORY',
}

export enum BossTutorialScene {
	TUTORIAL_PHASE_1 = 'B1V1_TT_PHASE1',
	TUTORIAL_PHASE_2 = 'B1V1_TT_PHASE2',
	COLLECT_ITEM = 'B1V1_TT_CB',
}

export enum BossName {
	B1 = 'B1',
}

interface Constructable<T> {
	new (...args: any[]): T
}

export async function importClassByName<T>(
	className: string,
): Promise<Constructable<T>> {
	const module = await import(`./${className}`)
	const classRef = module[className] as Constructable<T>
	return classRef
}

export abstract class Boss extends Enemy {
	constructor(
		protected scene: Phaser.Scene,
		protected player: Player,
		protected score: Score,
		protected lap: number,
	) {
		super(scene, player, score, false)
	}
	abstract remove(): void
	abstract path(): void
	abstract getIsAttackPhase(): boolean
	abstract getIsItemPhase(): boolean
	abstract getIsStartAttack(): boolean
	abstract getIsSecondPhase(): boolean
	abstract startAttackPhase(): void
	abstract resetState(): void
	abstract setVersion(lap: number): BossVersion
	abstract getVersion(): BossVersion
	abstract getSkill(): any
	abstract playAttack(delta: number): void
}
