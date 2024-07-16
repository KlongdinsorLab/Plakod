import { 
     Players,
     Vas,
     Levels,
     Difficulties,
     GameSessions,
     Characters,
     Achievements,
     PlayerCharacters,
     PlayerAchievements,
     PlayerBoosters,
} from "./fakeDatabase";

import AbstractAPIService from "../AbstractAPIService";

import { 
     Response, 
     RankDTO, 
     GameSessionStartedDTO, 
     GameSessionFinishedDTO, 
     BoosterDTO, 
     AchievementDTO,
     CharacterDTO,
     PlayerDTO,
     DifficultyDTO
} from "../definition/responseDTO";

import { 
     PlayerSchema, 
     PlayerCharacterSchema, 
     GameSessionSchema, 
     PlayerBoosterSchema, 
     AchievementSchema,
     VasSchema 
} from "../definition/databaseSchema";

import { 
     Gender, 
     Airflow, 
     VasScore 
} from "../definition/typeProperty";


export default class MockAPIService extends AbstractAPIService {
     
     private token!: string;
     private playerId!: number;
     private isLogin: boolean;

     // TODO make it to Singleton?
     constructor() {
          super();
          this.token = '';
          this.isLogin = false;
     }


     private findPlayerLevel(playerAccumulatedScore: number): number {
          
          if (playerAccumulatedScore < 0) {
               throw new Error('Score can not be negative number.')
          }

          const n: number = Levels.length;
          let i: number = 1;
          let scoreRequire: number = Levels[i].score_required;
          let isNextLevel: boolean = playerAccumulatedScore >= scoreRequire;
          while(isNextLevel) {
               i++; // level up

               if (i >= n) {
                    break;    // max level
               }

               scoreRequire = Levels[i].score_required;
               isNextLevel = playerAccumulatedScore >= scoreRequire;
          }

          return Levels[i - 1].level;
     }

     login(phoneNumber: string): Promise<Response<string>> {
          return new Promise<Response<string>>(resolve => {
               const player = Players.find( player => player.phone_number === phoneNumber);
               if (player) {
                    this.playerId = player.id;
               } else {
                    throw new Error("Haven't player with this telephone.");
               } 
               
               this.isLogin = true;

               // TODO create token
               // this is example of token
               this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
               
               resolve({
                    status: 200, 
                    message: 'OK', 
                    response: this.token
               });
          });
     }

