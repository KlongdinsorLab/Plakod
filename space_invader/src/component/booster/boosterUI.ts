import TimeService from 'services/timeService'
import { BoosterName } from './booster'

export enum States {
	PERMANENT,
	LIMITED_TIME,
	UNAVAILABLE,
}

export class BoosterUI {
	private scene: Phaser.Scene
	private name: BoosterName
	private boosterSize!: { width: number; height: number }
	private boosterImage!: Phaser.GameObjects.Image
	private position!: { x: number; y: number }
	private state: States = States.UNAVAILABLE
	private amount: number | undefined
	private frame!: string
	private expired_at: string | undefined
	private expireArray: string[] = []
	private markCircle!: Phaser.GameObjects.Arc
	private markText!: Phaser.GameObjects.Text
	private unavailableCircle!: Phaser.GameObjects.Arc

	private onSetUnavailableCallback?: () => void

	private timeService = new TimeService()
	//private startTime: Date = new Date(Date.now());
	private timeText!: string
	private countdownIndex: number = 0
	private countdownTime!: Phaser.GameObjects.Text
	private timeEvent!: Phaser.Time.TimerEvent
	private isCompleteInit: boolean = false
	private isBoosterBag: boolean = false
	private isTimeout: boolean = false

	constructor(
		scene: Phaser.Scene,
		name: BoosterName,
		options?: {
			x?: number
			y?: number
			width?: number
			height?: number
			amount?: number
			expired_at?: string | null
			expireArray?: string[]
			canSelect?: boolean
			isBoosterBag?: boolean
		},
	) {
		this.scene = scene
		this.name = name

		this.position = {
			x: options?.x ?? -1,
			y: options?.y ?? -1,
		}
		this.boosterSize = {
			width: options?.width ?? 96,
			height: options?.height ?? 96,
		}

		this.isCompleteInit = false
		this.isBoosterBag = options?.isBoosterBag ?? false
		this.amount = options?.amount ?? 0
		this.expired_at = options?.expired_at ?? undefined
		this.expireArray = options?.expireArray ?? []
		this.setState()
	}
	create(): void {
		if (this.name === BoosterName.BOOSTER_1) {
			this.frame = '1'
		} else if (this.name === BoosterName.BOOSTER_2) {
			this.frame = '2'
		} else if (this.name === BoosterName.BOOSTER_3) {
			this.frame = '3'
		} else if (this.name === BoosterName.BOOSTER_4) {
			this.frame = '4'
		} else if (this.name === BoosterName.BOOSTER_5) {
			this.frame = '5'
		} else if (this.name === BoosterName.BOOSTER_RARE1) {
			this.frame = '_rare1'
		} else if (this.name === BoosterName.BOOSTER_RARE2) {
			this.frame = '_rare2'
		}

		this.boosterImage = this.scene.add
			.image(
				this.position.x,
				this.position.y,
				'dropItem',
				'booster' + this.frame + '.png',
			)
			.setOrigin(0, 0)
			.setSize(this.boosterSize.width, this.boosterSize.height)
	}

	setState(): void {
		if (this.expired_at && this.isBoosterBag) {
			this.state = States.LIMITED_TIME
		}
		if (this.expired_at === undefined && this.isBoosterBag) {
			this.state = States.UNAVAILABLE
		}
		if (this.expireArray && !this.isBoosterBag) {
			this.state = States.LIMITED_TIME
			if (this.countdownIndex > this.expireArray.length - 1) {
				this.state = States.PERMANENT
				this.isCompleteInit = true
			}
			if (this.amount == 0) {
				this.state = States.UNAVAILABLE
			}
		} else if (this.amount && this.amount > 0) {
			this.state = States.PERMANENT
			this.isCompleteInit = true
		}
	}

	initBooster(): void {
		if (this.state === States.PERMANENT) {
			this.setAmount()
		} else if (this.state === States.LIMITED_TIME) {
			if (this.expired_at) {
				this.setTimer()
			} else if (this.expireArray) {
				this.setAmount()
				this.setTimer()
			}
		} else {
			this.setUnavailable()
		}
	}

