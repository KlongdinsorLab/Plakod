import { 
     Airflow,
     Gender, 
     StatusBooster,
     StatusGameSession,
     VasScore
} from "services/enumService";

import { 
     Players,
     Vas,
     Levels,
     Difficulties,
     GameSessions,
     Characters,
     Achievements,
     Boosters,
     Player_Characters,
     Player_Achievements,
     Player_Boosters,
     PlayerSchema,
     PlayerCharacterSchema,
     GameSessionSchema,
     PlayerBoosterSchema,
     AchievementSchema,
     CharacterSchema,
     VasSchema,
} from "./fakeDatabase";

import AbstractAPIService, {
     PlayerDTO,
     RankDTO,
     AchievementDTO,
     CharacterDTO,
     BoosterDTO,
     DifficultDTO,
     BoosterAddDTO
} from "./AbstructAPIService";


export default class MockAPIService extends AbstractAPIService {
     
     private token!: string;
     private playerId!: string;
     private isLogin: boolean;

     constructor() {
          super();
          this.token = '';
          this.isLogin = false;
     }

     // TODO make it to Singleton?

     private findPlayerLevel(playerAccumulatedScore: number): number {
          
          if (playerAccumulatedScore < 0) {
               throw new Error('Score can not be negative number.')
          }

          const n: number = Levels.length;
          let i: number = 1;
          let scoreRequire: number = Levels[i].score_require;
          let isNextLevel: boolean = playerAccumulatedScore >= scoreRequire;
          while(isNextLevel) {
               i++; // level up

               if (i >= n) {
                    break;    // max level
               }

               scoreRequire = Levels[i].score_require;
               isNextLevel = playerAccumulatedScore >= scoreRequire;
          }

          return Levels[i - 1].level;
     }

     login(tel: string): Promise<any> {
          return new Promise<any>(resolve => {
               const player = Players.find( player => player.tel === tel);
               if (player) {
                    this.playerId = player.id;
               } else {
                    throw new Error("Haven't player with this telephone.");
               } 
               
               this.isLogin = true;

               // TODO create token
               // this is example of token
               this.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
               
               resolve({message: 'OK', token: this.token});
          });
     }

     // create player
     register(
          tel: string, 
          age: number,
          gender: Gender,
          airflow: Airflow,
          difficultId: string, 
     ): Promise<any> {   
          return new Promise<any>(resolve => {
               // TODO create new ID
               const id: string = String(Players.length + 1).padStart(3, "0");
               const username: string = "";
               const birthYear: number = new Date().getFullYear() - age;
               const lastPlayedAt: Date = new Date();
               const usingCharacterId: string = "01";
               
               // switch (gender) {
               //      case "M": 
               //           gender = Gender.Male;
               //           break;
               //      case "F": 
               //           gender = Gender.Female;
               //           break;
               //      default:
               //           throw new Error(`The gender's [${gender}] is not consistent of enum Gender ('M' or 'F').`);
               // }

               const playerFound = Players.find(p =>
                    p.tel === tel
               )
               if (playerFound) {
                    throw new Error(`Have this player already, tel number: ${tel}`);
               }

               if(age < 0 || age > 200) {
                    throw new Error(`Something wrong with age: ${age}`)
               }

               const diffFound = Difficulties.find(dif =>
                    dif.id === difficultId
               )
               if (!diffFound) {
                    throw new Error(`Can't found difficult's id: ${difficultId}`)
               }

               // create DTO for database
               const player: PlayerSchema = {
                    id: id,
                    difficult_id: difficultId,
                    tel: tel,
                    username: username,
                    gender: gender,
                    birth_year: birthYear,
                    airflow: airflow,
                    last_played_at: lastPlayedAt,
                    using_character_id: usingCharacterId
               }

               // add default character
               const defaultCharacterId: string = "01"
               //this.addPlayerCharacter(defaultCharacterId);    // can't use this because register has not login yet
               const playerCharacter: PlayerCharacterSchema = {
                    player_id: id,
                    character_id: defaultCharacterId
               }
               
               // add to database
               Players.push(player);
               Player_Characters.push(playerCharacter);

               resolve({message: 'OK', playerId: id});
          });
     }