     // create player
     register(
          phoneNumber: string, 
          age: number,
          gender: Gender,
          airflow: Airflow,
          difficultyId: number, 
     ): Promise<Response<void>> {   
          return new Promise<Response<void>>(resolve => {
               // TODO create new ID
               const newId: number = Players.length + 1;
               const username: string | null = null;
               const birthYear: number = new Date().getFullYear() - age;
               const lastPlayedAt: Date = new Date();
               const defaultUsingCharacterId: number = 1;
               

               const playerFound = Players.find(p =>
                    p.phone_number === phoneNumber
               )
               if (playerFound) {
                    throw new Error(`Have this player already, tel number: ${phoneNumber}`);
               }

               if(age < 0 || age > 200) {
                    throw new Error(`Something wrong with age: ${age}`)
               }

               const diffFound = Difficulties.find(dif =>
                    dif.id === difficultyId
               )
               if (!diffFound) {
                    throw new Error(`Can't found difficult's id: ${difficultyId}`)
               }

               // create DTO for database
               const player: PlayerSchema = {
                    id: newId,
                    difficulty_id: difficultyId,
                    phone_number: phoneNumber,
                    username: username,
                    gender: gender,
                    birth_year: birthYear,
                    airflow: airflow,
                    last_played_at: lastPlayedAt,
                    selected_character_id: defaultUsingCharacterId
               }

               // add default character
               const defaultCharacterId: number = 1
               //this.addPlayerCharacter(defaultCharacterId);    // can't use this because register has not login yet
               const playerCharacter: PlayerCharacterSchema = {
                    player_id: newId,
                    character_id: defaultCharacterId
               }
               
               // add to database
               Players.push(player);
               PlayerCharacters.push(playerCharacter);


               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     getPlayer(): Promise<Response<PlayerDTO>> {
          return new Promise<Response<PlayerDTO>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerFound = Players.find( 
                    player => player.id === this.playerId
               );
               if (!playerFound) {
                    throw new Error('Can not find player.');
               }
               const player: PlayerSchema = playerFound as PlayerSchema;
     
               const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                    game => game.player_id === this.playerId
                         && game.status === "END"
               );
     
               const playerAccumulatedScore: number = playerGameSessions.reduce(
                    (accumulator, game) => accumulator + game.score,
                    0,
               );
               console.log('playerAccumulatedScore:', playerAccumulatedScore)
     
               const playerLevel: number = this.findPlayerLevel(playerAccumulatedScore);
     
               const playCount: number = playerGameSessions.length;
     
               const playToday: Date[] = playerGameSessions
                    .filter(
                         game => {
                              const today = new Date().setHours(0, 0, 0, 0);
                              return game.started_at.getTime() > today;
                    })
                    .map(
                         game => game.started_at
                    );
     
               const difficultyFound = Difficulties.find( 
                    dif => dif.id === player.difficulty_id
               );
               if (!difficultyFound) {
                    throw new Error("Can't found difficult cause player's difficultId is invalid");
               }
               const difficultDTO: DifficultyDTO = {
                    difficultyId: difficultyFound.id,
                    name: difficultyFound.name,
                    inhaleSecond: difficultyFound.inhale_second
               }

               const playerCharacterId: number[] = PlayerCharacters
                    .filter(
                         c => c.player_id === this.playerId
                    )
                    .map(
                         c => c.character_id
                    );

               const playerDTO: PlayerDTO = {
                    playerId: player.id,
                    username: player.username,
                    playerLevel: playerLevel,
                    airflow: player.airflow,
                    playCount: playCount,
                    playToday: playToday,
                    difficulty: difficultDTO,
                    usingCharacter: player.selected_character_id,
                    playerCharacterId: playerCharacterId
               }
     
               resolve({
                    status: 200,
                    message: 'OK',
                    response: playerDTO
               });

          });
     }

     updatePlayerUsername(newUsername: string): Promise<Response<void>> {
          return new Promise<Response<void>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const index: number = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    throw new Error(`Can not find player's id: ${this.playerId}`);
               }

               // update success
               Players[index].username = newUsername;
               
               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     updatePlayerDifficulty(newDifficultyId: number): Promise<Response<void>> {
          return new Promise<Response<void>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const index: number = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    throw new Error(`Can not find player's id: ${this.playerId}`);
               }
               const diffFound = Difficulties.find(dif =>
                    dif.id === newDifficultyId
               )
               if (!diffFound) {
                    throw new Error(`Can't found difficult's id: ${newDifficultyId}`)
               }

               // update success
               Players[index].difficulty_id = newDifficultyId;
               
               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     updatePlayerAirflow(newAirflow: Airflow): Promise<Response<void>> {
          return new Promise<Response<void>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const index: number = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    throw new Error(`Can not find player's id: ${this.playerId}`);
               }

               // update success
               Players[index].airflow = newAirflow;
               
               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     updatePlayerUsingCharacter(newCharacterId: number): Promise<Response<void>> {
          return new Promise<Response<void>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const index: number = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    throw new Error(`Can not find player's id: ${this.playerId}`);
               }

               const characterFound = Characters.find(
                    char => char.id === newCharacterId
               );
               if (!characterFound) {
                    throw new Error(`Can't found this ${newCharacterId} in database`);
               }

               // update success
               Players[index].selected_character_id = newCharacterId;
               
               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     // addPlayerCharacter(characterId: string): Promise<any> {
     //      return new Promise<any>(resolve => {
     //           // auth
     //           if (!this.isLogin) {
     //                throw new Error('Please Log in.');
     //           }

     //           const characterFound = Characters.find(
     //                char => char.id === characterId
     //           );
     //           if (!characterFound) {
     //                throw new Error(`Can't found this ${characterId} in database`);
     //           }

