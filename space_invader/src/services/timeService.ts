export default class TimeService {

	constructor() {
	}

	isFirstPlay(): boolean {
		const dateNow = new Date()
		// TODO: call time services from backend
		const lastPlay1 = new Date(localStorage.getItem('lastPlayTime1') ?? '')
		const lastPlay2 = new Date(localStorage.getItem('lastPlayTime2') ?? '')
		const diff = Math.min(dateNow.getDate() - lastPlay1.getDate(), dateNow.getDate() - lastPlay2.getDate())
		return diff >= 1
	}

	stampLastPlayTime(heartIndex: number) {
		// TODO: call time services from backend
		const lastPlayTime = new Date()
		localStorage.setItem(`lastPlayTime${heartIndex}`, lastPlayTime.toString())
	}

	getTimeCountdown(lastPlayTime: Date): string {
		if(isNaN(lastPlayTime.getTime())) return ""
		
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
		const diff = (new Date().getTime() - lastPlayTime.getTime()) / 36e5
		return diff >= 1
	}
}
