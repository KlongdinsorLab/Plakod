import TimeService from 'services/timeService'

export default class Heart {
	private heart: Phaser.GameObjects.Image
	private heartCountdown: Phaser.GameObjects.Text
	private isHeartRecharged = true
	private scene: Phaser.Scene

	constructor(scene: Phaser.Scene, x: number, y: number, heartIndex: number) {
		this.scene = scene

		const timeService = new TimeService()
		// TODO: call api
		const lastPlayTime = new Date(localStorage.getItem(`lastPlayTime${heartIndex}`) ?? '')
		this.isHeartRecharged = timeService.isRecharged(lastPlayTime)
		if (!this.isHeartRecharged) {
			const interval = setInterval(() => {
				const timeCoundown = timeService.getTimeCountdown(lastPlayTime)
				this.heartCountdown.setText(timeCoundown)
				this.isHeartRecharged = timeService.isRecharged(lastPlayTime)
				if (this.isHeartRecharged) {
					this.fillHeart()
					this.heartCountdown.setText("")
					clearInterval(interval)
				}
			})
		}

		this.heart = scene.add
			.image(x, y, 'heart_spritesheet', this.isHeartRecharged ? 'heart_full.png' : 'heart_empty.png')
			.setOrigin(0.5, 0)

		if(this.isHeartRecharged) {
			this.heart.postFX?.addGlow(0xFFFFFF,1,0,false,0.1,50)
		}

		this.heartCountdown = scene.add
			.text(x, y + 92, ``)
			.setOrigin(0.5, 0)
			// .setVisible(!this.isHeartRecharged)

		// For animation testing
		/*this.heart.setInteractive().on('pointerup', () => {
			if (this.isHeartRecharged) {
				this.emptyHeart()
				this.isHeartRecharged = false
			}
			else {
				this.fillHeart()
				this.isHeartRecharged = true
			}
		})*/
	}

	getBody(): Phaser.GameObjects.Image {
		return this.heart
	}

	getIsRecharged(): boolean {
		return this.isHeartRecharged
	}
	
	initFontStyle() {
		this.heartCountdown
			.setStyle({
				fontFamily: 'Jua',
				color: '#DD2D04',
			})
			.setFontSize('24px')
			.setStroke('white', 3)
		this.heartCountdown
			.setStyle({
				fontFamily: 'Jua',
				color: '#DD2D04',
			})
			.setFontSize('24px')
			.setStroke('white', 3)
	}

	emptyHeart() {
		this.scene.tweens.add({
			targets: this.heart,
			alpha: 0,
			duration: 1000,
			onComplete: (_, targets) => {
				targets[0].setTexture('heart_spritesheet', 'heart_empty.png')
				this.scene.tweens.add({
					targets: targets[0],
					alpha: 1,
					duration: 500,
				})
			},
		})

	}

	fillHeart() {
		this.scene.tweens.add({
			targets: this.heart,
			alpha: 0,
			duration: 1000,
			onComplete: (_, targets) => {
				targets[0].setTexture('sheet', 'heart_full.png')
				this.scene.tweens.add({
					targets: targets[0],
					alpha: 1,
					duration: 500,
				})
			},
		})
	}
}