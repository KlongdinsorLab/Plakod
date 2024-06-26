import Phaser from 'phaser'
import I18nSingleton from 'i18n/I18nSingleton'
import { MARGIN, MEDIUM_FONT_SIZE } from 'config'
import WebFont from 'webfontloader'
import TimeService from 'services/timeService'
import RankingButton from 'component/ui/Button/RankingButton'
import HomeTopBar from 'component/ui/home/HomeTopBar'
import Heart from 'component/ui/Heart'
import InstructionButton from 'component/ui/Button/InstructionButton.'
import PlayButton from 'component/ui/Button/PlayButton'
import AchievementButton from 'component/ui/Button/AchievementButton'
import SettingButton from 'component/ui/Button/SettingButton'
import SoundToggle from 'component/ui/home/SoundToggle'

const ReminderText = {
	firstRound: 'home_reminder_first_play',
	heartEmpty: 'home_reminder_empty_heart',
	playTomorrow: 'home_reminder_play_tomorrow',
}

export default class HomeScene extends Phaser.Scene {
	private bgm?: Phaser.Sound.BaseSound
	private heart1!: Heart
	private heart2!: Heart
	private playCount!: number
	private reminderCase: keyof typeof ReminderText = 'firstRound'
	private isShowReminder = false
	private playButton!: PlayButton
	private achievementButton!: AchievementButton
	private instructionButton!: InstructionButton
	private rankingButton!: RankingButton
	private settingButton!: SettingButton
	private timeService!: TimeService
	private reminderText!: Phaser.GameObjects.Text

	constructor() {
		super('home');
	}

	init({ bgm }: { bgm: Phaser.Sound.BaseSound }) {
		this.bgm = bgm;
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
		this.load.atlas(
			'heart_spritesheet', 
			'assets/heart_spritesheet/heart_spritesheet.png', 
			'assets/heart_spritesheet/heart_spritesheet.json'
		)
		this.load.svg('mute', 'assets/icon/mute.svg')
		this.load.svg('unmute', 'assets/icon/unmute.svg')
	}

	create() {
		//localStorage.setItem("lastPlayTime1", '')
		//localStorage.setItem("lastPlayTime2", '')

		const { width, height } = this.scale
		this.timeService = new TimeService()
		
		// TODO: call api
		this.playCount = Number(localStorage.getItem('playCount') ?? "")

		this.add
			.tileSprite(0, 0, width, height, 'landing_page_bg')
			.setOrigin(0)
			.setScrollFactor(0, 0)

		this.add
			.image(width / 2, 216, 'landing_page', 'logo_breathbuddy.png')
			.setOrigin(0.5, 0)

		this.heart1 = new Heart(this, width / 2 + 1.5 * MARGIN, 464, 1)
		this.heart2 = new Heart(this, width / 2 - 1.5 * MARGIN, 464, 2)
		this.playButton = new PlayButton(this, this.bgm)

		const isFirstPlay = this.timeService.isFirstPlay()
		if(isFirstPlay){
			localStorage.setItem('playCount', "0")
		}
		if(isFirstPlay && this.heart1.getIsRecharged() && this.heart2.getIsRecharged()){
			this.isShowReminder = true
			this.reminderCase = 'firstRound'
		} else if(this.playCount < 10 && !this.heart1.getIsRecharged() && !this.heart2.getIsRecharged()){
			this.isShowReminder = true
			this.reminderCase = 'heartEmpty'
		} else if(this.playCount >= 10 && !this.heart1.getIsRecharged() && !this.heart2.getIsRecharged()){
			this.isShowReminder = true
			this.reminderCase = 'playTomorrow'
		}

		// Reminder
		this.reminderText = I18nSingleton.getInstance()
			.createTranslatedText(
				this,
				width / 2,
				628,
				ReminderText[this.reminderCase],
			)
			.setAlign('center')
			.setOrigin(0.5, 0)
			.setVisible(this.isShowReminder)

		this.rankingButton = new RankingButton(this)
		this.instructionButton = new InstructionButton(this)
		this.achievementButton = new AchievementButton(this)
		this.settingButton = new SettingButton(this)
		
		const self = this
		WebFont.load({
			google: {
				families: ['Mali', 'Jua'],
			},
			active: function () {
				self.heart1.initFontStyle()
				self.heart2.initFontStyle()
				self.playButton.initFontStyle()
				self.achievementButton.initFontStyle()
				self.instructionButton.initFontStyle()
				self.settingButton.initFontStyle()
				self.rankingButton.initFontStyle()

				new HomeTopBar(self)
				new SoundToggle(self)

				self.reminderText
					.setStyle({
						fontFamily: 'Mali',
						fontStyle: 'bold',
						color: 'white',
					})
					.setFontSize(MEDIUM_FONT_SIZE)
					.setStroke('#57453B', 12)
			},
		})
	}

	update(_: number, __: number): void {
		const heartEmpty = !this.heart1.getIsRecharged() && !this.heart2.getIsRecharged()
		if(this.playCount >= 10 || heartEmpty){
			this.playButton.disable()
		}

		if(!heartEmpty){
			this.playButton.activate()
		}

		this.reminderText.setVisible(this.timeService.isFirstPlay() || heartEmpty)
	}
}
