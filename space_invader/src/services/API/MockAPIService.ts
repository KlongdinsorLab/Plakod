import { 
     Gender, 
     StatusBooster
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
     PlayerBoosterSchema
} from "./fakeDatabase";

import AbstractAPIService, {
     PlayerDTO,
     RankDTO,
     LevelDTO,
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

     private findPlayerLevel(playerAccumulatedScore: number): number {
          
          if (playerAccumulatedScore < 0) {
               throw new Error('Score can not be negative number.')
          }

          let i = 1;
          const n = Levels.length;
          while(i < n) {
               const scoreRequire = Levels[i].score_require;
               const isNextLevel = playerAccumulatedScore > scoreRequire;
       
               if (isNextLevel) {
                    i++; // level up
               } else {
                    return Levels[i - 1].level; // on level
               }
          }

          return Levels[n - 1].level;   // max level
     }

     login(tel: string): Promise<any> {
          return new Promise<string>((resolve, reject) => {
               const player = Players.find( player => player.tel === tel);
               if (player) {
                    this.playerId = player.id;
               } else {
                    reject("Haven't player with this telephone.");
               } 
               
               this.isLogin = true;

               // TODO create token
               this.token = "tHiSiSToKen";
               
               resolve(this.token);
          });
     }

     // create player
     register(
          tel: string, 
          age: number,
          gender: string,
          airflow: number,
          difficultId: string, 
     ): Promise<any> {   
          return new Promise<any>( resolve => {
               // TODO create new ID
               const id: string = String(Players.length).padStart(3, "0");
               const username: string = "";
               const birthYear: number = new Date().getFullYear() - age;
               const lastPlayedAt: Date = new Date();
               const usingCharacterId: string = "01";
               
               switch (gender) {
                    case "M": 
                         gender = Gender.Male;
                         break;
                    case "F": 
                         gender = Gender.Female;
                         break;
                    default: 
                         throw new Error("Gender is not consistent of enum Gender.");
               }

               // create DTO for database
               const player: PlayerSchema = {
                    id: id,
                    difficult_id: difficultId,
                    tel: tel,
                    username: username,
                    gender: gender as Gender,
                    birth_year: birthYear,
                    airflow: airflow,
                    last_played_at: lastPlayedAt,
                    using_character_id: usingCharacterId
               }

               // add default character
               const defaultCharacterId: string = "01"
               this.addPlayerCharacter(defaultCharacterId);
               
               // add to database
               Players.push(player);

               resolve(id);
          });
     }

     getPlayer(): Promise<PlayerDTO> {
          return new Promise<PlayerDTO>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const playerFound = Players.find( 
                    player => player.id === this.playerId
               );
               if (!playerFound) {
                    reject('Can not find player.');
               }
               const player: PlayerSchema = playerFound as PlayerSchema;
     
               const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                    game => game.player_id === this.playerId
               );
     
               const playerAccumulatedScore: number = playerGameSessions.reduce(
                    (accumulator, game) => accumulator + game.score,
                    0,
               );
     
               const playerLevel: number = this.findPlayerLevel(playerAccumulatedScore);
     
               const playCount: number = playerGameSessions.length;
     
               const playToday: Date[] = playerGameSessions
                    .filter(
                         game => {
                              const now = new Date().setHours(0, 0, 0, 0);
                              return game.start_at.getTime() > now;
                    })
                    .map(
                         game => game.start_at
                    );
     
               const difficultFound = Difficulties.find( 
                    dif => dif.id === player.difficult_id
               );
               if (!difficultFound) {
                    throw new Error("Can't found difficult cause player's difficultId is invalid")
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
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const index = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    reject("Can not find player's id");
               }

               // update success
               Players[index].username = newUsername;
               resolve(Players[index]);
          });
     }

     updatePlayerDifficult(newDifficultId: string): Promise<any> {
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const index = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    reject("Can not find player's id");
               }

               // update success
               Players[index].difficult_id = newDifficultId;
               resolve(Players[index]);
          });
     }

     updatePlayerAirflow(newAirflow: number): Promise<any> {
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const index = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    reject("Can not find player's id");
               }

               // update success
               Players[index].airflow = newAirflow;
               resolve(Players[index]);
          });
     }

     updatePlayerUsingCharacter(newCharacterId: string): Promise<any> {
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const index = Players.findIndex( 
                    player => player.id === this.playerId
               );
               if (index === -1) {
                    
                    // not success
                    reject("Can not find player's id");
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
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
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
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const ranksDTO: RankDTO[] = [];
               
               Players.forEach((player) => {
                    
                    const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
                         game => game.player_id === player.id
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
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const resolveIndex: number[] = [];

               boostersId.forEach((boosterId) => {
                    const playerBoosters: PlayerBoosterSchema[] = Player_Boosters.filter(booster => {
                         return booster.player_id === this.playerId
                              && booster.booster_id === boosterId
                              && booster.status === StatusBooster.Available
                    });

                    if(!playerBoosters) {
                         reject(`Can't found booster's id: ${boosterId}`);
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

                    const playerBooster = playerBoosters[0];     // get booster that will expire first
                    
                    // prepare for update booster's status
                    const index = Player_Boosters.findIndex(pb =>
                         pb === playerBooster
                    );
                    resolveIndex.push(index);
                    
                    // check booster that expire before function
                    if (playerBooster.expire_at) {
                         const boosterExpireAt: Date = playerBooster.expire_at as Date;
                         const isExpire = Date.now() > boosterExpireAt.getTime();
                         if (isExpire) {
                              Player_Boosters[index].status = StatusBooster.Expire;
                              reject(`this booster [${boosterId}] is expire before.`)
                         }
                    }

               });

               // update all booster was applied successfully
               resolveIndex.forEach(
                    index => Player_Boosters[index].status = StatusBooster.Expire
               );
               
               resolve({
                    message: 'ok',
                    boostersId: boostersId
               })
          });
     }

     getPlayerBooster(): Promise<BoosterDTO> {
          return new Promise<BoosterDTO>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const playerBoosters = Player_Boosters.filter(
                    booster => booster.player_id === this.playerId
               );

               // sort booster's id
               const boosters = []; 
               for (let i = 0; i < 7; i++) {
                    const booster = playerBoosters.filter(
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
                    if (!booster) return;

                    // player can see this booster before
                    // compound booster that permanent and limited time and available
                    // filter booster that expire before function
                    const boosterAvailable = booster.filter(b => {
                         if(b.expire_at) {
                              const boosterExpireAt: Date = b.expire_at as Date;
                              const isExpire = Date.now() > boosterExpireAt.getTime();
                              if (isExpire) {
                                   // delete expire booster
                                   const expireIndex = Player_Boosters.findIndex(pb =>
                                        pb === b
                                   );
                                   Player_Boosters[expireIndex].status = StatusBooster.Expire;
                                   return false;
                              }
                         } 

                         return b.status === StatusBooster.Available;
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
                    
                    let boosterProperty = ''
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
          return new Promise<any>((resolve, reject) => {
               // auth
               if (!this.isLogin) {
                    reject('Please Log in.');
               }

               const playerBoosters: PlayerBoosterSchema[] = []
               boosters.forEach((boosterAdd) => {
                    const { boosterId, duration } = boosterAdd;
                    const now = new Date();
                    
                    let expireAt: Date | null = null
                    if (duration === -1 || duration === null) {   // -1 is permanent booster
                         expireAt = null;
                    } else if (duration > 0){
                         const timeToExpire = now.getTime() + (duration * 3600000);
                         expireAt = new Date(timeToExpire);
                    } else {
                         reject(`Invalid duration : ${duration}`);
                    }

                    const boosterFound = Boosters.find(b =>
                         b.id === boosterId
                    );
                    if (!boosterFound) {
                         reject(`Can't found booster's id: ${boosterId}`);
                    }
                    
                    const playerBooster: PlayerBoosterSchema = {
                         player_id: this.playerId,
                         booster_id: boosterId,
                         expire_at: expireAt,
                         create_at: now,
                         status: StatusBooster.Available
                    }
                    playerBoosters.push(playerBooster);
               });


               // success and add to database
               playerBoosters.forEach( pb => 
                    Player_Boosters.push(pb)
               );
               
               resolve({message: 'OK', boosters: playerBoosters});
          });
     }

     createGameSession(): Promise<any> {
          throw new Error("Method not implemented.");
     }

     updateGameSession(): Promise<any> {
          throw new Error("Method not implemented.");
     }

     getPlayerLevelUp(): Promise<LevelDTO> {
          throw new Error("Method not implemented.");
          // TODO add booster from condition
     }

     getPlayerAchievements(): Promise<AchievementDTO[]> {
          throw new Error("Method not implemented.");
          // TODO add new player's achievement by examine data in database
     }

     getPlayerCharacters(): Promise<CharacterDTO> {
          throw new Error("Method not implemented.");
     }
}