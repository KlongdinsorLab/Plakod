import { Boss, BossName } from 'component/enemy/boss/Boss'
import { BossVersion } from 'component/enemy/boss/BossVersion'
import { B1Boss } from 'component/enemy/boss/b1/B1Boss'
import { B2Boss } from 'component/enemy/boss/b2/B2Boss'
import { B4Boss } from 'component/enemy/boss/b4/B4Boss'

export interface BossInterface {
	  name: BossName,
	  bossVersion: BossVersion,
	  boss: Boss,
		score: number,
		playerX: number,
		reloadCount: number, // TODO change name and class to lap
}

export const BossByName = {
	"B1": B1Boss,
	"B2": B2Boss,
	"B4": B4Boss 
}

