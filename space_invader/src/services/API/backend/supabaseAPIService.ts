import {
	CharacterDetailDTO,
	finishGameSessionInputDTO,
	Response,
	UnlockCharacterInput,
	UnlockedCharacterDTO,
} from '../definition/responseDTO'
import { supabaseClient } from './supabaseClient'

// TODO handle errors
// TODO headers

export default class supabaseAPIService {
	async register(
		phoneNumber: string,
		age: number,
		gender: string,
		airflow: number,
		difficultyId: number,
	) {
		const { data, error } = await supabaseClient.functions.invoke('register', {
			headers: {
				Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
			},
			body: {
				phoneNumber: phoneNumber,
				age: age,
				gender: gender,
				airflow: airflow,
				difficultyId: difficultyId,
			},
		})
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async login(phoneNumber: string) {
		const { data, error } = await supabaseClient.functions.invoke('login', {
			headers: {
				Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
			},
			body: {
				phoneNumber: phoneNumber,
			},
		})
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async updateUsername(username: string) {
		const { data, error } = await supabaseClient.functions.invoke(
			'update-username',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					username: username,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async updateSelectedCharacter(characterId: number) {
		const { data, error } = await supabaseClient.functions.invoke(
			'update-selected-character',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					character_id: characterId,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async updateCurrentDifficulty(difficultyId: number) {
		const { data, error } = await supabaseClient.functions.invoke(
			'update-selected-character',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					difficulty_id: difficultyId,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async updateAirflow(airflow: number) {
		const { data, error } = await supabaseClient.functions.invoke(
			'update-selected-character',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					airflow: airflow,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async startGameSession(playerBoosterId: number) {
		const { data, error } = await supabaseClient.functions.invoke(
			'start-game',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					player_booster_id: playerBoosterId,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async updateGameSession({ score, lap }: { score: number; lap: number }) {
		const { data, error } = await supabaseClient.functions.invoke(
			'update-game',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					score: score,
					lap: lap,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async endGameSession() {
		const { data, error } = await supabaseClient.functions.invoke(
			'cancel-game',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async finishGameSession({
		score,
		lap,
		is_booster_received,
	}: finishGameSessionInputDTO) {
		const { data, error } = await supabaseClient.functions.invoke(
			'finish-game',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: {
					score: score,
					lap: lap,
					is_booster_received: is_booster_received,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async getUnlockedAchievement() {
		const { data, error } = await supabaseClient.functions.invoke(
			'get-unlocked-achievements',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async getBoosterBag() {
		const { data, error } = await supabaseClient.functions.invoke(
			'get-booster-bag',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async getBoosterRedeem() {
		const { data, error } = await supabaseClient.functions.invoke(
			'get-booster-redeem',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async getUnlockedCharacter(): Promise<Response<UnlockedCharacterDTO[]>> {
		const { data, error } = await supabaseClient.functions.invoke(
			'get-unlocked-characters',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}

	async unlockCharacter({ character_id }: UnlockCharacterInput) {
		const { data, error } = await supabaseClient.functions.invoke(
			'unlock-character',
			{
				headers: {
					Authorization: 'Bearer ' + import.meta.env.VITE_JWT_TOKEN,
				},
				body: { character_id },
			},
		)
		if (error) {
			throw new Error('error')
		}

		return data
	}
}
