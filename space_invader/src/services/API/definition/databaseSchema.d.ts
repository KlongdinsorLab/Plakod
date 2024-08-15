import {
     Gender,
     Airflow,
     StatusGameSession,
     StatusBooster,
     VasScore
} from "services/API/definition/typeProperty"

export interface PlayerSchema {
     id: number
     difficulty_id: number;
     phone_number: string;
     username: string | mull;
     gender: Gender;
     birth_year: number;
     airflow: Airflow;
     last_played_at: Date;
     selected_character_id: number;
}

export interface DifficultySchema {
     id: number;
     name: string;
     inhale_second: number;    
}

export interface LevelSchema {
     id: number;
     level: number;
     score_required: number;
}

export interface GameSessionSchema {
     id: number;
     player_id: number;
     difficulty_id: number;
     boss_id: number;
     booster_drop_id: number;
     booster_drop_duration: number;     //by hours. if (-1) => isPermanent
     score: number;
     lap: number;
     started_at: Date;
     updated_at: Date;
     ended_at: Date | null;
     status: StatusGameSession;
}

export interface CharacterSchema {
     id: number;
     name: string;
     achievement_number_required: number;
     detail: string;
}

export interface AchievementSchema {
     id: number;
     name: string;
     detail: string;
}

export interface BoosterSchema {
     id: number;
     name: string;
     detail: string;
}

export interface PlayerCharacterSchema {
     player_id: number;
     character_id: number;
}

export interface PlayerAchievementSchema {
     player_id: number;
     achievement_id: number;
}

export interface PlayerBoosterSchema {
     player_id: number;
     booster_id: number;
     expired_at: Date | null;
     created_at: Date;
     status: StatusBooster;
}

export interface VasSchema {
     id: number;
     player_id: number;
     vas_score: VasScore;
     created_at: Date;
}

export interface BossSchema {
     id: number;
     name: string;
     detail: string;
}