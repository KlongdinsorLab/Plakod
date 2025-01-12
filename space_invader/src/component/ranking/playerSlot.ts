/* eslint-disable @typescript-eslint/no-inferrable-types */
import Phaser from 'phaser'
import { AccumulationType } from 'scene/submenu/RankingScene'

export class PlayerSlot {
	private scene: Phaser.Scene
	private playerName: string
	private playerRank: number
	private playerStat: number
	private badgeKey!: string

	private position: { x: number; y: number }

	private slotBackground!: Phaser.GameObjects.Graphics
	private playerBadge!: Phaser.GameObjects.Image
	private playerBadgeCircle!: Phaser.GameObjects.Graphics
	private playerRankText!: Phaser.GameObjects.Text
	private playerNameText!: Phaser.GameObjects.Text
	private playerStatText!: Phaser.GameObjects.Text
	private badgePosition!: { x: number; y: number }
	private isCurrentPlayer?: boolean
	private isCurrentPlayerSlot?: boolean
	private textMargin: number = 0

	//slot bg color code
	private defaultSlotBackgroundColor: number = 0xffe7ba
	private currentPlayerSlotBackgroundColor: number
	private playerSlotBackground: number
	private playerSlotBackgroundStroke: number

	constructor(
		scene: Phaser.Scene,
		playerName: string,
		playerRank: number,
		playerStat: number,
		accumulationType: AccumulationType,
		position: { x: number; y: number },
		isCurrentPlayer?: boolean,
		isCurrentPlayerSlot?: boolean,
	) {
		this.scene = scene
		this.playerName = playerName
		this.playerRank = playerRank
		this.playerStat = playerStat
		this.position = position
		this.isCurrentPlayer = isCurrentPlayer ? true : false
		this.isCurrentPlayerSlot = isCurrentPlayerSlot ? true : false
		if (accumulationType === AccumulationType.ACCUMULATION_SCORE) {
			this.badgeKey = 'badge'
			this.badgePosition = { x: 24, y: 0 }
			this.currentPlayerSlotBackgroundColor = 0x8feed1
			this.playerSlotBackground = 0x8feed1
			this.playerSlotBackgroundStroke = 0x43a99e
		} else {
			this.badgeKey = 'heart'
			this.badgePosition = { x: 24, y: 18 }
			this.currentPlayerSlotBackgroundColor = 0xffd338
			this.playerSlotBackground = 0xffd338
			this.playerSlotBackgroundStroke = 0xbf7f03
		}
		if (!isCurrentPlayerSlot) {
			this.create()
		}
	}

