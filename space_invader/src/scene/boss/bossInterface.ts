import { Boss } from 'component/enemy/boss/Boss'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import { B1Boss } from 'component/enemy/boss/b1/B1Boss'
import { B1ObstacleFactory } from 'component/enemy/obstacle/B1ObstacleFactory'

export const BossByName = {
	"B1": {
		"Boss": B1Boss,
		"ObstacleFactory": B1ObstacleFactory,
	}
}

export const BackgroundByBoss = {
	"B1": {
		"GameBackground": "bg_b1_normal",
		"BossBackground": "bg_b1_boss"
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

