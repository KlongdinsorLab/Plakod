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

class APIService {

     private token!: string;
     private playerId!: string;
     private isLogin: boolean;

     constructor() {
          this.token = '',
          this.isLogin = false
     }

     private findPlayerLevel(playerTotalScore: number): number {
          
          let i = 0;
          const n = Levels.length;
          while(i < n) {
               const scoreRequire = Levels[i].score_require;
               const isNextLevel = playerTotalScore > scoreRequire;
       
               if (isNextLevel) {
                    i++; // level up
               } else if (i === 0) {
                    return 0; // base
               } else {
                    return Levels[i - 1].level; // on level
               }
          }

          return Levels[n - 1].level;   // max level
     }

     login(tel: string) {
          // TODO find tel and return user_id
          const player = Players.find( player => player.tel === tel);
          if (player) {
               this.playerId = player.id;
          } else {
               console.log("Can not find player with this tel.");
               return;
          } 
          
          this.isLogin = true;

          // TODO create token
          this.token = "tHiSiSToKen";
          
          return this.token;
     }

     
     // create player
     register(
          tel: string, 
          age: number,
          gender: string,
          airflow: number,
          difficultId: string,
     ){   
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

          // add to database
          Players.push(player);

          return player;
     }

     updateUsername(newUsername: string) {

          // auth
          if (!this.isLogin) {
               console.log('Please Log in.')
               return;
          }

          const index = Players.findIndex( 
               player => player.id === this.playerId
          );
          if (index === -1) {
               
               // not success
               console.log("Can not find player's id")
               return;
          }

          // update success
          Players[index].username = newUsername;
          return Players[index];
     }
     
     getPlayerInLandingPage() {
          
          // auth
          if (!this.isLogin) {
               console.log('Please Log in.')
               return;
          }
          
          const player = Players.find( 
               player => player.id === this.playerId
          );
          if (!player) {
               console.log('Can not find player.');
               return;
          }

          const playerGameSessions = GameSessions.filter(
               game => game.player_id === this.playerId
          );

          const playerAccumulatedScore = playerGameSessions.reduce(
               (accumulator, game) => accumulator + game.score,
               0,
          );

          const playerLevel = this.findPlayerLevel(playerAccumulatedScore);

          const playCount = playerGameSessions ? playerGameSessions.length : 0;

          const playToday = playerGameSessions.filter(
               game => {
                    const now = new Date().setHours(0, 0, 0, 0);
                    return game.start_at > now
          });

          // create DTO
          /*
          {
               playerId
               username
               playerLevel
               airflow
               totalScore
               playCount
               playToday[
                    (startAt)
               ] (from GameSession)
               difficult {
                    difficultId
                    name
                    inhaleSecond
                    breakSecond
               }
               boosters[{
                    boosterId
                    expireAt[]
                    count
               }]
               achievements[
                    (achievementId)
               ]
               characters[
                    (characterId)
               ]
               usingCharacterId

          }    
          */
          const playerDTO = {
               id: player.id,
               username: player.username,
               playerLevel: playerLevel,
               airflow: player.airflow,
               totalScore: player.total_score,
               playCount: playCount,
               playToday: playToday
               // TODO implement abstract

          }

          return playerDTO;

          // update last played at
     }


}