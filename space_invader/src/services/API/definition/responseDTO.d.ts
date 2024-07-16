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

export interface AchievementDTO {
     achievementId: number;
     name: string;
     detail: string
}

export interface CharacterDTO {
     characterId: number;
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

export interface GameSessionStartedDTO {
     gameSessionId: number;
     bossId: number;
}

export interface GameSessionFinishedDTO {
     level: number | null;
     boosterByLevelUpId: number[];
     achievementUnlockedId: number[];
}


export interface Response<T> {
     status: number      // 200
     message: string     // ok
     response: T
}