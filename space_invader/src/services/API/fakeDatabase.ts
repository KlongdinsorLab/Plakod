import { 
     Gender,
     Airflow,
     StatusGameSession,
     StatusBooster,
     VasScore
 } from "services/enumService";

export interface PlayerSchema {
     id: string
     difficult_id: string;
     tel: string;
     username: string;
     gender: Gender;
     birth_year: number;
     airflow: Airflow;
     last_played_at: Date;
     using_character_id: string;
}

export interface DifficultSchema {
     id: string;
     name: string;
     inhale_second: number;    
}

export interface LevelSchema {
     id: string;
     level: number;
     score_require: number;
}

export interface GameSessionSchema {
     id: string;
     player_id: string;
     difficult_id: string;
     boss_id: string;
     score: number;
     lap: number;
     start_at: Date;
     update_at: Date;
     end_at: Date;
     status: StatusGameSession;
}

export interface CharacterSchema {
     id: string;
     name: string;
     detail: string;
}

export interface AchievementSchema {
     id: string;
     name: string;
     detail: string;
}

export interface BoosterSchema {
     id: string;
     name: string;
     detail: string;
}

export interface PlayerCharacterSchema {
     player_id: string;
     character_id: string;
}

export interface PlayerAchievementSchema {
     player_id: string;
     achievement_id: string;
}

export interface PlayerBoosterSchema {
     player_id: string;
     booster_id: string;
     expire_at: Date | null;
     create_at: Date;
     status: StatusBooster;
}

export interface VasSchema {
     id: string;
     player_id: string;
     vas_score: VasScore;
     create_at: Date;
}

export const Players: PlayerSchema[] = [
     {
          id: "001",
          difficult_id: "1",
          tel: "0958927518",
          username: "tirawich",
          gender: Gender.Male,
          birth_year: 2003,
          airflow: 600,
          last_played_at: new Date(),
          using_character_id: "01",
     },
     {
          id: "002",
          difficult_id: "1",
          tel: "0958927515",
          username: "Peace",
          gender: Gender.Male,
          birth_year: 2003,
          airflow: 500,
          last_played_at: new Date(),
          using_character_id: "01",
     },
]

export const Difficulties: DifficultSchema[] = [ 
     {
          id: "01",
          name: "easy",
          inhale_second: 0.5,
     },
     {
          id: "02",
          name: "normal",
          inhale_second: 1.0,
     },
     {
          id: "03",
          name: "hard",
          inhale_second: 2.0,
     }
]

export const Levels: LevelSchema[] = [
     {
          id: "01",
          level: 1,
          score_require: 0,
     },
     {
          id: "02",
          level: 2,
          score_require: 85000,
     },
     {
          id: "03",
          level: 3,
          score_require: 850000,
     },
     {
          id: "04",
          level: 4,
          score_require: 2125000,
     },
     {
          id: "05",
          level: 5,
          score_require: 3825000,
     },
     {
          id: "06",
          level: 6,
          score_require: 5190000,
     },
     {
          id: "07",
          level: 7,
          score_require: 10200000,
     },
     {
          id: "08",
          level: 8,
          score_require: 15300000,
     },
     {
          id: "09",
          level: 9,
          score_require: 21250000,
     },
     {
          id: "10",
          level: 10,
          score_require: 28050000,
     },
]

export const GameSessions: GameSessionSchema[] = [
     {
          id: "0001",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 5000,
          lap: 10,
          start_at: new Date(),
          update_at: new Date(Date.now() + 900000),
          end_at: new Date(Date.now() + 900000),
          status: StatusGameSession.Active,
     },
     {
          id: "0002",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 10000,
          lap: 10,
          start_at: new Date(),
          update_at: new Date(Date.now() + 600000),
          end_at: new Date(Date.now() + 600000),
          status: StatusGameSession.Active,
     },
     {
          id: "0003",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 15000,
          lap: 10,
          start_at: new Date(Date.now() - 10000000),
          update_at: new Date(),
          end_at: new Date(),
          status: StatusGameSession.Active,
     },
     {
          id: "0004",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 20000,
          lap: 10,
          start_at: new Date(Date.now() - 6000000),
          update_at: new Date(),
          end_at: new Date(),
          status: StatusGameSession.Active,
     },
]

export const Characters: CharacterSchema[] = [
     {
          id: "01",
          name: "mc1",
          detail: ""
     },
     {
          id: "02",
          name: "mc2",
          detail: ""
     },
     {
          id: "03",
          name: "mc3",
          detail: ""
     }
]

