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
     Player_Boosters
 } from "./fakeDatabase";
 import AbstractAPIService from "./AbstructAPIService";

 interface Player {
     playerId: string;
     username: string;
     playerLevel: number;
     airflow: number;
     playCount: number;
     playToday: Date[];
     difficult: Difficult[];
     usingCharacter: string;
}

interface Rank {
     playerId: string;
     username: string;
     accumulatedScore: number;
     accumulatedPlay: number;
}

interface Level {
     level: number;
     boosters: Booster;
}

interface Achievement {
     achievementId: string;
     name: string;
     detail: string
}

interface Character {
     characterId: string;
     name: string;
     detail: string;
}

interface Booster {
     [key: string]: {
          expireDate: Date[];
          amount: number
     };
}

interface Difficult {
     difficultId: string;
     name: string;
     inhaleSecond: number;
}

export default class MockAPIService extends AbstractAPIService {
     updateUsername(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     updateDifficult(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     updateAirflow(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     updateUsingCharacter(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     getPlayerInLandingPage(): Promise<Player> {
          throw new Error("Method not implemented.");
     }
     getRanking(): Promise<Rank> {
          throw new Error("Method not implemented.");
     }
     applyBooster(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     createGameSession(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     updateGameSession(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     getLevelUp(): Promise<Level> {
          throw new Error("Method not implemented.");
     }
     getBooster(): Promise<Booster[]> {
          throw new Error("Method not implemented.");
     }
     addBooster(): Promise<any> {
          throw new Error("Method not implemented.");
     }
     getAchievement(): Promise<Achievement[]> {
          throw new Error("Method not implemented.");
     }
     getCharacter(): Promise<Character> {
          throw new Error("Method not implemented.");
     }

     private token!: string;
     private playerId!: string;
     private isLogin: boolean;

     constructor() {
          super();
          this.token = '';
          this.isLogin = false;
     }

     private findPlayerLevel(playerTotalScore: number): number {
          
          let i = 1;
          const n = Levels.length;
          while(i < n) {
               const scoreRequire = Levels[i].score_require;
               const isNextLevel = playerTotalScore > scoreRequire;
       
               if (isNextLevel) {
                    i++; // level up
               } else {
                    return Levels[i - 1].level; // on level
               }
          }

          return Levels[n - 1].level;   // max level
     }

     login(tel: string) {
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
     ){   
          return new Promise<any>( resolve => {
               // TODO create new ID
               const id: string = String(Players.length).padStart(3, "0");
               const username: string = "";
               const birthYear: number = new Date().getFullYear() - age;
               const lastPlayedAt: Date = new Date();
               const usingCharacterId: string = "01";

               // create DTO
               const player = {
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
               const defaultCharacterId = "01"
               const playerCharacter = {
                    player_id: id,
                    character_id: defaultCharacterId
               }
               
               // add to database
               Player_Characters.push(playerCharacter);
               Players.push(player);

               resolve(player);
          });
     }

     // updateUsername(newUsername: string) {

     //      // auth
     //      if (!this.isLogin) {
     //           console.log('Please Log in.')
     //           return;
     //      }

     //      const index = Players.findIndex( 
     //           player => player.id === this.playerId
     //      );
     //      if (index === -1) {
               
     //           // not success
     //           console.log("Can not find player's id")
     //           return;
     //      }

     //      // update success
     //      Players[index].username = newUsername;
     //      return Players[index];
     // }
     
     // getPlayerInLandingPage() {
          
     //      // auth
     //      if (!this.isLogin) {
     //           console.log('Please Log in.')
     //           return;
     //      }
          
     //      const player = Players.find( 
     //           player => player.id === this.playerId
     //      );
     //      if (!player) {
     //           console.log('Can not find player.');
     //           return;
     //      }

     //      const playerGameSessions = GameSessions.filter(
     //           game => game.player_id === this.playerId
     //      );

     //      const playerAccumulatedScore = playerGameSessions.reduce(
     //           (accumulator, game) => accumulator + game.score,
     //           0,
     //      );

     //      const playerLevel = this.findPlayerLevel(playerAccumulatedScore);

     //      const playCount = playerGameSessions ? playerGameSessions.length : 0;

     //      const playToday = playerGameSessions.filter(
     //           game => {
     //                const now = new Date().setHours(0, 0, 0, 0);
     //                return game.start_at.getTime() > now
     //      });

     //      const difficult = Difficulties.find( 
     //           dif => dif.id === player.difficult_id
     //      );

     //      const playerBoosters = Player_Boosters.filter(
     //           booster => booster.player_id === player.id
     //      );

     //      const boosters = [];
     //      for (let i = 0; i < 7; i++) {
     //           const booster = playerBoosters.filter(
     //                b => b.booster_id === `0${i+1}`  
     //           );
     //           boosters.push(booster);
     //      }

     //      // {
     //      //      "booster_1":          {"expire_date": ["2024-06-24T12:00:00.000Z","2024-06-24T13:00:00.000Z"],    "amount" : 3,},
     //      //      "booster_2":          {"expire_date": ["2024-06-24T09:00:00.000Z","2024-06-24T12:00:00.000Z"],    "amount" : 2,},
     //      //      "booster_3":          {"expire_date": [], "amount" : 30,},
     //      //      "booster_4":          {"expire_date": [], "amount" : 1,},
     //      //      "booster_5":          {"expire_date": [], "amount" : 1,},
     //      //      "booster_rare1":      {"expire_date": [], "amount" : 1,},
     //      //      "booster_rare2":      {"expire_date": [], "amount" : 1,},
     //      // }
     //      const boosterDTO: {
     //           [key: string]: {expireAt: Date[], amount: number}
     //      } = {}
          
     //      boosters.forEach((booster, index) => {
     //           if (!booster) return;
     //           const boosterOnceDTO = booster.filter(
     //                b => {
     //                     // permanent booster
     //                     const expireAt = b.expire_at;
     //                     if (expireAt === null && b.status === "AVAILABLE"){
     //                          return true;
     //                     } else if (expireAt === null) {
     //                          return false;
     //                     }

     //                     // limited time booster
     //                     const isExpire = expireAt.getTime() > Date.now();
     //                     if (isExpire && "AVAILABLE") {
     //                          // update expire booster
     //                          b.status = "EXPIRE";
     //                     } else if (!isExpire && "AVAILABLE") {
     //                          // return this booster
     //                          return true;
     //                     }

     //                     return false;
     //           });
               
     //           const boosterProperty = `booster${index + 1}`;
     //           boosterDTO[boosterProperty] = {
     //                expireAt: boosterOnceDTO
     //                     .map(b => b.expire_at)
     //                     .filter(b => b !== null),
     //                amount: boosterOnceDTO.length
     //           }
     //      });
          

     //      // create DTO
     //      /*
     //      {
     //           playerId
     //           username
     //           playerLevel
     //           airflow
     //           playCount
     //           playToday[
     //                (startAt)
     //           ] (from GameSession)
     //           difficult {
     //                difficultId
     //                name
     //                inhaleSecond
     //                breakSecond
     //           }
     //           boosters[{
     //                boosterId
     //                expireAt[]
     //                count
     //           }]
     //           achievements[
     //                (achievementId)
     //           ]
     //           characters[
     //                (characterId)
     //           ]
     //           usingCharacterId

     //      }    
     //      */
     //      const playerDTO = {
     //           id: player.id,
     //           username: player.username,
     //           playerLevel: playerLevel,
     //           airflow: player.airflow,
     //           playCount: playCount,
     //           playToday: playToday,
     //           difficult: difficult,

     //           // TODO implement abstract

     //      }

     //      return playerDTO;

     //      // update last played at
     // }


}