	create() {
		let slotColor = this.defaultSlotBackgroundColor

		if (this.isCurrentPlayerSlot) {
			this.textMargin = 16
			slotColor = this.currentPlayerSlotBackgroundColor
			this.slotBackground = this.scene.add.graphics()
			this.slotBackground.fillStyle(this.playerSlotBackground)
			this.slotBackground.fillRoundedRect(
				this.position.x,
				this.position.y,
				624,
				136,
				{ tl: 0, tr: 0, bl: 40, br: 40 },
			)
			this.slotBackground.lineStyle(6, this.playerSlotBackgroundStroke)
			this.slotBackground.strokeRoundedRect(
				this.position.x,
				this.position.y,
				624,
				136,
				{ tl: 0, tr: 0, bl: 40, br: 40 },
			)
		} else {
			if (this.isCurrentPlayer)
				slotColor = this.currentPlayerSlotBackgroundColor
			this.slotBackground = this.scene.add.graphics()
			this.slotBackground.fillStyle(slotColor)
			this.slotBackground.fillRoundedRect(
				this.position.x,
				this.position.y,
				576,
				88,
				20,
			)
		}

		if (this.playerRank <= 3) {
			const badge = this.checkBadge()
			const badgeFrame =
				'icon_' + this.badgeKey + '_' + badge.badgeName + '.png'
			this.playerBadge = this.scene.add
				.image(
					this.position.x + this.badgePosition.x + this.textMargin,
					this.position.y + this.badgePosition.y,
					'icon',
					badgeFrame,
				)
				.setOrigin(0)
			this.playerRankText = this.scene.add
				.text(
					this.position.x + 56 + this.textMargin,
					this.position.y + 48,
					this.playerRank.toString(),
					{
						fontSize: '24px',
						color: '#FFFFFF',
						stroke: badge.badgeColor,
						strokeThickness: 6,
					},
				)
				.setAlign('center')
				.setOrigin(0.5, 0.5)
		} else {
			this.playerBadgeCircle = this.scene.add.graphics()
			this.playerBadgeCircle.fillStyle(0xc7beb0)
			this.playerBadgeCircle.fillCircle(
				this.position.x + 56 + this.textMargin,
				this.position.y + 44,
				26,
			)
			this.playerBadgeCircle.lineStyle(3, 0x958e83)
			this.playerBadgeCircle.strokeCircle(
				this.position.x + 56 + this.textMargin,
				this.position.y + 44,
				26,
			)
			this.playerRankText = this.scene.add
				.text(
					this.position.x + 56 + this.textMargin,
					this.position.y + 44,
					this.playerRank.toString(),
					{
						fontSize: '24px',
						color: '#FFFFFF',
						stroke: '#958E83',
						strokeThickness: 6,
					},
				)
				.setAlign('center')
				.setOrigin(0.5, 0.5)
		}
		this.playerNameText = this.scene.add
			.text(
				this.position.x + 96 + this.textMargin,
				this.position.y + 40,
				this.formatTextNameSlot(this.playerName, 7),
				{ fontSize: '32px', color: '#57453B' },
			)
			.setAlign('start')
			.setOrigin(0, 0.5)
			.setPadding(0, 20, 0, 10)

		this.playerStatText = this.scene.add
			.text(
				this.position.x + 552 + this.textMargin,
				this.position.y + 44,
				this.formatTextNumberSlot(this.playerStat.toString(), 11),
				{ fontSize: '32px', color: '#57453B' },
			)
			.setAlign('end')
			.setOrigin(1, 0.5)
	}

	checkBadge(): { badgeName: string; badgeColor: string } {
		if (this.playerRank === 1) {
			return { badgeName: 'gold', badgeColor: '#E39600' }
		} else if (this.playerRank === 2) {
			return { badgeName: 'silver', badgeColor: '#777777' }
		} else if (this.playerRank === 3) {
			return { badgeName: 'bronze', badgeColor: '#CF5C2B' }
		}
		return { badgeName: '', badgeColor: '#000000' }
	}

	lengthOfString(username: string): { length: number; noCnt: number } {
		if (!username) {
			return { length: 0, noCnt: 0 }
		}

		let length = username?.length ?? 0
		let noCnt = 0
		const pattern = /[่้๊๋ิี็ํูืฺุ]/

		for (const char of username) {
			if (pattern.test(char)) {
				noCnt++
			}
		}

		length = length - noCnt

		return { length, noCnt }
	}

	formatTextNumberSlot(str: string, n: number): string {
		let fstr = ''

		str = str.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

		if (str.length > n) {
			fstr = str.substring(0, n) + '...'
		} else {
			fstr = str
		}

		return fstr
	}

	formatTextNameSlot(str: string, n: number): string {
		let fstr = ''
		const { length, noCnt } = this.lengthOfString(str)

		if (length > n) {
			fstr = str.substring(0, n + noCnt) + '...'
		} else {
			fstr = str
		}

		return fstr
	}

	initFontStyle(): void {
		this.playerRankText?.setStyle({
			fontFamily: 'Jua',
			fontWeight: 400,
		})
		this.playerNameText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})
		this.playerStatText?.setStyle({
			fontFamily: 'Mali',
			fontStyle: 'bold',
		})
	}

	destroy() {
		this.slotBackground.destroy()
		this.playerBadge?.destroy()
		this.playerBadgeCircle?.destroy()
		this.playerRankText.destroy()
		this.playerNameText.destroy()
		this.playerStatText.destroy()
	}
}
