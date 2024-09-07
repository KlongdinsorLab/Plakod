export interface PlayerDTO {
     playerId: number;
     username: string;
     playerLevel: number;
     airflow: number;
     playCount: number;
     playToday: Date[];
     difficulty: DifficultyDTO;
     selectedCharacterId: number;
     playerCharactersId: number[];
}

export interface RankDTO {
     playerId: number;
     username: string;
     accumulatedScore: number;
     accumulatedPlay: number;
}

export interface AchievementDetailDTO {
     id: number;
     name: string;
     detail: string | null;
     games_played_in_a_day: number | null;
     games_played_consecutive_days: number | null;
     accumulative_score: number | null;
     games_played: number | null;
     boosters_number: number | null;
     booster_type: string | null;
     booster_action: string | null;
     booster_unique: string | null;
     boss_id: number | null;
     boss_encounter: number | null;
     characters_unlocked: number | null;
}

export interface CharacterDetailDTO {
     characterId: number;
     name: string;
     detail: string;
}

export interface BoosterDetailDTO {
     boosterId: number;
     name: string;
     detail: string | null;
     type: string;
}

export interface BossDetailDTO {
     bossId: number;
     name: string;
     detail: string;
}

export interface BoosterDTO {
     boosterId: number;
     expireDate: (Date | null)[];
}

export interface DifficultyDTO {
     difficultyId: number;
     name: string;
     inhaleSecond: number;
}

export interface GameSessionDTO {
     id: number;
     difficulty_id: number;
     boss_id: number
     booster_drop_id: number
     booster_drop_duration: number | null
     score : number
     lap : number
     started_at: Date;
     updated_at: Date | null;
     ended_at: Date |null
     status: string
}

export interface GameSessionFinishedDTO {
     level: number | null;
     boosterByLevelUpId: number[];
     achievementUnlockedId: number[];
}

export interface LevelDTO {
     id: number;
     level: number;
     score_required: number;
     boss_id: number | null;
     booster_id_1: number | null;
     booster_id_2: number | null;
     booster_id_3: number | null;
     booster_amount_1: number | null;
     booster_amount_2: number | null;
     booster_amount_3: number | null;
}

export interface Response<T> {
     message: string     // ok
     response: T
}

export interface finishGameSessionInputDTO{
     score: number;
     lap: number;
     is_booster_received: boolean;
}