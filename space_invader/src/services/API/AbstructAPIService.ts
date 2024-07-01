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

     abstract updateUsername(): Promise<any>

     abstract updateDifficult(): Promise<any>

     abstract updateAirflow(): Promise<any>

     abstract updateUsingCharacter(): Promise<any>

     abstract getPlayerInLandingPage(): Promise<Player>;

     abstract getRanking(): Promise<Rank>

     abstract applyBooster(): Promise<any>

     abstract createGameSession(): Promise<any>

     abstract updateGameSession(): Promise<any>

     abstract getLevelUp(): Promise<Level>

     abstract getBooster(): Promise<Booster[]>
     
     abstract addBooster(): Promise<any>

     abstract getAchievement(): Promise<Achievement[]>

     abstract getCharacter(): Promise<Character>

}