     //           const playerCharacterFound = PlayerCharacters.find(
     //                char => char.player_id === this.playerId
     //                     && char.character_id === characterId
     //           )
     //           if(playerCharacterFound) {
     //                throw new Error(`Player already have this character's id: ${characterId}`)
     //           }

     //           const playerCharacter: PlayerCharacterSchema = {
     //                player_id: this.playerId,
     //                character_id: characterId
     //           }

     //           // add to database
     //           PlayerCharacters.push(playerCharacter);
               
     //           resolve(characterId);
     //      });
     // }

     getRankings(): Promise<Response<RankDTO[]>> {
          return new Promise<Response<RankDTO[]>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const ranksDTO: RankDTO[] = [];
               
               Players.forEach((player) => {
                    
                    const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                         game => game.player_id === player.id
                              && game.status === "END"
                    );

                    const playerAccumulatedScore: number = playerGameSessions.reduce(
                         (accumulator, game) => accumulator + game.score,
                         0,
                    );

                    const playCount: number = playerGameSessions.length;

                    const rankDTO: RankDTO = {
                         playerId: player.id,
                         username: player.username,
                         accumulatedScore: playerAccumulatedScore,
                         accumulatedPlay: playCount
                    }

                    ranksDTO.push(rankDTO);
               });

               resolve({
                    status: 200,
                    message: "OK",
                    response: ranksDTO
               });
          });
     }

     // applyPlayerBooster(boostersId: string[]): Promise<any> {
     //      return new Promise<any>(resolve => {
     //           // auth
     //           if (!this.isLogin) {
     //                throw new Error('Please Log in.');
     //           }

     //           const resolveIndex: number[] = [];

     //           boostersId.forEach((boosterId) => {
     //                const playerBoosters: PlayerBoosterSchema[] = PlayerBoosters.filter(booster => {
     //                     return booster.player_id === this.playerId
     //                          && booster.booster_id === boosterId
     //                          && booster.status === StatusBooster.Available
     //                });

     //                if(playerBoosters.length === 0) {
     //                     throw new Error(`Can't found booster's id: ${boosterId}`);
     //                }

     //                playerBoosters.sort((a, b) => {
     //                     if (a.expire_at === null && b.expire_at === null) {
     //                         return 0; // Both dates are null, no preference
     //                     } else if (a.expire_at === null) {
     //                         return 1; // a.date is null, so it comes after b.date (not null)
     //                     } else if (b.expire_at === null) {
     //                         return -1; // b.date is null, so it comes after a.date (not null)
     //                     } else {
     //                         return a.expire_at.getTime() - b.expire_at.getTime(); // Both dates are defined, compare normally
     //                     }
     //                });

     //                const playerBooster: PlayerBoosterSchema = playerBoosters[0];     // get booster that will expire first
                    
     //                // prepare for update booster's status
     //                const index: number = PlayerBoosters.findIndex(pb =>
     //                     pb === playerBooster
     //                );
     //                if (index === -1) {
     //                     throw new Error(`Something wrong. Can't found player's booster: ${playerBooster}`)
     //                }
     //                resolveIndex.push(index);
                    
     //                // check booster that expire before function
     //                if (playerBooster.expire_at) {
     //                     const boosterExpireAt: Date = playerBooster.expire_at as Date;
     //                     const isExpire: boolean = Date.now() > boosterExpireAt.getTime();
     //                     if (isExpire) {
     //                          PlayerBoosters[index].status = StatusBooster.Expire;
     //                          throw new Error(`this booster [${boosterId}] is expire before.`)
     //                     }
     //                }

     //           });

     //           // update all booster when they were applied successfully
     //           resolveIndex.forEach(
     //                index => PlayerBoosters[index].status = StatusBooster.Expire
     //           );
               
     //           resolve({
     //                message: 'OK',
     //                boostersId: boostersId
     //           })
     //      });
     // }

     getPlayerBoosters(): Promise<Response<BoosterDTO[]>> {
          return new Promise<Response<BoosterDTO[]>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerBoosters: PlayerBoosterSchema[] = PlayerBoosters.filter(
                    booster => booster.player_id === this.playerId
               );

               // sort booster's id
               const boosters: PlayerBoosterSchema[][] = []; 
               for (let i = 1; i < PlayerBoosters.length + 1; i++) {
                    const booster: PlayerBoosterSchema[] = playerBoosters.filter(
                         b => b.booster_id === i + 1  
                    );
                    boosters.push(booster);
               }

               // [
               //      {boosterId: 1,      expireDate: ["2024-06-24T12:00:00.000Z","2024-06-24T13:00:00.000Z"],    amount : 3 },
               //      {boosterId: 2 ,     expireDate: ["2024-06-24T09:00:00.000Z","2024-06-24T12:00:00.000Z"],    amount : 2 },
               //      {boosterId: 3 ,     expireDate: [], amount : 30},
               //      {boosterId: 4 ,     expireDate: [], amount : 1},
               //      {boosterId: 5 ,     expireDate: [], amount : 1},
               //      {boosterId: 6 ,     expireDate: [], amount : 1},
               //      {boosterId: 7 ,     expireDate: [], amount : 0},
               // ]
               const boostersDTO: BoosterDTO[] = []
               
               boosters.forEach((booster) => {
                    
                    // player have never seen this booster
                    if (booster.length === 0) {
                         return;
                    }

                    // player can see this booster before
                    // compound booster that permanent and limited time and available
                    // filter booster that expire before function
                    const boosterAvailable: PlayerBoosterSchema[] = booster.filter(b => {
                         if (b.status !== "AVAILABLE") {
                              return false;
                         }

                         // check expire
                         if (b.expired_at) {
                              const boosterExpireAt: Date = b.expired_at as Date;
                              const isExpire: boolean = Date.now() > boosterExpireAt.getTime();
                              if (isExpire) {
                                   // delete expire booster
                                   const expireIndex: number = PlayerBoosters.findIndex(pb =>
                                        pb === b
                                   );
                                   if (expireIndex === -1) {
                                        throw new Error(`Something wrong. Can't found player's booster: ${b}`)
                                   }

                                   PlayerBoosters[expireIndex].status = "EXPIRE";

                                   console.log(`Booster [${b.booster_id}] is expire.`)
                                   return false;
                              }
                         } 

                         return true;
                    });

                    // sort expire date
                    boosterAvailable.sort((a, b) => {
                         if (a.expired_at === null && b.expired_at === null) {
                             return 0; // Both dates are null, no preference
                         } else if (a.expired_at === null) {
                             return 1; // a.date is null, so it comes after b.date (not null)
                         } else if (b.expired_at === null) {
                             return -1; // b.date is null, so it comes after a.date (not null)
                         } else {
                             return a.expired_at.getTime() - b.expired_at.getTime(); // Both dates are defined, compare normally
                         }
                    });
                    
                    const BoosterDTO: BoosterDTO = {
                         boosterId: boosterAvailable[0].booster_id,
                         expireDate: boosterAvailable
                              .filter(b => b.expired_at !== null)
                              .map(b => b.expired_at as Date),
                         amount: boosterAvailable.length
                    }
                    boostersDTO.push(BoosterDTO);
               });

               resolve({
                    status: 200,
                    message: "OK",
                    response: boostersDTO
               });
          });
     }

     // addPlayerBoosters(boosters: BoosterAddDTO[]): Promise<any> {
     //      return new Promise<any>(resolve => {
     //           // auth
     //           if (!this.isLogin) {
     //                throw new Error('Please Log in.');
     //           }

     //           const playerBoosters: PlayerBoosterSchema[] = []
     //           boosters.forEach((boosterAdd) => {
     //                const { boosterId, duration } = boosterAdd;
     //                const now: Date = new Date();
                    
     //                let expireAt: Date | null = null
     //                if (duration === -1 || duration === null) {   // -1 is permanent booster
     //                     expireAt = null;
     //                } else if (duration > 0 && duration < 128){  // 128 cap
     //                     const timeToExpire: number = now.getTime() + (duration * 3600000);
     //                     expireAt = new Date(timeToExpire);
     //                } else {
     //                     throw new Error(`Invalid duration : ${duration}`);
     //                }

     //                const boosterFound = Boosters.find(b =>
     //                     b.id === boosterId
     //                );
     //                if (!boosterFound) {
     //                     throw new Error(`Can't found booster's id: ${boosterId}`);
     //                }
                    
     //                const playerBooster: PlayerBoosterSchema = {
     //                     player_id: this.playerId,
     //                     booster_id: boosterId,
     //                     expire_at: expireAt,
     //                     create_at: now,
     //                     status: StatusBooster.Available
     //                }

     //                // add to database
     //                playerBoosters.push(playerBooster);
     //           });


     //           // success and add to database
     //           playerBoosters.forEach( pb => 
     //                PlayerBoosters.push(pb)
     //           );
               
     //           resolve({message: 'OK', boosters: playerBoosters});
     //      });
     // }

     // // TODO check the last gameSession that not have endAt in 30 minutes will be status "Cancel"
     // createGameSession(bossId: string): Promise<any> {
     //      return new Promise<any>(resolve => {
     //           // auth
     //           if (!this.isLogin) {
     //                throw new Error('Please Log in.');
     //           }

     //           const id: string = String(GameSessions.length + 1).padStart(4, "0");
     //           const playerFound = Players.find( 
     //                player => player.id === this.playerId
     //           );
     //           if (!playerFound) {
     //                throw new Error('Can not find player.');
     //           }
     //           const player: PlayerSchema = playerFound as PlayerSchema;
     //           const now: Date = new Date();

     //           const GameSessionsDTO: GameSessionSchema = {
     //                id: id,
     //                player_id: this.playerId,
     //                difficult_id: player.difficult_id,
     //                boss_id: bossId,
     //                score: 0,
     //                lap: 0,
     //                start_at: now,
     //                update_at: now,
     //                end_at: null,
     //                status: StatusGameSession.Active
     //           }

     //           // add to database
     //           GameSessions.push(GameSessionsDTO);

     //           resolve({message: 'OK', gameSessionId: id});
     //      });
     // }

     updateGameSession(gameSessionId: number, score: number, lap: number): Promise<Response<void>> {
          return new Promise<Response<void>>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const IndexFound: number = GameSessions.findIndex( gs =>
                    gs.id === gameSessionId
               );
               if (IndexFound === -1) {
                    throw new Error(`Can't found index of gameSession's id: ${gameSessionId}`);
               }

               // check expire of gameSession
               // expire in 30 minutes
               const now: Date = new Date();
               const timeStartAt: number = GameSessions[IndexFound].started_at.getTime();
               const isExpire: boolean = now.getTime() > timeStartAt + 1800000;
               if (isExpire) {
                    this.cancelGameSession(gameSessionId);
                    reject({message: 'this game session is expire.', isExpire: true});
                    throw new Error("This game session has time more that 30 minutes.");
               }

               // end gameSession
               if (lap > 10) {
                    throw new Error("This game session needs to end now.")
               }
               
               // update
               GameSessions[IndexFound].score = score;
               GameSessions[IndexFound].lap = lap;
               GameSessions[IndexFound].updated_at = now;

               
               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     cancelGameSession(gameSessionId: number): Promise<Response<void>> {
          return new Promise<Response<void>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const IndexFound: number = GameSessions.findIndex( gs =>    // game session
                    gs.id === gameSessionId
               );
               if (IndexFound === -1) {
                    throw new Error(`Can't found index of gameSession's id: ${gameSessionId}`);
               }
               
               // update
               const now: Date = new Date();
               GameSessions[IndexFound].status = "CANCEL";
               GameSessions[IndexFound].updated_at = now;


               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     getPlayerLevel(): Promise<Response<number>> {
          
          return new Promise<Response<number>>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                    game => game.player_id === this.playerId
                         && game.status === "END"
               );

               const playerAccumulatedScore: number = playerGameSessions.reduce(
                    (accumulator, game) => accumulator + game.score,
                    0,
               );
     
               const playerLevel: number = this.findPlayerLevel(playerAccumulatedScore);

               // TODO add booster from condition?

               resolve({
                    status: 200,
                    message: 'OK',
                    response: playerLevel
               });
          });
     }

     getPlayerAchievements(): Promise<Response<AchievementDTO[]>> {
          return new Promise<Response<AchievementDTO[]>>(resolve  => {
               // TODO add new player's achievement by examine data in database
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerAchievementsId: number[] = PlayerAchievements
                    .filter(
                         a => a.player_id === this.playerId
                    )
                    .map(
                         a => a.achievement_id
                    );
               
               const playerAchievements: AchievementSchema[] = [];
               playerAchievementsId.forEach( aId => {  // achievement id
                    const achievementFound = Achievements.find(
                         a => a.id === aId
                    );
                    if (!achievementFound) {
                         throw new Error(`Can't found achievement's id: ${aId}`);
                    }
                    const achievement: AchievementSchema = achievementFound as AchievementSchema;

                    playerAchievements.push(achievement);
               });

               const achievementsDTO: AchievementDTO[] = []
               playerAchievements.forEach( pa => {     // player achievement
                    const achievementDTO: AchievementDTO = {
                         achievementId: pa.id,
                         name: pa.name,
                         detail: pa.detail
                    }

                    achievementsDTO.push(achievementDTO);
               });

               resolve({
                    status: 200,
                    message: 'OK',
                    response: achievementsDTO
               });
          });      
     }

     // getPlayerCharacters(): Promise<CharacterDTO[]> {
     //      return new Promise<CharacterDTO[]>(resolve => {
     //           // TODO add unlock character by examine data in database
     //           // auth
     //           if (!this.isLogin) {
     //                throw new Error('Please Log in.');
     //           }

     //           const playerCharactersId: string[] = PlayerCharacters
     //                .filter(
     //                     c => c.player_id === this.playerId
     //                )
     //                .map(
     //                     c => c.character_id
     //                );
               
     //           const playerCharacters: CharacterSchema[] = [];
     //           playerCharactersId.forEach( cId => {
     //                const characterFound = Characters.find(
     //                     c => c.id === cId
     //                );
     //                if (!characterFound) {
     //                     throw new Error(`Can't found character's id: ${cId}`);
     //                }
     //                const character: CharacterSchema = characterFound as CharacterSchema;

     //                playerCharacters.push(character);
     //           });

     //           const charactersDTO: CharacterDTO[] = []
     //           playerCharacters.forEach( pc => {
     //                const characterDTO: CharacterDTO = {
     //                     characterId: pc.id,
     //                     name: pc.name,
     //                     detail: pc.detail
     //                }

     //                charactersDTO.push(characterDTO);
     //           });

     //           resolve(charactersDTO);
     //      });
     // }
 
     addVas(vasScore: VasScore): Promise<any> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const id: number = Vas.length + 1;
               const now: Date = new Date();

               const vasDTO: VasSchema = {
                    id: id,
                    player_id: this.playerId,
                    vas_score: vasScore,
                    created_at: now
               }

               // add to database
               Vas.push(vasDTO);

               resolve({
                    status: 200,
                    message: 'OK',
                    response: undefined
               });
          });
     }

     getMyRanking(): Promise<Response<RankDTO>> {
          throw new Error("Method not implemented.");
     }
     startGameSession(): Promise<Response<GameSessionStartedDTO>> {
          throw new Error("Method not implemented.");
     }
     finishGameSession(gameSessionId: number, score: number, lap: number): Promise<Response<GameSessionFinishedDTO>> {
          throw new Error("Method not implemented. " + gameSessionId + score + lap);
     }
     addPlayerCharacter(characterId: number): Promise<Response<void>> {
          throw new Error("Method not implemented. " + characterId);
     }
     getAchievement(achievementId: number): Promise<Response<AchievementDTO>> {
          throw new Error("Method not implemented. " + achievementId);
     }
     getCharacter(characterId: number): Promise<Response<CharacterDTO>> {
          throw new Error("Method not implemented. " + characterId);
     }
     getBooster(boosterId: number): Promise<Response<BoosterDTO>> {
          throw new Error("Method not implemented. " + boosterId);
     }
}