	setAmount() {
		if (this.markText) {
			this.markText.setText(this.amount!.toString())
		} else {
			this.markCircle = this.scene.add
				.circle(this.position.x + 104, this.position.y, 16, 0xd35e24)
				.setOrigin(1, 0)
				.setDepth(1)
			this.markText = this.scene.add
				.text(
					this.position.x + 88,
					this.position.y + 2,
					this.amount!.toString(),
				)
				.setOrigin(0.5, 0)
				.setDepth(1)
			this.initFontStyle()
		}
	}

	setTimer(): void {
		let dateObject: Date
		if (this.expireArray && !this.isBoosterBag) {
			const expire = this.expireArray[this.countdownIndex]
			dateObject = new Date(expire)
		} else if (this.expired_at) {
			dateObject = new Date(this.expired_at)
		}

		this.countdownTime = this.scene.add
			.text(this.position.x, this.position.y + 104, '', {
				fontSize: '20px',
				color: '#111111',
			})
			.setOrigin(0, 0)
			.setColor('#000000')
		this.initFontStyle()

		this.timeEvent = this.scene.time.addEvent({
			delay: 1000,
			callback: () => {
				const timeCount = this.timeService.getDurationTime(dateObject)
				if (timeCount === 'timeout') {
					if (this.expireArray && !this.isBoosterBag) {
						this.countdownIndex++
						this.amount!--
					} else if (this.expired_at) {
						this.expired_at = undefined
						this.isTimeout = true
						this.destroy()
					}
					if (this.countdownTime.active) {
						this.countdownTime.destroy()
					}
					this.isCompleteInit = false
					this.setState()
					this.initBooster()
					this.timeEvent.remove()
				} else {
					this.countdownTime.setText(timeCount)
					this.timeText = timeCount
					this.isCompleteInit = true
				}
			},
			loop: true,
		})
	}

	setUnavailable(): void {
		if (!this.isBoosterBag) {
			if (this.markCircle) {
				this.markCircle.destroy()
			}
			if (this.markText) {
				this.markText.destroy()
			}
			this.unavailableCircle = this.scene.add
				.circle(this.position.x, this.position.y, 48, 0x000000, 0.6)
				.setOrigin(0, 0)
		}
		this.isCompleteInit = true

		if (this.onSetUnavailableCallback) {
			this.onSetUnavailableCallback()
		}
	}

	onSetUnavailable(callback: () => void): void {
		this.onSetUnavailableCallback = callback
	}

	getBody(): Phaser.GameObjects.Image {
		return this.boosterImage
	}

	getTimeText(): string {
		return this.timeText
	}

	getAmount(): number {
		return this.amount!
	}

	getName(): BoosterName {
		return this.name
	}

	getState(): States {
		return this.state
	}

	getPosition(): { x: number; y: number } {
		return this.position
	}

	getIsCompleteInit(): boolean {
		return this.isCompleteInit
	}

	getFrame(): string {
		return this.frame
	}

	getIsTimeout(): boolean {
		return this.isTimeout
	}

	setBoosterWidth(width: number): void {
		this.boosterSize.width = width
	}
	setBoosterHeight(height: number): void {
		this.boosterSize.height = height
	}

	hide(): void {
		this.boosterImage.setVisible(false)
		this.markCircle?.setVisible(false)
		this.markText?.setVisible(false)
		this.countdownTime?.setVisible(false)
		this.unavailableCircle?.setVisible(false)
	}

	show(): void {
		this.boosterImage.setVisible(true)
		this.markCircle?.setVisible(true)
		this.markText?.setVisible(true)
		this.countdownTime?.setVisible(true)
		this.unavailableCircle?.setVisible(true)
	}

	destroy(): void {
		this.boosterImage.destroy()
		this.markCircle?.destroy()
		this.markText?.destroy()
		this.countdownTime?.destroy()
		this.timeEvent?.remove()
		this.unavailableCircle?.destroy()
	}

	initFontStyle(): void {
		if (this.markText) {
			this.markText
				?.setStyle({
					fontFamily: 'Jua',
					fontWeight: 400,
					fontSize: '20px',
					color: '#57453B',
				})
				.setStroke('#ffffff', 6)
		}
		if (this.countdownTime) {
			this.countdownTime
				?.setStyle({
					fontFamily: 'Jua',
					fontWeight: 400,
					fontSize: '20px',
					color: '#57453B',
				})
				.setStroke('#ffffff', 6)
		}
	}
}
