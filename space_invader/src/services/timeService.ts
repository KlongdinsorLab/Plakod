export default class TimeService {
	private playCount!: number
	private lastPlay1!: Date
	private lastPlay2!: Date
	constructor() {
		// TODO: call api
		this.lastPlay1 = new Date(localStorage.getItem('lastPlayTime1') ?? '')
		this.lastPlay2 = new Date(localStorage.getItem('lastPlayTime2') ?? '')
		this.playCount = Number(localStorage.getItem('playCount')) ?? 0
	}

	isFirstPlay(): boolean {
		const dateNow = new Date()
		const diff = Math.min(
			dateNow.getDate() - (this.lastPlay1.getDate() || 0),
			dateNow.getDate() - (this.lastPlay2.getDate() || 0),
		)
		const heart1Recharged = this.isRecharged(this.lastPlay1)
		const heart2Recharged = this.isRecharged(this.lastPlay2)

		return diff >= 1 && heart1Recharged && heart2Recharged
	}

	saveLastPlayTime() {
		// TODO: call api
		if (this.isFirstPlay()) {
			this.playCount = 0
		}
		localStorage.setItem('playCount', `${this.playCount + 1}`)

		const heartIndex = (this.playCount + 1) % 2 !== 0 ? 1 : 2
		const lastPlayTime = new Date()
		localStorage.setItem(`lastPlayTime${heartIndex}`, lastPlayTime.toString())
	}

	getTimeCountdown(lastPlayTime: Date): string {
		if (isNaN(lastPlayTime.getTime()) || this.playCount >= 10 || this.isRecharged(lastPlayTime)) return ''

		const timeNow = new Date().getTime()
		const distance =
			new Date(lastPlayTime.getTime() + 60 * 60000).getTime() - timeNow
		const hours = Math.floor(
			(distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
		)
		const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
		const seconds = Math.floor((distance % (1000 * 60)) / 1000)
		const timeText = `0${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
		return timeText
	}

	isRecharged(lastPlayTime: Date): boolean {
		if (isNaN(lastPlayTime.getTime())) {
			return true
		}
		const diff = (new Date().getTime() - lastPlayTime.getTime()) / 36e5
		return diff >= 1 && this.playCount != 10
	}
}

