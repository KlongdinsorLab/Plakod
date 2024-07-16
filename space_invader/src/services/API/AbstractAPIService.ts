import {
     AchievementDTO,
     BoosterDTO,
     CharacterDTO,
     GameSessionFinishedDTO,
     GameSessionStartedDTO,
     PlayerDTO,
     RankDTO,
     Response
} from "services/API/definition/responseDTO"

export default abstract class AbstractAPIService {
     
     constructor() {
          if (new.target === AbstractAPIService) {
              throw new TypeError("Cannot instantiate abstract class");
          }
     }
     
     // TODO getHeader()
     // getHeader() {
     //      throw new Error("Method 'get header' must be implemented");
     // }

     // return token
     abstract login(phoneNumber: string): Promise<Response<string>>

     abstract register(
          phoneNumber: string, 
          age: number,
          gender: string,
          airflow: number,
          difficultyId: number,
     ): Promise<Response<void>>

     abstract updatePlayerUsername(
          newUsername: string
     ): Promise<Response<void>>

     abstract updatePlayerDifficulty(
          newDifficultyId: number
     ): Promise<Response<void>>

     abstract updatePlayerAirflow(
          newAirflow: number
     ): Promise<Response<void>>

     abstract updatePlayerUsingCharacter(
          newCharacterId: number
     ): Promise<Response<void>>

     // check condition achievement-required-number
     abstract addPlayerCharacter(
          characterId: number
     ): Promise<Response<void>>

     abstract getPlayer(): Promise<Response<PlayerDTO>>;

     abstract getRankings(): Promise<Response<RankDTO[]>>

     abstract getMyRanking(): Promise<Response<RankDTO>>

     // applyPlayerBooster + createGameSession
     abstract startGameSession(): Promise<Response<GameSessionStartedDTO>>

     abstract updateGameSession(
          gameSessionId: number, 
          score: number, 
          lap: number
     ): Promise<Response<void>>

     abstract cancelGameSession(
          gameSessionId: number
     ): Promise<Response<void>>

     // updateGameSession + calculateNewLevel + calculateNewAchievement + addPlayerBooster
     abstract finishGameSession(
          gameSessionId: number,
          score: number, 
          lap: number,
     ): Promise<Response<GameSessionFinishedDTO>>

     abstract getPlayerLevel(): Promise<Response<number>>

     abstract getPlayerBoosters(): Promise<Response<BoosterDTO[]>>
     
     abstract getPlayerAchievements(): Promise<Response<AchievementDTO[]>>

     abstract getAchievement(achievementId: number) : Promise<Response<AchievementDTO>>

     abstract getCharacter(characterId: number) : Promise<Response<CharacterDTO>>

     abstract getBooster(boosterId: number) : Promise<Response<BoosterDTO>>

     abstract addVas(vasScore: number): Promise<Response<void>>

     // abstract applyPlayerBooster(
     //      boosterId: string[]
     // ): Promise<any>

     // abstract createGameSession(
     //      bossId: string
     // ): Promise<any>

     // abstract addPlayerBoosters(
     //      boosters: BoosterAddDTO[]
     // ): Promise<any>

     //abstract getPlayerCharacters(): Promise<CharacterDTO[]>
     

}