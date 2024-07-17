export interface PlayerDTO {
     playerId: number;
     username: string;
     playerLevel: number;
     airflow: number;
     playCount: number;
     playToday: Date[];
     difficulty: DifficultyDTO;
     usingCharacter: number;
     playerCharacterId: number[]
}

export interface RankDTO {
     playerId: number;
     username: string;
     accumulatedScore: number;
     accumulatedPlay: number;
}

export interface AchievementDetailDTO {
     achievementId: number;
     name: string;
     detail: string
}

export interface CharacterDetailDTO {
     characterId: number;
     name: string;
     detail: string;
}

export interface BoosterDetailDTO {
     id: number;
     name: string;
     detail: string;
}

export interface BossDetailDTO {
     id: number;
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
     gameSessionId: number;
     bossId: number;
     boosterDropId: number;
     boosterDropDuration: number;
     score: number;
     lap: number;
     startedAt: Date;
}

export interface GameSessionFinishedDTO {
     level: number | null;
     boosterByLevelUpId: number[];
     achievementUnlockedId: number[];
}


export interface Response<T> {
     message: string     // ok
     response: T
}