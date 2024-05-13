import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import { MEDIUM_FONT_SIZE } from 'config'
import WebFont from 'webfontloader'
import TimeService from 'services/timeService'
import RankingButton from 'component/ui/home/RankingButton'
import HomeTopBar from 'component/ui/home/HomeTopBar'
import Heart from 'component/ui/Heart'
import InstructionButton from 'component/ui/home/InstructionButton.'
import PlayButton from 'component/ui/home/PlayButton'
import AchievementButton from 'component/ui/home/AchievementButton'
import SettingButton from 'component/ui/home/SettingButton'
import SoundToggle from 'component/ui/home/SoundToggle'

const ReminderText = {
	firstRound: "home_reminder_first_play",
	playTommorow: "home_reminder_play_tomorrow",
	heartEmpty: "home_reminder_empty_heart",
}

export default class HomeScene extends Phaser.Scene {
	private bgm?: Phaser.Sound.BaseSound

	constructor() {
		super('home')
	}

	init({ bgm }: { bgm: Phaser.Sound.BaseSound }) {
		this.bgm = bgm
	}

	preload() {
		this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)
		this.load.image('landing_page_bg', 'assets/background/landing_page_bg.png')
		this.load.atlas(
			'landing_page',
			'assets/ui/landing_page_spritesheet.png',
			'assets/ui/landing_page_spritesheet.json',
		)
		this.load.svg('mute', 'assets/icon/mute.svg')
		this.load.svg('unmute', 'assets/icon/unmute.svg')
	}

	create() {
		const { width, height } = this.scale
		const timeService = new TimeService(this)
		const isFirstPlay = timeService.isFirstPlay()
		console.log(isFirstPlay)

		this.add
			.tileSprite(0, 0, width, height, 'landing_page_bg')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		this.add
			.image(width / 2, 216, 'landing_page', 'logo_breathbuddy.png')
			.setOrigin(0.5, 0)
		

		// Reminder
		const reminderText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width / 2,
				216 + 224 + 24 + 84 + 8 + 24 + 48,
				ReminderText['firstRound'],
			)
			.setAlign('center')
			.setOrigin(0.5, 0)

		const self = this
		WebFont.load({
			google: {
				families: ['Mali', 'Jua'],
			},
			active: function () {
				const maliFontStyle = {
					fontFamily: 'Mali',
					fontStyle: 'bold',
				}
				
				new HomeTopBar(self)
				new Heart(self)
				new PlayButton(self, self.bgm)
				new RankingButton(self)
				new InstructionButton(self)
				new AchievementButton(self)
				new SettingButton(self)
				new SoundToggle(self)
				
				reminderText
					.setStyle({
						...maliFontStyle,
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)
					.setStroke('#57453B', 12)
			},
		})
	}
}
