export interface PlayerDTO {
     playerId: string;
     username: string;
     playerLevel: number;
     airflow: number;
     playCount: number;
     playToday: Date[];
     difficult: DifficultDTO;
     usingCharacter: string;
}

export interface RankDTO {
     playerId: string;
     username: string;
     accumulatedScore: number;
     accumulatedPlay: number;
}

export interface LevelDTO {
     level: number;
     boosters: BoosterDTO;
}

export interface AchievementDTO {
     achievementId: string;
     name: string;
     detail: string
}

export interface CharacterDTO {
     characterId: string;
     name: string;
     detail: string;
}

export interface BoosterDTO {
     [key: string]: {
          expireAt: Date[];
          amount: number
     };
}

export interface DifficultDTO {
     difficultId: string;
     name: string;
     inhaleSecond: number;
}

export interface BoosterAddDTO {
     boosterId: string,
     duration: number    // hours. if (-1) => isPermanent
}


export default abstract class AbstractAPIService {
     
     constructor() {
          if (new.target === AbstractAPIService) {
              throw new TypeError("Cannot instantiate abstract class");
          }
     }
     
     // getHeader() {
     //      throw new Error("Method 'get header' must be implemented");
     // }

     // Abstract functions (to be implemented by subclasses)
     abstract login(tel: string): Promise<any>

     abstract register(
          tel: string, 
          age: number,
          gender: string,
          airflow: number,
          difficultId: string,
     ): Promise<any>

     abstract updatePlayerUsername(newUsername: string): Promise<any>

     abstract updatePlayerDifficult(newDifficultId: string): Promise<any>

     abstract updatePlayerAirflow(newAirflow: number): Promise<any>

     abstract updatePlayerUsingCharacter(newCharacterId: string): Promise<any>

     abstract addPlayerCharacter(characterId: string): Promise<any>

     abstract getPlayer(): Promise<PlayerDTO>;

     abstract getRankings(): Promise<RankDTO[]>

     abstract applyPlayerBooster(boostersId: string[]): Promise<any>

     abstract createGameSession(): Promise<any>

     abstract updateGameSession(): Promise<any>

     abstract getPlayerLevelUp(): Promise<LevelDTO>

     abstract getPlayerBooster(): Promise<BoosterDTO>
     
     abstract addPlayerBoosters(boosters: BoosterAddDTO[]): Promise<any>

     abstract getPlayerAchievements(): Promise<AchievementDTO[]>

     abstract getPlayerCharacters(): Promise<CharacterDTO>

}