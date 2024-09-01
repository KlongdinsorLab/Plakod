export interface PlayerDTO {
	playerId: number
	username: string
	playerLevel: number
	airflow: number
	playCount: number
	playToday: Date[]
	difficulty: DifficultyDTO
	selectedCharacterId: number
	playerCharactersId: number[]
}

export interface RankDTO {
	playerId: number
	username: string
	accumulatedScore: number
	accumulatedPlay: number
}

export interface AchievementDetailDTO {
	achievementId: number
	name: string
	detail: string
}

export interface CharacterDetailDTO {
	characterId: number
	name: string
	detail: string
}

export interface BoosterDetailDTO {
	boosterId: number
	name: string
	detail: string
}

export interface BossDetailDTO {
	bossId: number
	name: string
	detail: string
}

export interface BoosterDTO {
	boosterId: number
	expireDate: (Date | null)[]
}

export interface DifficultyDTO {
	difficultyId: number
	name: string
	inhaleSecond: number
}

export interface GameSessionDTO {
	gameSessionId: number
	bossId: number
	boosterDropId: number
	boosterDropDuration: number
	score: number
	lap: number
	startedAt: Date
}

export interface GameSessionFinishedDTO {
	level: number | null
	boosterByLevelUpId: number[]
	achievementUnlockedId: number[]
}

export type FinishGameResponse = {
	// TODO: add achievement type
	new_achievements: any[]
	total_games: number
	games_played_today: {
		id: number
		player_id: number
		difficulty_id: number
		boss_id: number
		booster_drop_id: number
		booster_drop_duration: number | null
		score: number | null
		lap: number | null
		started_at: Date
		updated_at: Date | null
		ended_at: Date | null
		status: string | null
	}[]
	level_up: boolean
	level: LevelResponse
	booster: number | null
}

export interface Response<T> {
	message: string // ok
	response: T
}
