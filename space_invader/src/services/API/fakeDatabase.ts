export const Players = [
     {
          id: "001",
          difficult_id: "1",
          tel: "0958927518",
          username: "tirawich",
          gender: "M",
          birth_year: 2003,
          airflow: 600,
          total_score: 50000,
          last_played_at: new Date(),
          using_character_id: "01",
     },
     {
          id: "002",
          difficult_id: "1",
          tel: "0958927515",
          username: "Peace",
          gender: "M",
          birth_year: 2003,
          airflow: 600,
          last_played_at: new Date(),
          using_character_id: "01",
     },
]

export const Difficulties = [
     {
          id: "01",
          name: "easy",
          inhale_second: 0.5,
          break_second: 60,
     },
     {
          id: "02",
          name: "normal",
          inhale_second: 1.0,
          break_second: 60,
     },
     {
          id: "03",
          name: "hard",
          inhale_second: 2.0,
          break_second: 60,
     }
]

export const Levels = [
     {
          id: "01",
          level: 1,
          score_require: 10000,
     },
     {
          id: "02",
          level: 2,
          score_require: 20000,
     },
     {
          id: "03",
          level: 3,
          score_require: 30000,
     },
     {
          id: "04",
          level: 4,
          score_require: 40000,
     },
     {
          id: "06",
          level: 6,
          score_require: 60000,
     },
     {
          id: "06",
          level: 6,
          score_require: 60000,
     },
     {
          id: "07",
          level: 7,
          score_require: 70000,
     },
     {
          id: "08",
          level: 8,
          score_require: 80000,
     },
     {
          id: "09",
          level: 9,
          score_require: 90000,
     },
     {
          id: "10",
          level: 10,
          score_require: 100000,
     }
]

export const GameSessions = [
     {
          id: "0001",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 5000,
          lap: 10,
          start_at: Date.now(),
          update_at: Date.now(),
          end_at: Date.now(),
          status: "ACTIVE",
     },
     {
          id: "0002",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 10000,
          lap: 10,
          start_at: Date.now(),
          update_at: Date.now(),
          end_at: Date.now(),
          status: "ACTIVE",
     },
     {
          id: "0003",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 15000,
          lap: 10,
          start_at: Date.now(),
          update_at: Date.now(),
          end_at: Date.now(),
          status: "ACTIVE",
     },
     {
          id: "0004",
          player_id: "01",
          difficult_id: "1",
          boss_id: "01",
          score: 20000,
          lap: 10,
          start_at: Date.now(),
          update_at: Date.now(),
          end_at: Date.now(),
          status: "ACTIVE",
     },
]

export const Characters = [
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

export const Achievements = [
     {
          id: "001",
          name: "achievement1",
          detail: ""
     },
     {
          id: "002",
          name: "achievement2",
          detail: ""
     },
     {
          id: "003",
          name: "achievement3",
          detail: ""
     },
     {
          id: "004",
          name: "achievement4",
          detail: ""
     },
     {
          id: "005",
          name: "achievement5",
          detail: ""
     },
     {
          id: "006",
          name: "achievement6",
          detail: ""
     },
     {
          id: "007",
          name: "achievement7",
          detail: ""
     },
     {
          id: "008",
          name: "achievement8",
          detail: ""
     },
     {
          id: "009",
          name: "achievement9",
          detail: ""
     },
     {
          id: "010",
          name: "achievement10",
          detail: ""
     },
     {
          id: "011",
          name: "achievement11",
          detail: ""
     },
     {
          id: "012",
          name: "achievement12",
          detail: ""
     },
     {
          id: "013",
          name: "achievement13",
          detail: ""
     },
     {
          id: "014",
          name: "achievement14",
          detail: ""
     },
     {
          id: "015",
          name: "achievement15",
          detail: ""
     },

]

export const Boosters = [
     {
          id: "01",
          name: "booster1",
          detail: ""
     },
     {
          id: "02",
          name: "booster2",
          detail: ""
     },
     {
          id: "03",
          name: "booster3",
          detail: ""
     },
     {
          id: "04",
          name: "booster4",
          detail: ""
     },
     {
          id: "05",
          name: "booster5",
          detail: ""
     },
     {
          id: "06",
          name: "booster6",
          detail: ""
     },
     {
          id: "07",
          name: "booster7",
          detail: ""
     },
     {
          id: "08",
          name: "booster8",
          detail: ""
     }
]

export const Player_Characters = [
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

export const Player_Achievements = [
     {
          player_id: "001",
          achievement_id: "001",
     },
     {
          player_id: "001",
          achievement_id: "006"
     }
]

export const Player_Boosters = [
     {
          player_id: "001",
          booster_id: "01",
          expire_at: Date.now(),
          create_at: Date.now(),
          status: "EXPIRE"
     },
     {
          player_id: "001",
          booster_id: "02",
          expire_at: Date.now(),
          create_at: Date.now(),
          status: "EXPIRE"
     },
     {
          player_id: "001",
          booster_id: "03",
          expire_at: Date.now(),
          create_at: Date.now(),
          status: "EXPIRE"
     },
     {
          player_id: "001",
          booster_id: "04",
          expire_at: Date.now(),
          create_at: Date.now(),
          status: "EXPIRE"
     },
     {
          player_id: "001",
          booster_id: "05",
          expire_at: Date.now(),
          create_at: Date.now(),
          status: "EXPIRE"
     },
     {
          player_id: "001",
          booster_id: "06",
          expire_at: Date.now(),
          create_at: Date.now(),
          status: "EXPIRE"
     },
]

export const Vas = [
     {
          id: "0001",
          player_id: "001",
          vas_score: 5,
          create_at: Date.now()
     }
]