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
	Boosters,
	Bosses,
} from './fakeDatabase'

import AbstractAPIService from '../AbstractAPIService'

import {
	Response,
	RankDTO,
	GameSessionFinishedDTO,
	BoosterDTO,
	AchievementDetailDTO,
	CharacterDetailDTO,
	BoosterDetailDTO,
	PlayerDTO,
	DifficultyDTO,
	GameSessionDTO,
	BossDetailDTO,
} from '../definition/responseDTO'

import {
	PlayerSchema,
	PlayerCharacterSchema,
	GameSessionSchema,
	PlayerBoosterSchema,
	AchievementSchema,
	VasSchema,
	CharacterSchema,
	BoosterSchema,
	PlayerAchievementSchema,
} from '../definition/databaseSchema'

import { Gender, Airflow, VasScore } from '../definition/typeProperty'

export default class MockAPIService extends AbstractAPIService {
	private token!: string
	private playerId!: number
	private isLogin: boolean

	// TODO make it to Singleton?
	constructor() {
		super()
		this.token = ''
		this.isLogin = false
	}

	private findPlayerLevel(playerAccumulatedScore: number): number {
		if (playerAccumulatedScore < 0) {
			throw new Error('Score can not be negative number.')
		}

		const n: number = Levels.length
		let i: number = 1
		let scoreRequire: number = Levels[i].score_required
		let isNextLevel: boolean = playerAccumulatedScore >= scoreRequire
		while (isNextLevel) {
			i++ // level up

			if (i >= n) {
				break // max level
			}

			scoreRequire = Levels[i].score_required
			isNextLevel = playerAccumulatedScore >= scoreRequire
		}

		return Levels[i - 1].level
	}

	private applyPlayerBooster(boostersId: number[]): number[] {
		const resolveIndex: number[] = []

		boostersId.forEach((boosterId) => {
			const playerBoosters: PlayerBoosterSchema[] = PlayerBoosters.filter(
				(booster) => {
					return (
						booster.player_id === this.playerId &&
						booster.booster_id === boosterId &&
						booster.status === 'AVAILABLE'
					)
				},
			)

			if (playerBoosters.length === 0) {
				throw new Error(`Can't found booster's id: ${boosterId}`)
			}

			playerBoosters.sort((a, b) => {
				if (a.expired_at === null && b.expired_at === null) {
					return 0 // Both dates are null, no preference
				} else if (a.expired_at === null) {
					return 1 // a.date is null, so it comes after b.date (not null)
				} else if (b.expired_at === null) {
					return -1 // b.date is null, so it comes after a.date (not null)
				} else {
					return a.expired_at.getTime() - b.expired_at.getTime() // Both dates are defined, compare normally
				}
			})

			const playerBooster: PlayerBoosterSchema = playerBoosters[0] // get booster that will expire first

			// prepare for update booster's status
			const index: number = PlayerBoosters.findIndex(
				(
					pb, // player booster
				) => pb === playerBooster,
			)
			if (index === -1) {
				throw new Error(
					`Something wrong. Can't found player's booster: ${playerBooster}`,
				)
			}
			resolveIndex.push(index)

			// check booster that expire before function
			if (playerBooster.expired_at) {
				const boosterExpireAt: Date = playerBooster.expired_at as Date
				const isExpire: boolean = Date.now() > boosterExpireAt.getTime()
				if (isExpire) {
					PlayerBoosters[index].status = 'EXPIRE'
					throw new Error(`this booster [${boosterId}] is expire before.`)
				}
			}
		})

		return resolveIndex
	}

	// TODO
	private randomDropBooster(): { boosterId: number; boosterDuration: number } {
		// TODO random booster drop id and duration
		return { boosterId: 1, boosterDuration: 3 }
	}

	// TODO
	private randomBossId(): number {
		// TODO random boss id
		// find player's level to be parameter in random

		return 1
	}

