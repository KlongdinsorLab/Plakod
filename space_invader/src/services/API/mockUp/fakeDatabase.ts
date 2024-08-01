import {
     PlayerSchema,
     DifficultySchema,
     LevelSchema,
     AchievementSchema,
     BoosterSchema,
     CharacterSchema,
     GameSessionSchema,
     PlayerAchievementSchema,
     PlayerBoosterSchema,
     PlayerCharacterSchema,
     VasSchema,
     BossSchema
} from "services/API/definition/databaseSchema"

export const Players: PlayerSchema[] = [
     {
          id: 1,
          difficulty_id: 1,
          phone_number: "0958927518",
          username: "tirawich",
          gender: "M",
          birth_year: 2003,
          airflow: 600,
          last_played_at: new Date(),
          selected_character_id: 1,
     },
     {
          id: 2,
          difficulty_id: 1,
          phone_number: "0958927515",
          username: "Peace",
          gender: "M",
          birth_year: 2003,
          airflow: 500,
          last_played_at: new Date(),
          selected_character_id: 1,
     },
]

export const Difficulties: DifficultySchema[] = [ 
     {
          id: 1,
          name: "easy",
          inhale_second: 0.5,
     },
     {
          id: 2,
          name: "normal",
          inhale_second: 1.0,
     },
     {
          id: 3,
          name: "hard",
          inhale_second: 2.0,
     }
]

export const Levels: LevelSchema[] = [
     {
          id: 1,
          level: 1,
          score_required: 0,
     },
     {
          id: 2,
          level: 2,
          score_required: 85000,
     },
     {
          id: 3,
          level: 3,
          score_required: 850000,
     },
     {
          id: 4,
          level: 4,
          score_required: 2125000,
     },
     {
          id: 5,
          level: 5,
          score_required: 3825000,
     },
     {
          id: 6,
          level: 6,
          score_required: 5190000,
     },
     {
          id: 7,
          level: 7,
          score_required: 10200000,
     },
     {
          id: 8,
          level: 8,
          score_required: 15300000,
     },
     {
          id: 9,
          level: 9,
          score_required: 21250000,
     },
     {
          id: 10,
          level: 10,
          score_required: 28050000,
     },
]

export const GameSessions: GameSessionSchema[] = [
     {
          id: 1,
          player_id: 1,
          difficulty_id: 1,
          boss_id: 1,
          booster_drop_id: 1,
          booster_drop_duration: 3,
          score: 50000,
          lap: 10,
          started_at: new Date(),
          updated_at: new Date(Date.now() + 900000),
          ended_at: new Date(Date.now() + 900000),
          status: "END",
     },
     {
          id: 2,
          player_id: 1,
          difficulty_id: 1,
          boss_id: 1,
          booster_drop_id: 2,
          booster_drop_duration: -1,
          score: 10000,
          lap: 10,
          started_at: new Date(),
          updated_at: new Date(Date.now() + 600000),
          ended_at: new Date(Date.now() + 600000),
          status: "END",
     },
     {
          id: 3,
          player_id: 1,
          difficulty_id: 1,
          boss_id: 1,
          booster_drop_id: 2,
          booster_drop_duration: 3,
          score: 15000,
          lap: 10,
          started_at: new Date(Date.now() - 10000000),
          updated_at: new Date(),
          ended_at: new Date(),
          status: "END",
     },
     {
          id: 4,
          player_id: 1,
          difficulty_id: 1,
          boss_id: 1,
          booster_drop_id: 2,
          booster_drop_duration: 3,
          score: 20000,
          lap: 10,
          started_at: new Date(Date.now() - 6000000),
          updated_at: new Date(),
          ended_at: new Date(),
          status: "END",
     },
     {
          id: 5,
          player_id: 2,
          difficulty_id: 1,
          boss_id: 1,
          booster_drop_id: 2,
          booster_drop_duration: 3,
          score: 80000,
          lap: 10,
          started_at: new Date(Date.now() - 6000000),
          updated_at: new Date(),
          ended_at: new Date(),
          status: "END",
     },
]

export const Characters: CharacterSchema[] = [
     {
          id: 1,
          name: "นักผจญภัย",
          achievement_number_required: 0,
          detail: ""
     },
     {
          id: 2,
          name: "นักเวทย์",
          achievement_number_required: 4,
          detail: ""
     },
     {
          id: 3,
          name: "จอมโจร",
          achievement_number_required: 8,
          detail: ""
     }
]

