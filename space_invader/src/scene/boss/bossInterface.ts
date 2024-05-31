import { Boss } from 'component/enemy/boss/Boss'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import { B1Boss } from 'component/enemy/boss/b1/B1Boss'

export const BossByName = {
	"B1": {
		"Boss": B1Boss,
	}
}

export const BackgroundByBoss = {
	"B1": {
		"GameBackground": "b1_game_map",
		"BossBackground": "b1_boss_map"
	}
}

export interface BossInterface {
	name: keyof typeof BossByName,
	bossVersion: BossVersion,
	boss: Boss,
	  score: number,
	  playerX: number,
	  reloadCount: number, // TODO change name and class to lap
}