	// TODO check the last gameSession that not have endAt in 30 minutes will be status "Cancel"
	private createGameSession(
		bossId: number,
		boosterDropId: number,
		boosterDuration: number,
	): GameSessionSchema {
		const newId: number = GameSessions.length + 1
		const playerFound = Players.find((player) => player.id === this.playerId)
		if (!playerFound) {
			throw new Error('Can not find player.')
		}
		const player: PlayerSchema = playerFound as PlayerSchema
		const now: Date = new Date()

		const gameSession: GameSessionSchema = {
			id: newId,
			player_id: player.id,
			difficulty_id: player.difficulty_id,
			boss_id: bossId,
			booster_drop_id: boosterDropId,
			booster_drop_duration: boosterDuration,
			score: 0,
			lap: 0,
			started_at: now,
			updated_at: now,
			ended_at: null,
			status: 'ACTIVE',
		}

		return gameSession
	}

	private addPlayerBoosters(
		boosters: { boosterId: number; duration: number }[],
	): Promise<void> {
		return new Promise<void>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const playerBoosters: PlayerBoosterSchema[] = []
			boosters.forEach((boosterAdd) => {
				const { boosterId, duration } = boosterAdd
				const now: Date = new Date()

				let expireAt: Date | null = null
				if (duration === -1 || duration === null) {
					// -1 is permanent booster
					expireAt = null
				} else if (duration > 0 && duration < 128) {
					// 128 cap
					const timeToExpire: number = now.getTime() + duration * 3600000
					expireAt = new Date(timeToExpire)
				} else {
					throw new Error(`Invalid duration : ${duration}`)
				}

				const boosterFound = Boosters.find((b) => b.id === boosterId)
				if (!boosterFound) {
					throw new Error(`Can't found booster's id: ${boosterId}`)
				}

				const playerBooster: PlayerBoosterSchema = {
					player_id: this.playerId,
					booster_id: boosterId,
					expired_at: expireAt,
					created_at: now,
					status: 'AVAILABLE',
				}

				// add to database
				playerBoosters.push(playerBooster)
			})

			// success and add to database
			playerBoosters.forEach((pb) => PlayerBoosters.push(pb))

			resolve()
		})
	}

	// TODO
	private getAchievementUnlock(): number[] {
		// TODO check condition to unlock achievements
		// TODO add to PlayerAchievement
		const playerAchievementFound1 = PlayerAchievements.find(
			(pa) => pa.player_id === this.playerId && pa.achievement_id === 1,
		)
		if (!playerAchievementFound1) {
			const mockPlayerAchievement1: PlayerAchievementSchema = {
				player_id: this.playerId,
				achievement_id: 1,
			}
			PlayerAchievements.push(mockPlayerAchievement1)
		}

		const playerAchievementFound2 = PlayerAchievements.find(
			(pa) => pa.player_id === this.playerId && pa.achievement_id === 2,
		)
		if (!playerAchievementFound2) {
			const mockPlayerAchievement2: PlayerAchievementSchema = {
				player_id: this.playerId,
				achievement_id: 2,
			}
			PlayerAchievements.push(mockPlayerAchievement2)
		}

		const playerAchievementFound3 = PlayerAchievements.find(
			(pa) => pa.player_id === this.playerId && pa.achievement_id === 3,
		)
		if (!playerAchievementFound3) {
			const mockPlayerAchievement3: PlayerAchievementSchema = {
				player_id: this.playerId,
				achievement_id: 3,
			}
			PlayerAchievements.push(mockPlayerAchievement3)
		}

		return [1, 2, 3]
	}

	// TODO
	private async getBoosterLevelUp(
		level: number,
		newLevel: number,
	): Promise<number[]> {
		const differentLevel = newLevel - level
		if (differentLevel < 0) {
			throw new Error('New level is more than before level.')
		} else if (differentLevel === 0) {
			return []
		}

		// TODO check condition to get boosters
		// TODO add to PlayerBooster
		const mockBoosters: { boosterId: number; duration: number }[] = [
			{
				boosterId: 1,
				duration: 3,
			},
			{
				boosterId: 1,
				duration: 12,
			},
		]

		try {
			await this.addPlayerBoosters(mockBoosters)
		} catch (error) {
			throw error
		}

		const resultBoosterId = mockBoosters.map((b) => b.boosterId)

		return resultBoosterId
	}

	login(phoneNumber: string): Promise<Response<string>> {
		return new Promise<Response<string>>((resolve) => {
			const player = Players.find(
				(player) => player.phone_number === phoneNumber,
			)
			if (player) {
				this.playerId = player.id
			} else {
				throw new Error("Haven't player with this telephone.")
			}

			this.isLogin = true

			// TODO create token
			// this is example of token
			this.token =
				'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

			resolve({
				message: 'OK',
				response: this.token,
			})
		})
	}

	// create player
	register(
		phoneNumber: string,
		age: number,
		gender: Gender,
		airflow: Airflow,
		difficultyId: number,
	): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// TODO create new ID
			const newId: number = Players.length + 1
			const username: string | null = null
			const birthYear: number = new Date().getFullYear() - age
			const lastPlayedAt: Date = new Date()
			const defaultUsingCharacterId: number = 1

			const playerFound = Players.find((p) => p.phone_number === phoneNumber)
			if (playerFound) {
				throw new Error(`Have this player already, tel number: ${phoneNumber}`)
			}

			if (age < 0 || age > 200) {
				throw new Error(`Something wrong with age: ${age}`)
			}

			const diffFound = Difficulties.find((dif) => dif.id === difficultyId)
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
				selected_character_id: defaultUsingCharacterId,
			}

			// add default character
			const defaultCharacterId: number = 1
			//this.addPlayerCharacter(defaultCharacterId);    // can't use this because register has not login yet
			const playerCharacter: PlayerCharacterSchema = {
				player_id: newId,
				character_id: defaultCharacterId,
			}

			// add to database
			Players.push(player)
			PlayerCharacters.push(playerCharacter)

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	getPlayer(): Promise<Response<PlayerDTO>> {
		return new Promise<Response<PlayerDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const playerFound = Players.find((player) => player.id === this.playerId)
			if (!playerFound) {
				throw new Error(`Can't find player with player's id: ${this.playerId}.`)
			}
			const player: PlayerSchema = playerFound as PlayerSchema

			const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
				(game) => game.player_id === this.playerId,
			)

			const playerGameSessionsEnd: GameSessionSchema[] = GameSessions.filter(
				(game) => game.player_id === this.playerId && game.status === 'END',
			)

			const playerAccumulatedScore: number = playerGameSessionsEnd.reduce(
				(accumulator, game) => accumulator + game.score,
				0,
			)

			const playerLevel: number = this.findPlayerLevel(playerAccumulatedScore)

			const playCount: number = playerGameSessionsEnd.length

			const playToday: Date[] = playerGameSessions
				.filter((game) => {
					const today = new Date().setHours(0, 0, 0, 0)
					return game.started_at.getTime() > today
				})
				.map((game) => game.started_at)
				.sort(
					(a, b) => a.getTime() - b.getTime(), // Both dates are defined, compare normally
				)

			const difficultyFound = Difficulties.find(
				(dif) => dif.id === player.difficulty_id,
			)
			if (!difficultyFound) {
				throw new Error(
					"Can't found difficult cause player's difficultId is invalid",
				)
			}
			const difficultDTO: DifficultyDTO = {
				difficultyId: difficultyFound.id,
				name: difficultyFound.name,
				inhaleSecond: difficultyFound.inhale_second,
			}

			const playerCharacterId: number[] = PlayerCharacters.filter(
				(c) => c.player_id === this.playerId,
			).map((c) => c.character_id)

			const playerDTO: PlayerDTO = {
				playerId: player.id,
				username: player.username,
				playerLevel: playerLevel,
				airflow: player.airflow,
				playCount: playCount,
				playToday: playToday,
				difficulty: difficultDTO,
				selectedCharacterId: player.selected_character_id,
				playerCharactersId: playerCharacterId,
			}

			resolve({
				message: 'OK',
				response: playerDTO,
			})
		})
	}

	updatePlayerUsername(newUsername: string): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const index: number = Players.findIndex(
				(player) => player.id === this.playerId,
			)
			if (index === -1) {
				// not success
				throw new Error(`Can not find player's id: ${this.playerId}`)
			}

			// update success
			Players[index].username = newUsername

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	updatePlayerDifficulty(newDifficultyId: number): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const index: number = Players.findIndex(
				(player) => player.id === this.playerId,
			)
			if (index === -1) {
				// not success
				throw new Error(`Can not find player's id: ${this.playerId}`)
			}
			const diffFound = Difficulties.find((dif) => dif.id === newDifficultyId)
			if (!diffFound) {
				throw new Error(`Can't found difficult's id: ${newDifficultyId}`)
			}

			// update success
			Players[index].difficulty_id = newDifficultyId

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	updatePlayerAirflow(newAirflow: Airflow): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const index: number = Players.findIndex(
				(player) => player.id === this.playerId,
			)
			if (index === -1) {
				// not success
				throw new Error(`Can not find player's id: ${this.playerId}`)
			}

			// update success
			Players[index].airflow = newAirflow

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	updatePlayerUsingCharacter(newCharacterId: number): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const index: number = Players.findIndex(
				(player) => player.id === this.playerId,
			)
			if (index === -1) {
				// not success
				throw new Error(`Can not find player's id: ${this.playerId}`)
			}

			const characterFound = Characters.find(
				(char) => char.id === newCharacterId,
			)
			if (!characterFound) {
				throw new Error(`Can't find this ${newCharacterId} in database`)
			}

			const playerCharacterFound = PlayerCharacters.find(
				(pc) =>
					pc.player_id === this.playerId && pc.character_id === newCharacterId,
			)
			if (!playerCharacterFound) {
				throw new Error(`You haven't this character with id: ${newCharacterId}`)
			}

			// update success
			Players[index].selected_character_id = newCharacterId

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	getRankings(): Promise<Response<RankDTO[]>> {
		return new Promise<Response<RankDTO[]>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const ranksDTO: RankDTO[] = []

			Players.forEach((player) => {
				const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
					(game) => game.player_id === player.id && game.status === 'END',
				)

				const playerAccumulatedScore: number = playerGameSessions.reduce(
					(accumulator, game) => accumulator + game.score,
					0,
				)

				const playCount: number = playerGameSessions.length

				const rankDTO: RankDTO = {
					playerId: player.id,
					username: player.username,
					accumulatedScore: playerAccumulatedScore,
					accumulatedPlay: playCount,
				}

				ranksDTO.push(rankDTO)
			})

			resolve({
				message: 'OK',
				response: ranksDTO,
			})
		})
	}

	getPlayerBoosters(): Promise<Response<BoosterDTO[]>> {
		return new Promise<Response<BoosterDTO[]>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const playerBoosters: PlayerBoosterSchema[] = PlayerBoosters.filter(
				(booster) => booster.player_id === this.playerId,
			)

			// sort booster's id
			const boosters: PlayerBoosterSchema[][] = []
			for (let i = 0; i < Boosters.length; i++) {
				const booster: PlayerBoosterSchema[] = playerBoosters.filter(
					(b) => b.booster_id === i + 1,
				)
				boosters.push(booster)
			}

			// [
			//      {boosterId: 1,      expireDate: ["2024-06-24T12:00:00.000Z","2024-06-24T13:00:00.000Z", null],    amount : 3 },
			//      {boosterId: 2 ,     expireDate: ["2024-06-24T09:00:00.000Z","2024-06-24T12:00:00.000Z"],    amount : 2 },
			//      {boosterId: 3 ,     expireDate: [null]},
			//      {boosterId: 4 ,     expireDate: []},
			//      {boosterId: 5 ,     expireDate: []},
			//      {boosterId: 6 ,     expireDate: []},
			//      {boosterId: 7 ,     expireDate: []},
			// ]
			const boostersDTO: BoosterDTO[] = []

			boosters.forEach((booster) => {
				// player have never seen this booster
				if (booster.length === 0) {
					return
				}

				// player can see this booster before
				// compound booster that permanent and limited time and available
				// filter booster that expire before function
				const boosterAvailable: PlayerBoosterSchema[] = booster.filter((b) => {
					if (b.status !== 'AVAILABLE') {
						return false
					}

					// check expire
					if (b.expired_at) {
						const boosterExpireAt: Date = b.expired_at as Date
						const isExpire: boolean = Date.now() > boosterExpireAt.getTime()
						if (isExpire) {
							// delete expire booster
							const expireIndex: number = PlayerBoosters.findIndex(
								(pb) => pb === b,
							)
							if (expireIndex === -1) {
								throw new Error(
									`Something wrong. Can't found player's booster: ${b}`,
								)
							}

							PlayerBoosters[expireIndex].status = 'EXPIRE'

							console.log(`Booster [${b.booster_id}] is expire.`)
							return false
						}
					}

					return true
				})

				// sort expire date
				boosterAvailable.sort((a, b) => {
					if (a.expired_at === null && b.expired_at === null) {
						return 0 // Both dates are null, no preference
					} else if (a.expired_at === null) {
						return 1 // a.date is null, so it comes after b.date (not null)
					} else if (b.expired_at === null) {
						return -1 // b.date is null, so it comes after a.date (not null)
					} else {
						return a.expired_at.getTime() - b.expired_at.getTime() // Both dates are defined, compare normally
					}
				})

				const BoosterDTO: BoosterDTO = {
					boosterId: booster[0].booster_id,
					expireDate: boosterAvailable.map((b) => b.expired_at),
				}
				boostersDTO.push(BoosterDTO)
			})

			resolve({
				message: 'OK',
				response: boostersDTO,
			})
		})
	}

	updateGameSession(
		gameSessionId: number,
		score: number,
		lap: number,
	): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const indexFound: number = GameSessions.findIndex(
				(gs) => gs.id === gameSessionId,
			)
			if (indexFound === -1) {
				throw new Error(
					`Can't found index of gameSession's id: ${gameSessionId}`,
				)
			}

			// check expire of gameSession
			// expire in 30 minutes
			const now: Date = new Date()
			const timeStartAt: number = GameSessions[indexFound].started_at.getTime()
			const isExpire: boolean = now.getTime() > timeStartAt + 1800000
			if (isExpire) {
				this.cancelGameSession(gameSessionId)
				throw new Error('This game session has time more that 30 minutes.')
			}

			// too end gameSession
			if (lap > 10) {
				throw new Error('This game session needs to end now.')
			}

			// update
			GameSessions[indexFound].score = score
			GameSessions[indexFound].lap = lap
			GameSessions[indexFound].updated_at = now

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	cancelGameSession(gameSessionId: number): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const indexFound: number = GameSessions.findIndex(
				(
					gs, // game session
				) => gs.id === gameSessionId,
			)
			if (indexFound === -1) {
				throw new Error(
					`Can't found index of gameSession's id: ${gameSessionId}`,
				)
			}

			// update
			const now: Date = new Date()
			GameSessions[indexFound].status = 'CANCEL'
			GameSessions[indexFound].updated_at = now

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	getPlayerLevel(): Promise<Response<number>> {
		return new Promise<Response<number>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
				(game) => game.player_id === this.playerId && game.status === 'END',
			)

			const playerAccumulatedScore: number = playerGameSessions.reduce(
				(accumulator, game) => accumulator + game.score,
				0,
			)

			const playerLevel: number = this.findPlayerLevel(playerAccumulatedScore)

			// TODO add booster from condition?

			resolve({
				message: 'OK',
				response: playerLevel,
			})
		})
	}

	getPlayerAchievementsId(): Promise<Response<number[]>> {
		return new Promise<Response<number[]>>((resolve) => {
			// TODO add new player's achievement by examine data in database?
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const playerAchievementsId: number[] = PlayerAchievements.filter(
				(a) => a.player_id === this.playerId,
			).map((a) => a.achievement_id)

			resolve({
				message: 'OK',
				response: playerAchievementsId,
			})
		})
	}

	addVas(vasScore: VasScore): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const id: number = Vas.length + 1
			const now: Date = new Date()

			const vasDTO: VasSchema = {
				id: id,
				player_id: this.playerId,
				vas_score: vasScore,
				created_at: now,
			}

			// add to database
			Vas.push(vasDTO)

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	getMyRanking(): Promise<Response<RankDTO>> {
		return new Promise<Response<RankDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const playerFound = Players.find((player) => player.id === this.playerId)

			if (!playerFound) {
				throw new Error(`Can't find player with player's id: ${this.playerId}`)
			}

			const player: PlayerSchema = playerFound as PlayerSchema

			const playerGameSessions: GameSessionSchema[] = GameSessions.filter(
				(game) => game.player_id === player.id && game.status === 'END',
			)

			const playerAccumulatedScore: number = playerGameSessions.reduce(
				(accumulator, game) => accumulator + game.score,
				0,
			)

			const playCount: number = playerGameSessions.length

			const rankDTO: RankDTO = {
				playerId: player.id,
				username: player.username,
				accumulatedScore: playerAccumulatedScore,
				accumulatedPlay: playCount,
			}

			resolve({
				message: 'OK',
				response: rankDTO,
			})
		})
	}

	getAchievement(
		achievementId: number,
	): Promise<Response<AchievementDetailDTO>> {
		return new Promise<Response<AchievementDetailDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const achievementFound = Achievements.find((a) => a.id === achievementId)

			if (!achievementFound) {
				throw new Error(`Can't find achievement with id: ${achievementId}`)
			}

			const achievement: AchievementSchema =
				achievementFound as AchievementSchema

			const emptyAchievement = <AchievementDetailDTO>{}

			const achievementDTO: AchievementDetailDTO = {
				...emptyAchievement,
				id: achievement.id,
				name: achievement.name,
				detail: achievement.detail,
			}

			resolve({
				message: 'OK',
				response: achievementDTO,
			})
		})
	}

	getCharacter(characterId: number): Promise<Response<CharacterDetailDTO>> {
		return new Promise<Response<CharacterDetailDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const characterFound = Characters.find((c) => c.id === characterId)

			if (!characterFound) {
				throw new Error(`Can't find character with id: ${characterId}`)
			}

			const character: CharacterSchema = characterFound as CharacterSchema

			const characterDTO: CharacterDetailDTO = {
				characterId: character.id,
				name: character.name,
				detail: character.detail,
			}

			resolve({
				message: 'OK',
				response: characterDTO,
			})
		})
	}

	getBooster(boosterId: number): Promise<Response<BoosterDetailDTO>> {
		return new Promise<Response<BoosterDetailDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const boosterFound = Boosters.find((b) => b.id === boosterId)

			if (!boosterFound) {
				throw new Error(`Can't find booster with id: ${boosterId}`)
			}

			const booster: BoosterSchema = boosterFound as BoosterSchema
			const emptyBooster = <BoosterDetailDTO>{}
			const boosterDTO: BoosterDetailDTO = {
				...emptyBooster,
				...booster,
			}

			resolve({
				message: 'OK',
				response: boosterDTO,
			})
		})
	}

	getBoss(bossId: number): Promise<Response<BossDetailDTO>> {
		return new Promise<Response<BossDetailDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const bossFound = Bosses.find((b) => b.id === bossId)

			if (!bossFound) {
				throw new Error(`Can't find boss with id: ${bossId}`)
			}

			const boss: BoosterSchema = bossFound as BoosterSchema

			const bossDTO: BossDetailDTO = {
				bossId: boss.id,
				name: boss.name,
				detail: boss.detail,
			}

			resolve({
				message: 'OK',
				response: bossDTO,
			})
		})
	}

	startGameSession(boostersId: number[]): Promise<Response<GameSessionDTO>> {
		return new Promise<Response<GameSessionDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			// apply booster
			let resolveIndex: number[] = []
			try {
				resolveIndex = this.applyPlayerBooster(boostersId)
			} catch (error) {
				throw error
			}

			// create gameSession
			const bossId = this.randomBossId()
			const randomDropBooster = this.randomDropBooster()
			const boosterDropId = randomDropBooster.boosterId
			const boosterDuration = randomDropBooster.boosterDuration

			const gameSession = this.createGameSession(
				bossId,
				boosterDropId,
				boosterDuration,
			)

			const emptyGameSession = <GameSessionDTO>{}
			const gameSessionDTO: GameSessionDTO = {
				...emptyGameSession,
				...gameSession,
			}

			// update all booster when this function has done successfully
			resolveIndex.forEach((index) => (PlayerBoosters[index].status = 'EXPIRE'))

			// add to database
			GameSessions.push(gameSession)

			resolve({
				message: 'OK',
				response: gameSessionDTO,
			})
		})
	}

	finishGameSession(
		gameSessionId: number,
		score: number,
		lap: number,
		isReceiveBooster: boolean,
	): Promise<Response<GameSessionFinishedDTO>> {
		return new Promise<Response<GameSessionFinishedDTO>>(async (resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			if (lap !== 10) {
				throw new Error(
					`Can't finish game. Lap must have 10 number from lap: ${lap}`,
				)
			}

			// calculate Level before update
			let playerLevel: number
			try {
				playerLevel = (await this.getPlayerLevel()).response
			} catch (error) {
				throw error
			}

			if (!playerLevel) {
				throw new Error('getPlayerLeveL() was not define.')
			}

			// update game
			try {
				await this.updateGameSession(gameSessionId, score, lap)
			} catch (error) {
				throw error
			}

			const indexFound: number = GameSessions.findIndex(
				(gs) => gs.id === gameSessionId,
			)
			if (indexFound === -1) {
				throw new Error(
					`Can't found index of gameSession's id: ${gameSessionId}`,
				)
			}

			GameSessions[indexFound].ended_at = new Date()
			GameSessions[indexFound].status = 'END'

			// calculate new Level
			let newPlayerLevel: number
			try {
				newPlayerLevel = (await this.getPlayerLevel()).response
			} catch (error) {
				throw error
			}

			if (!newPlayerLevel) {
				throw new Error('getPlayerLeveL() was not define.')
			}

			// return variable
			const boosterByLevelUpId: number[] = await this.getBoosterLevelUp(
				playerLevel,
				newPlayerLevel,
			)
			const achievementUnlockedId: number[] = this.getAchievementUnlock()

			// add player booster
			if (isReceiveBooster) {
				try {
					const boosters = [
						{
							boosterId: GameSessions[indexFound].booster_drop_id,
							duration: GameSessions[indexFound].booster_drop_duration,
						},
					]
					this.addPlayerBoosters(boosters)
				} catch (error) {
					throw error
				}
			}

			const gameSessionFinishedDTO: GameSessionFinishedDTO = {
				level: playerLevel,
				boosterByLevelUpId: boosterByLevelUpId,
				achievementUnlockedId: achievementUnlockedId,
			}

			resolve({
				message: 'OK',
				response: gameSessionFinishedDTO,
			})
		})
	}

	getGameSession(gameSessionId: number): Promise<Response<GameSessionDTO>> {
		return new Promise<Response<GameSessionDTO>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			const gameSessionFound = GameSessions.find(
				(gs) => gs.id === gameSessionId,
			)

			if (!gameSessionFound) {
				throw new Error(`Can't find game session with id: ${gameSessionId}`)
			}

			const gameSession = gameSessionFound as GameSessionSchema

			const gameSessionDTO: GameSessionDTO = {
				...gameSession,
			}

			resolve({
				message: 'OK',
				response: gameSessionDTO,
			})
		})
	}

	addPlayerCharacter(characterId: number): Promise<Response<void>> {
		return new Promise<Response<void>>((resolve) => {
			// auth
			if (!this.isLogin) {
				throw new Error('Please Log in.')
			}

			// check condition that can unlock by look at Characters' achievement_number_required

			const characterFound = Characters.find((c) => c.id === characterId)

			if (!characterFound) {
				throw new Error(`Can't find character with id: ${characterId}`)
			}

			const characterTarget: CharacterSchema = characterFound as CharacterSchema

			const achievementLen: number = PlayerAchievements.filter(
				(a) => a.player_id === this.playerId,
			).length

			const amountRequired = characterTarget.achievement_number_required
			if (achievementLen < amountRequired) {
				throw new Error(
					`Achievement number required(${amountRequired}) is less than your achievement number(${achievementLen})`,
				)
			}

			// check that character already have
			const playerCharacterFound = PlayerCharacters.find(
				(char) =>
					char.player_id === this.playerId && char.character_id === characterId,
			)
			if (playerCharacterFound) {
				throw new Error(
					`Player already have this character's id: ${characterId}`,
				)
			}

			// add player character to database
			const playerCharacter: PlayerCharacterSchema = {
				player_id: this.playerId,
				character_id: characterId,
			}

			PlayerCharacters.push(playerCharacter)

			resolve({
				message: 'OK',
				response: undefined,
			})
		})
	}

	getAllCharacters(): Promise<Response<CharacterDetailDTO[]>> {
		return new Promise<Response<CharacterDetailDTO[]>>((resolve) => {
			const charactersDTO: CharacterDetailDTO[] = []

			Characters.forEach((c) => {
				const characterDTO: CharacterDetailDTO = {
					characterId: c.id,
					name: c.name,
					detail: c.detail,
				}

				charactersDTO.push(characterDTO)
			})

			resolve({
				message: 'OK',
				response: charactersDTO,
			})
		})
	}

	getAllBoosters(): Promise<Response<BoosterDetailDTO[]>> {
		return new Promise<Response<BoosterDetailDTO[]>>((resolve) => {
			const boostersDTO: BoosterDetailDTO[] = []

			const emptyBooster = <BoosterDetailDTO>{}
			Boosters.forEach((b) => {
				const boosterDTO: BoosterDetailDTO = {
					...emptyBooster,
					boosterId: b.id,
					name: b.name,
					detail: b.detail,
				}

				boostersDTO.push(boosterDTO)
			})

			resolve({
				message: 'OK',
				response: boostersDTO,
			})
		})
	}

	getAllAchievements(): Promise<Response<AchievementDetailDTO[]>> {
		return new Promise<Response<AchievementDetailDTO[]>>((resolve) => {
			const achievementsDTO: AchievementDetailDTO[] = []
			const emptyAchievement = <AchievementDetailDTO>{}
			Achievements.forEach((a) => {
				const achievementDTO: AchievementDetailDTO = {
					...emptyAchievement,
					id: a.id,
					name: a.name,
					detail: a.detail,
				}

				achievementsDTO.push(achievementDTO)
			})

			resolve({
				message: 'OK',
				response: achievementsDTO,
			})
		})
	}
}