export const Achievements: AchievementSchema[] = [
     {
          id: "001",
          name: "achievement1",
          detail: "เล่นครบ 3 หัวใจใน 1 วัน"
     },
     {
          id: "002",
          name: "achievement2",
          detail: "เล่นติดต่อกัน 3 วัน (เล่นจบเกม)"
     },
     {
          id: "003",
          name: "achievement3",
          detail: "เล่นติดต่อกัน 5 วัน (เล่นจบเกม)"
     },
     {
          id: "004",
          name: "achievement4",
          detail: "เล่นติดต่อกัน 7 วัน (เล่นจบเกม)"
     },
     {
          id: "005",
          name: "achievement5",
          detail: "คะแนนสะสม 500k"
     },
     {
          id: "006",
          name: "achievement6",
          detail: "คะแนนสะสม 3m"
     },
     {
          id: "007",
          name: "achievement7",
          detail: "คะแนนสะสม 8m"
     },
     {
          id: "008",
          name: "achievement8",
          detail: "คะแนนสะสม 20m"
     },
     {
          id: "009",
          name: "achievement9",
          detail: "เล่นสะสมครบ 10 เกม"
     },
     {
          id: "010",
          name: "achievement10",
          detail: "เล่นสะสมครบ 100 เกม"
     },
     {
          id: "011",
          name: "achievement11",
          detail: "เล่นสะสมครบ 200 เกม"
     },
     {
          id: "012",
          name: "achievement12",
          detail: "ใช้บูสเตอร์ปกติ 10 เกม"
     },
     {
          id: "013",
          name: "achievement13",
          detail: "ใช้บูสเตอร์แรร์ 5 เกม"
     },
     {
          id: "014",
          name: "achievement14",
          detail: "สะสมบูสเตอร์ครบทั้ง 7 แบบ"
     },
     {
          id: "015",
          name: "achievement15",
          detail: "นักปราบมือแข็ง เอาชนะ b4 ครบ 20 เกม"
     },
     {
          id: "016",
          name: "achievement16",
          detail: "นักฆ่ามือไหม้ เอาชนะ b5 ครบ 30 เกม"
     },
     {
          id: "017",
          name: "achievement17",
          detail: "สะสมตัวละครทั้งหมด 4 ตัว"
     },

]

export const Boosters: BoosterSchema[] = [
     {
          id: "01",
          name: "booster1",
          detail: "เกราะ5ครั้ง ใช้ตอนบอสเท่านั้น"
     },
     {
          id: "02",
          name: "booster2",
          detail: "เกราะ15วินาที ใช้ตอนบอสเท่านั้น"
     },
     {
          id: "03",
          name: "booster3",
          detail: "ลดคะแนนบาดเจ็บ50% -100เหลือ-50 -200เหลือ-100"
     },
     {
          id: "04",
          name: "booster4",
          detail: "กระสุนออกไวขึ้น20% 30เป็น36 60เป็น72 90เป็น108"
     },
     {
          id: "05",
          name: "booster5",
          detail: "คะแนนโจมตีเพิ่มขึ้น10% จาก 400-> 440 200->220"
     },
     {
          id: "06",
          name: "booster_rare1",
          detail: "ปล่อยกระสุน3ทาง (นับตามสิ่งที่ยิงโดน)"
     },
     {
          id: "07",
          name: "booster_rare2",
          detail: "คะแนนท้ายเกมเพิ่มขึ้น50%"
     }
]

export const Player_Characters: PlayerCharacterSchema[] = [
     {
          player_id: "001",
          character_id: "01"
     },
     {
          player_id: "001",
          character_id: "02"
     },
     {
          player_id: "002",
          character_id: "01"
     }
]

export const Player_Achievements: PlayerAchievementSchema[] = [
     {
          player_id: "001",
          achievement_id: "001",
     },
     {
          player_id: "001",
          achievement_id: "006"
     }
]

export const Player_Boosters: PlayerBoosterSchema[] = [
     {
          player_id: "001",
          booster_id: "02",
          expire_at: new Date(Date.now() - 10800000),
          create_at: new Date(),
          status: StatusBooster.Expire
     },
     {
          player_id: "001",
          booster_id: "01",
          expire_at: new Date(),
          create_at: new Date(Date.now() + 10800000),
          status: StatusBooster.Available
     },
     {
          player_id: "001",
          booster_id: "03",
          expire_at: new Date(),
          create_at: new Date(),
          status: StatusBooster.Expire
     },
     {
          player_id: "001",
          booster_id: "04",
          expire_at: new Date(),
          create_at: new Date(),
          status: StatusBooster.Expire
     },
     {
          player_id: "001",
          booster_id: "05",
          expire_at: new Date(),
          create_at: new Date(),
          status: StatusBooster.Expire
     },
     {
          player_id: "001",
          booster_id: "06",
          expire_at: new Date(),
          create_at: new Date(),
          status: StatusBooster.Expire
     },
     {
          player_id: "001",
          booster_id: "01",
          expire_at: null,
          create_at: new Date(),
          status: StatusBooster.Available
     },
     {
          player_id: "001",
          booster_id: "02",
          expire_at: null,
          create_at: new Date(),
          status: StatusBooster.Available
     },
     {
          player_id: "001",
          booster_id: "03",
          expire_at: null,
          create_at: new Date(),
          status: StatusBooster.Available
     },
]

export const Vas: VasSchema[] = [
     {
          id: "0001",
          player_id: "001",
          vas_score: 5,
          create_at: new Date()
     }
]