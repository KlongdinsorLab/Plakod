import { Boss, BossName } from 'component/enemy/boss/Boss'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import { B1Boss } from 'component/enemy/boss/b1/B1Boss'
import { B2Boss } from 'component/enemy/boss/b2/B2Boss'
import { B3Boss } from 'component/enemy/boss/b3/B3Boss'

export interface BossInterface {
	name: BossName
	bossVersion: BossVersion
	boss: Boss
	score: number
	playerX: number
	reloadCount: number // TODO change name and class to lap
}

export interface Background {
	gameBackground: string
	bossBackground: string
}

export const BossByName = {
	B1: B1Boss,
	B2: B2Boss,
	B3: B3Boss,
	B4: B1Boss,
}

export const BackgroundByBossName = {
	B1: {
		gameBackground: 'b1_game_background',
		bossBackground: 'b1_boss_background',
	},
	B2: {
		gameBackground: 'b1_game_background',
		bossBackground: 'b1_boss_background',
	},
	B3: {
		gameBackground: 'b3_game_background',
		bossBackground: 'b3_boss_background',
	},
	B4: {
		gameBackground: 'b1_game_background',
		bossBackground: 'b1_boss_background',
	},
}
