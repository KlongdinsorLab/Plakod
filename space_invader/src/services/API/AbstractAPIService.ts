import {
     AchievementDetailDTO,
     BoosterDetailDTO,
     BoosterDTO,
     BossDetailDTO,
     CharacterDetailDTO,
     GameSessionDTO,
     GameSessionFinishedDTO,
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
     // return random Boss + random Booster
     abstract startGameSession(boostersId: number[]): Promise<Response<GameSessionDTO>>

     abstract getGameSession(
          gameSessionId: number
     ): Promise<Response<GameSessionDTO>>

     abstract updateGameSession(
          gameSessionId: number, 
          score: number, 
          lap: number
     ): Promise<Response<void>>

     abstract cancelGameSession(
          gameSessionId: number
     ): Promise<Response<void>>

     // updateGameSession + calculateNewLevel + calculateNewAchievement 
     // + addPlayerAchievement + addPlayerBooster 
     // + addPlayerBoosterByLevelUp
     abstract finishGameSession(
          gameSessionId: number,
          score: number, 
          lap: number,
          isReceiveBooster: boolean
     ): Promise<Response<GameSessionFinishedDTO>>

     abstract getPlayerLevel(): Promise<Response<number>>

     abstract getPlayerBoosters(): Promise<Response<BoosterDTO[]>>
     
     abstract getPlayerAchievementsId(): Promise<Response<number[]>>

     abstract getAchievement(achievementId: number): Promise<Response<AchievementDetailDTO>>

     abstract getCharacter(characterId: number): Promise<Response<CharacterDetailDTO>>

     abstract getBooster(boosterId: number): Promise<Response<BoosterDetailDTO>>

     abstract getBoss(bossId: number): Promise<Response<BossDetailDTO>>

     abstract addVas(vasScore: number): Promise<Response<void>>

     abstract getAllCharacters(): Promise<Response<CharacterDetailDTO[]>>
     
     abstract getAllBoosters(): Promise<Response<BoosterDetailDTO[]>>
     
     abstract getAllAchievements(): Promise<Response<AchievementDetailDTO[]>>
}