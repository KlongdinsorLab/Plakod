import { Boss, BossName } from 'component/enemy/boss/Boss'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import { B1Boss } from 'component/enemy/boss/b1/B1Boss'

export interface BossInterface {
	  name: BossName,
	  bossVersion: BossVersion,
	  boss: Boss,
		score: number,
		playerX: number,
		reloadCount: number, // TODO change name and class to lap
}

export const BossByName = {
	"B1": B1Boss
}