export const Achievements: AchievementSchema[] = [
     {
          id: 1,
          name: "achievement1",
          detail: "เล่นครบ 3 หัวใจใน 1 วัน"
     },
     {
          id: 2,
          name: "achievement2",
          detail: "เล่นติดต่อกัน 3 วัน (เล่นจบเกม)"
     },
     {
          id: 3,
          name: "achievement3",
          detail: "เล่นติดต่อกัน 5 วัน (เล่นจบเกม)"
     },
     {
          id: 4,
          name: "achievement4",
          detail: "เล่นติดต่อกัน 7 วัน (เล่นจบเกม)"
     },
     {
          id: 5,
          name: "achievement5",
          detail: "คะแนนสะสม 500k"
     },
     {
          id: 6,
          name: "achievement6",
          detail: "คะแนนสะสม 3m"
     },
     {
          id: 7,
          name: "achievement7",
          detail: "คะแนนสะสม 8m"
     },
     {
          id: 8,
          name: "achievement8",
          detail: "คะแนนสะสม 20m"
     },
     {
          id: 9,
          name: "achievement9",
          detail: "เล่นสะสมครบ 10 เกม"
     },
     {
          id: 10,
          name: "achievement10",
          detail: "เล่นสะสมครบ 100 เกม"
     },
     {
          id: 11,
          name: "achievement11",
          detail: "เล่นสะสมครบ 200 เกม"
     },
     {
          id: 12,
          name: "achievement12",
          detail: "ใช้บูสเตอร์ปกติ 10 เกม"
     },
     {
          id: 13,
          name: "achievement13",
          detail: "ใช้บูสเตอร์แรร์ 5 เกม"
     },
     {
          id: 14,
          name: "achievement14",
          detail: "สะสมบูสเตอร์ครบทั้ง 7 แบบ"
     },
     {
          id: 15,
          name: "achievement15",
          detail: "นักปราบมือแข็ง เอาชนะ b4 ครบ 20 เกม"
     },
     {
          id: 16,
          name: "achievement16",
          detail: "นักฆ่ามือไหม้ เอาชนะ b5 ครบ 30 เกม"
     },
     {
          id: 17,
          name: "achievement17",
          detail: "สะสมตัวละครทั้งหมด 4 ตัว"
     },

]

export const Boosters: BoosterSchema[] = [
     {
          id: 1,
          name: "booster1",
          detail: "เกราะ5ครั้ง ใช้ตอนบอสเท่านั้น"
     },
     {
          id: 2,
          name: "booster2",
          detail: "เกราะ15วินาที ใช้ตอนบอสเท่านั้น"
     },
     {
          id: 3,
          name: "booster3",
          detail: "ลดคะแนนบาดเจ็บ50% -100เหลือ-50 -200เหลือ-100"
     },
     {
          id: 4,
          name: "booster4",
          detail: "กระสุนออกไวขึ้น20% 30เป็น36 60เป็น72 90เป็น108"
     },
     {
          id: 5,
          name: "booster5",
          detail: "คะแนนโจมตีเพิ่มขึ้น10% จาก 400-> 440 200->220"
     },
     {
          id: 6,
          name: "booster_rare1",
          detail: "ปล่อยกระสุน3ทาง (นับตามสิ่งที่ยิงโดน)"
     },
     {
          id: 7,
          name: "booster_rare2",
          detail: "คะแนนท้ายเกมเพิ่มขึ้น50%"
     }
]

export const PlayerCharacters: PlayerCharacterSchema[] = [
     {
          player_id: 1,
          character_id: 1
     },
     {
          player_id: 1,
          character_id: 2
     },
     {
          player_id: 2,
          character_id: 1
     }
]

export const PlayerAchievements: PlayerAchievementSchema[] = [
     {
          player_id: 1,
          achievement_id: 1,
     },
     {
          player_id: 1,
          achievement_id: 2
     },
     {
          player_id: 1,
          achievement_id: 3
     },
     {
          player_id: 1,
          achievement_id: 4
     }
]

export const PlayerBoosters: PlayerBoosterSchema[] = [
     {
          player_id: 1,
          booster_id: 2,
          expired_at: new Date(),
          created_at: new Date(Date.now() - 10800000),
          status: "EXPIRE"
     },
     {
          player_id: 1,
          booster_id: 1,
          expired_at: new Date(Date.now() + 10800000),
          created_at: new Date(Date.now() - 10800000),
          status: "AVAILABLE"
     },
     {
          player_id: 1,
          booster_id: 3,
          expired_at: new Date(),
          created_at: new Date(),
          status: "EXPIRE"
     },
     {
          player_id: 1,
          booster_id: 4,
          expired_at: new Date(),
          created_at: new Date(),
          status: "EXPIRE"
     },
     {
          player_id: 1,
          booster_id: 5,
          expired_at: new Date(),
          created_at: new Date(),
          status: "EXPIRE"
     },
     {
          player_id: 1,
          booster_id: 6,
          expired_at: new Date(),
          created_at: new Date(),
          status: "EXPIRE"
     },
     {
          player_id: 1,
          booster_id: 1,
          expired_at: null,
          created_at: new Date(),
          status: "AVAILABLE"
     },
     {
          player_id: 1,
          booster_id: 2,
          expired_at: null,
          created_at: new Date(),
          status: "AVAILABLE"
     },
     {
          player_id: 1,
          booster_id: 3,
          expired_at: null,
          created_at: new Date(),
          status: "AVAILABLE"
     },
     {
          player_id: 1,
          booster_id: 1,
          expired_at: new Date(Date.now() + 100000000),
          created_at: new Date(),
          status: "AVAILABLE"
     },
     {
          player_id: 1,
          booster_id: 1,
          expired_at: new Date(),
          created_at: new Date(),
          status: "AVAILABLE"
     },
     {
          player_id: 1,
          booster_id: 1,
          expired_at: new Date(Date.now() + 12000),
          created_at: new Date(),
          status: "AVAILABLE"
     },
]

export const Vas: VasSchema[] = [
     {
          id: 1,
          player_id: 1,
          vas_score: 5,
          created_at: new Date()
     }
]

export const Bosses: BossSchema[] = [
     {
          id: 1,
          name: "เอเลี่ยนซ่า",
          detail: ""
     },
     {
          id: 2,
          name: "สไลม์คิง",
          detail: ""
     }
]