     getPlayer(): Promise<PlayerDTO> {
          return new Promise<PlayerDTO>(resolve => {
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
                         && game.status === StatusGameSession.End
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
                              return game.start_at.getTime() > today;
                    })
                    .map(
                         game => game.start_at
                    );
     
               const difficultFound = Difficulties.find( 
                    dif => dif.id === player.difficult_id
               );
               if (!difficultFound) {
                    throw new Error("Can't found difficult cause player's difficultId is invalid");
               }
               const difficultDTO: DifficultDTO = {
                    difficultId: difficultFound.id,
                    name: difficultFound.name,
                    inhaleSecond: difficultFound.inhale_second
               }

               const playerDTO: PlayerDTO = {
                    playerId: player.id,
                    username: player.username,
                    playerLevel: playerLevel,
                    airflow: player.airflow,
                    playCount: playCount,
                    playToday: playToday,
                    difficult: difficultDTO,
                    usingCharacter: player.using_character_id
               }
     
               resolve(playerDTO);

          });
     }

     updatePlayerUsername(newUsername: string): Promise<any> {
          return new Promise<any>(resolve => {
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
               
               resolve(Players[index]);
          });
     }

     updatePlayerDifficult(newDifficultId: string): Promise<any> {
          return new Promise<any>(resolve => {
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
                    dif.id === newDifficultId
               )
               if (!diffFound) {
                    throw new Error(`Can't found difficult's id: ${newDifficultId}`)
               }

               // update success
               Players[index].difficult_id = newDifficultId;
               
               resolve(Players[index]);
          });
     }

     updatePlayerAirflow(newAirflow: Airflow): Promise<any> {
          return new Promise<any>(resolve => {
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
               
               resolve(Players[index]);
          });
     }

     updatePlayerUsingCharacter(newCharacterId: string): Promise<any> {
          return new Promise<any>(resolve => {
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
               Players[index].using_character_id = newCharacterId;
               
               resolve(Players[index]);
          });
     }

     addPlayerCharacter(characterId: string): Promise<any> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const characterFound = Characters.find(
                    char => char.id === characterId
               );
               if (!characterFound) {
                    throw new Error(`Can't found this ${characterId} in database`);
               }

               const playerCharacterFound = Player_Characters.find(
                    char => char.player_id === this.playerId
                         && char.character_id === characterId
               )
               if(playerCharacterFound) {
                    throw new Error(`Player already have this character's id: ${characterId}`)
               }

               const playerCharacter: PlayerCharacterSchema = {
                    player_id: this.playerId,
                    character_id: characterId
               }

               // add to database
               Player_Characters.push(playerCharacter);
               
               resolve(characterId);
          });
     }

     getRankings(): Promise<RankDTO[]> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const ranksDTO: RankDTO[] = [];
               
               Players.forEach((player) => {
                    
                    const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                         game => game.player_id === player.id
                              && game.status === StatusGameSession.End
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

               resolve(ranksDTO)
          });
     }

     applyPlayerBooster(boostersId: string[]): Promise<any> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const resolveIndex: number[] = [];

               boostersId.forEach((boosterId) => {
                    const playerBoosters: PlayerBoosterSchema[] = Player_Boosters.filter(booster => {
                         return booster.player_id === this.playerId
                              && booster.booster_id === boosterId
                              && booster.status === StatusBooster.Available
                    });

                    if(playerBoosters.length === 0) {
                         throw new Error(`Can't found booster's id: ${boosterId}`);
                    }

                    playerBoosters.sort((a, b) => {
                         if (a.expire_at === null && b.expire_at === null) {
                             return 0; // Both dates are null, no preference
                         } else if (a.expire_at === null) {
                             return 1; // a.date is null, so it comes after b.date (not null)
                         } else if (b.expire_at === null) {
                             return -1; // b.date is null, so it comes after a.date (not null)
                         } else {
                             return a.expire_at.getTime() - b.expire_at.getTime(); // Both dates are defined, compare normally
                         }
                    });

                    const playerBooster: PlayerBoosterSchema = playerBoosters[0];     // get booster that will expire first
                    
                    // prepare for update booster's status
                    const index: number = Player_Boosters.findIndex(pb =>
                         pb === playerBooster
                    );
                    if (index === -1) {
                         throw new Error(`Something wrong. Can't found player's booster: ${playerBooster}`)
                    }
                    resolveIndex.push(index);
                    
                    // check booster that expire before function
                    if (playerBooster.expire_at) {
                         const boosterExpireAt: Date = playerBooster.expire_at as Date;
                         const isExpire: boolean = Date.now() > boosterExpireAt.getTime();
                         if (isExpire) {
                              Player_Boosters[index].status = StatusBooster.Expire;
                              throw new Error(`this booster [${boosterId}] is expire before.`)
                         }
                    }

               });

               // update all booster when they were applied successfully
               resolveIndex.forEach(
                    index => Player_Boosters[index].status = StatusBooster.Expire
               );
               
               resolve({
                    message: 'OK',
                    boostersId: boostersId
               })
          });
     }

     getPlayerBooster(): Promise<BoosterDTO> {
          return new Promise<BoosterDTO>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerBoosters: PlayerBoosterSchema[] = Player_Boosters.filter(
                    booster => booster.player_id === this.playerId
               );

               // sort booster's id
               const boosters: PlayerBoosterSchema[][] = []; 
               for (let i = 0; i < 7; i++) {
                    const booster: PlayerBoosterSchema[] = playerBoosters.filter(
                         b => b.booster_id === `0${i + 1}`  
                    );
                    boosters.push(booster);
               }

               // {
               //      "booster_1":          {"expire_date": ["2024-06-24T12:00:00.000Z","2024-06-24T13:00:00.000Z"],    "amount" : 3,},
               //      "booster_2":          {"expire_date": ["2024-06-24T09:00:00.000Z","2024-06-24T12:00:00.000Z"],    "amount" : 2,},
               //      "booster_3":          {"expire_date": [], "amount" : 30,},
               //      "booster_4":          {"expire_date": [], "amount" : 1,},
               //      "booster_5":          {"expire_date": [], "amount" : 1,},
               //      "booster_rare1":      {"expire_date": [], "amount" : 1,},
               //      "booster_rare2":      {"expire_date": [], "amount" : 1,},
               // }
               const boosterDTO: BoosterDTO = {}
               
               boosters.forEach((booster, index) => {
                    
                    // player have never seen this booster
                    if (booster.length === 0) {
                         return;
                    }

                    // player can see this booster before
                    // compound booster that permanent and limited time and available
                    // filter booster that expire before function
                    const boosterAvailable: PlayerBoosterSchema[] = booster.filter(b => {
                         if (b.status !== StatusBooster.Available) {
                              return false;
                         }

                         if (b.expire_at) {
                              const boosterExpireAt: Date = b.expire_at as Date;
                              const isExpire: boolean = Date.now() > boosterExpireAt.getTime();
                              if (isExpire) {
                                   // delete expire booster
                                   const expireIndex: number = Player_Boosters.findIndex(pb =>
                                        pb === b
                                   );
                                   if (expireIndex === -1) {
                                        throw new Error(`Something wrong. Can't found player's booster: ${b}`)
                                   }

                                   Player_Boosters[expireIndex].status = StatusBooster.Expire;

                                   console.log(`Booster [${b.booster_id}] is expire.`)
                                   return false;
                              }
                         } 

                         return true;
                    });

                    // sort expire date
                    boosterAvailable.sort((a, b) => {
                         if (a.expire_at === null && b.expire_at === null) {
                             return 0; // Both dates are null, no preference
                         } else if (a.expire_at === null) {
                             return 1; // a.date is null, so it comes after b.date (not null)
                         } else if (b.expire_at === null) {
                             return -1; // b.date is null, so it comes after a.date (not null)
                         } else {
                             return a.expire_at.getTime() - b.expire_at.getTime(); // Both dates are defined, compare normally
                         }
                    });
                    
                    let boosterProperty: string = ''
                    if (index < 5) {
                         boosterProperty = `booster${index + 1}`;
                    } else {
                         // index 5, 6
                         boosterProperty = `boosterRare${index - 4}`;
                    }
                    boosterDTO[boosterProperty] = {
                         expireAt: boosterAvailable
                              .filter(b => b.expire_at !== null)
                              .map(b => b.expire_at as Date),
                         amount: boosterAvailable.length
                    }
               });

               resolve(boosterDTO);
          });
     }

     addPlayerBoosters(boosters: BoosterAddDTO[]): Promise<any> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerBoosters: PlayerBoosterSchema[] = []
               boosters.forEach((boosterAdd) => {
                    const { boosterId, duration } = boosterAdd;
                    const now: Date = new Date();
                    
                    let expireAt: Date | null = null
                    if (duration === -1 || duration === null) {   // -1 is permanent booster
                         expireAt = null;
                    } else if (duration > 0 && duration < 128){  // 128 cap
                         const timeToExpire: number = now.getTime() + (duration * 3600000);
                         expireAt = new Date(timeToExpire);
                    } else {
                         throw new Error(`Invalid duration : ${duration}`);
                    }

                    const boosterFound = Boosters.find(b =>
                         b.id === boosterId
                    );
                    if (!boosterFound) {
                         throw new Error(`Can't found booster's id: ${boosterId}`);
                    }
                    
                    const playerBooster: PlayerBoosterSchema = {
                         player_id: this.playerId,
                         booster_id: boosterId,
                         expire_at: expireAt,
                         create_at: now,
                         status: StatusBooster.Available
                    }

                    // add to database
                    playerBoosters.push(playerBooster);
               });


               // success and add to database
               playerBoosters.forEach( pb => 
                    Player_Boosters.push(pb)
               );
               
               resolve({message: 'OK', boosters: playerBoosters});
          });
     }

     // TODO check the last gameSession that not have endAt in 30 minutes will be status "Cancel"
     createGameSession(bossId: string): Promise<any> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const id: string = String(GameSessions.length + 1).padStart(4, "0");
               const playerFound = Players.find( 
                    player => player.id === this.playerId
               );
               if (!playerFound) {
                    throw new Error('Can not find player.');
               }
               const player: PlayerSchema = playerFound as PlayerSchema;
               const now: Date = new Date();

               const GameSessionsDTO: GameSessionSchema = {
                    id: id,
                    player_id: this.playerId,
                    difficult_id: player.difficult_id,
                    boss_id: bossId,
                    score: 0,
                    lap: 0,
                    start_at: now,
                    update_at: now,
                    end_at: null,
                    status: StatusGameSession.Active
               }

               // add to database
               GameSessions.push(GameSessionsDTO);

               resolve({message: 'OK', gameSessionId: id});
          });
     }

     updateGameSession(gameSessionId: string, score: number, lap: number): Promise<any> {
          return new Promise<any>((resolve, reject) => {
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
               const timeStartAt: number = GameSessions[IndexFound].start_at.getTime();
               const isExpire: boolean = now.getTime() > timeStartAt + 1800000;
               if (isExpire) {
                    this.cancelGameSession(gameSessionId);
                    reject({message: 'this game session is expire.', isExpire: true});
                    throw new Error("this game session have time more that 30 minutes.");
               }
               
               // update
               GameSessions[IndexFound].score = score;
               GameSessions[IndexFound].lap = lap;
               GameSessions[IndexFound].update_at = now;

               // end gameSession
               if (lap >= 10) {
                    GameSessions[IndexFound].end_at = now;
                    GameSessions[IndexFound].status = StatusGameSession.End;
               }

               resolve({message: 'OK', isExpire: false});
          });
     }

     cancelGameSession(gameSessionId: string): Promise<any> {
          return new Promise<any>(resolve => {
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
               
               // update
               const now: Date = new Date();
               GameSessions[IndexFound].status = StatusGameSession.Cancel;
               GameSessions[IndexFound].update_at = now;


               resolve({message: 'OK', gameSessionId: gameSessionId});
          });
     }

     getPlayerLevel(): Promise<any> {
          
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                    game => game.player_id === this.playerId
                         && game.status === StatusGameSession.End
               );

               const playerAccumulatedScore: number = playerGameSessions.reduce(
                    (accumulator, game) => accumulator + game.score,
                    0,
               );
     
               const playerLevel: number = this.findPlayerLevel(playerAccumulatedScore);

               // TODO add booster from condition?

               resolve({message: 'OK', playerLevel: playerLevel});
          });
     }

     getPlayerAchievements(): Promise<AchievementDTO[]> {
          return new Promise<AchievementDTO[]>(resolve  => {
               // TODO add new player's achievement by examine data in database
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerAchievementsId: string[] = Player_Achievements
                    .filter(
                         a => a.player_id === this.playerId
                    )
                    .map(
                         a => a.achievement_id
                    );
               
               const playerAchievements: AchievementSchema[] = [];
               playerAchievementsId.forEach( aId => {
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
               playerAchievements.forEach( pa => {
                    const achievementDTO: AchievementDTO = {
                         achievementId: pa.id,
                         name: pa.name,
                         detail: pa.detail
                    }

                    achievementsDTO.push(achievementDTO);
               });

               resolve(achievementsDTO);
          });      
     }

     getPlayerCharacters(): Promise<CharacterDTO[]> {
          return new Promise<CharacterDTO[]>(resolve => {
               // TODO add unlock character by examine data in database
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const playerCharactersId: string[] = Player_Characters
                    .filter(
                         c => c.player_id === this.playerId
                    )
                    .map(
                         c => c.character_id
                    );
               
               const playerCharacters: CharacterSchema[] = [];
               playerCharactersId.forEach( cId => {
                    const characterFound = Characters.find(
                         c => c.id === cId
                    );
                    if (!characterFound) {
                         throw new Error(`Can't found character's id: ${cId}`);
                    }
                    const character: CharacterSchema = characterFound as CharacterSchema;

                    playerCharacters.push(character);
               });

               const charactersDTO: CharacterDTO[] = []
               playerCharacters.forEach( pc => {
                    const characterDTO: CharacterDTO = {
                         characterId: pc.id,
                         name: pc.name,
                         detail: pc.detail
                    }

                    charactersDTO.push(characterDTO);
               });

               resolve(charactersDTO);
          });
     }
 
     addVas(vasScore: VasScore): Promise<any> {
          return new Promise<any>(resolve => {
               // auth
               if (!this.isLogin) {
                    throw new Error('Please Log in.');
               }

               const id: string = String(Vas.length + 1).padStart(4, "0");
               const now: Date = new Date();

               const vasDTO: VasSchema = {
                    id: id,
                    player_id: this.playerId,
                    vas_score: vasScore,
                    create_at: now
               }

               // add to database
               Vas.push(vasDTO);

               resolve({message: 'OK', vasId: id});
          });
     }
}