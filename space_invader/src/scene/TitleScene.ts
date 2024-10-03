import Phaser from 'phaser'
import MergedInput, { Player as InputPlayer } from 'phaser3-merged-input'
//import Player from 'component/player/Player'
import SoundManager from 'component/sound/SoundManager'
import I18nSingleton from 'i18n/I18nSingleton'
import {
	browserSessionPersistence,
	getAuth,
	setPersistence,
} from 'firebase/auth'
import WebFont from "webfontloader";
import MockAPIService from 'services/API/mockUp/MockAPIService'

const tirabase = new MockAPIService()

// TODO login here
// tirabase.register('0958927519',
//   21,
//   'M',
//   600,
//   3,
// )
// tirabase.login('0958927518');
export { tirabase }

export default class TitleScene extends Phaser.Scene {
	//	private background!: Phaser.GameObjects.TileSprite
	private mergedInput?: MergedInput
	private controller1?: InputPlayer | any
	//	private player?: Player
	private bgm?: Phaser.Sound.BaseSound
	private hasController = false

	constructor() {
		super('title')
	}

	preload() {
		this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)

		this.load.image('titleBackground', 'assets/background/bg/landing page_bg.png')
		this.load.image('logo', 'assets/logo/logo_1-01.png')
		//		this.load.image('player', 'assets/character/player/playerShip1_blue.png')
		this.load.image('fire', 'assets/effect/fire03.png')
		// this.load.audio('bgm', 'sound/hofman-138068.mp3')
		this.load.audio('bgm', 'sound/BGM_GameScene.mp3')

		this.load.atlas('button_spritesheet', 'assets/button_spritesheet/button_spritesheet.png', 'assets/button_spritesheet/button_spritesheet.json')
        this.load.atlas('icon_spritesheet', 'assets/icon_spritesheet/icon_spritesheet.png', 'assets/icon_spritesheet/icon_spritesheet.json')

        this.load.image('press_home', 'assets/press home.png')

		this.load.scenePlugin('mergedInput', MergedInput)

		this.load.audioSprite(
			'tutorialWarmupSound',
			'sound/audio_sprites/tt-warmup-boss-sound.json',
			['sound/audio_sprites/tt-warmup-boss-sound.mp3'],
		)

		this.load.audioSprite('mcSound', 'sound/audio_sprites/mc1-sound.json', [
			'sound/audio_sprites/mc1-sound.mp3',
		])

		this.load.audioSprite('bossSound', 'sound/audio_sprites/b1-sound.json', [
			'sound/audio_sprites/b1-sound.mp3',
		])
	}

	async create() {
		const {width,height} = this.scene.scene.scale
		const queryString = window.location.search
		const urlParams = new URLSearchParams(queryString)
		this.hasController = urlParams.get('controller') === 'true'

		// const isSetup = localStorage.getItem('setup') ?? false
		// if (!isSetup) {
		// 	this.scene.pause()
		// 	this.scene.launch('setup')
		// 	return
		// }

		const auth = getAuth();
		auth.useDeviceLanguage();
		(async ()=> {
			await setPersistence(auth, browserSessionPersistence)
			const user = auth.currentUser

			if (user === null) {
				this.scene.pause()
				this.scene.launch('start-login')
				return
			}

			// TODO check user data
			// this.scene.pause()
			// this.scene.launch('register')
		})()

		const i18n = I18nSingleton.getInstance()

        this.add.tileSprite(0, 0, width, height, 'titleBackground')
            .setOrigin(0)
            .setScrollFactor(0, 0)

        // Image
        this.add.image(width/2, 144, 'press_home').setOrigin(0.5,0)

        // Main Text Box
        const textBox = this.add.graphics()
        textBox.fillStyle(0xFFF6E5)
        textBox.fillRoundedRect(96, 432, 528, 320, 40)

        textBox.lineStyle(5,0xD35E24)
        textBox.strokeRoundedRect(96, 432, 528, 320, 40)

        // Icon
        this.add.image(width/2,464,'icon_spritesheet', 'icon_bluetooth.png').setOrigin(0.5,0).setScale(2,2)

        // Main Text
        const mainText1 = i18n.createTranslatedText(this, width/2, 568 - 20, "dc_controller_connect").setOrigin(0.5,0)
            .setColor("#292929")
            .setFontSize(30)
            .setWordWrapWidth(528)
            .setAlign('center')
            .setPadding(0,20,0,10)

        const mainText2 = i18n.createTranslatedText(this,width/2, 568 + 137 + 10, "dc_press_home").setOrigin(0.5,1)
            .setColor("#D35E24")
            .setFontSize(30)
            .setAlign('center')
            .setPadding(0,20,0,10)

        // Cursed Underline
        this.add.line(width/2, 568+137 - 5, 0, 0, 435, 0, 0xD35E24, 1)

        // Button 1 Guessed the Position for all Text and icon in buttons
        this.add.nineslice(width/2, 800, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp1())
        this.add.image(110 + (width/2 - 528/2), 800 + 96/2, 'icon_spritesheet', 'icon_bluetooth.png')
        const buttontext1 = i18n.createTranslatedText(this, width/2 + 15, 800 + 96/2, "how_to_connect").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,10)
            
        // Button 2
        this.add.nineslice(width/2, 920, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp2())
        this.add.image(144 + (width/2 - 528/2), 920 + 96/2, 'icon_spritesheet', 'icon_turnoff.png')
        const buttontext2 = i18n.createTranslatedText(this, width/2 + 15, 920 + 96/2, "how_to_close").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,10)

        // Button 3
        this.add.nineslice(width/2, 1040, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp3())
        this.add.image(92 + (width/2 - 528/2), 1040 + 96/2, 'icon_spritesheet', 'icon_battery.png')
        const buttontext3 = i18n.createTranslatedText(this, width/2 + 15, 1040 + 96/2, "how_to_charge").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,10)  

        WebFont.load({
            google: {
              families: ['Mali']
            },
            active: function() {
              const menuUiStyle = {
                fontFamily: 'Mali',
                fontStyle: 'bold'
              }
              mainText1.setStyle(menuUiStyle)
              mainText2.setStyle(menuUiStyle)
              buttontext1.setStyle(menuUiStyle)
              buttontext2.setStyle(menuUiStyle)
              buttontext3.setStyle(menuUiStyle)
              
            }
          });

		this.controller1 = this.mergedInput?.addPlayer(0)
		this.mergedInput
			?.defineKey(0, 'LEFT', 'LEFT')
			.defineKey(0, 'RIGHT', 'RIGHT')
			.defineKey(0, 'B0', 'SPACE')

		//		this.player = new Player(this)
		//		this.player.addJetEngine()

		this.bgm = this.sound.add('bgm', { volume: 0.5, loop: true })
		const soundManager = new SoundManager(this)
		soundManager.init()
		soundManager.play(this.bgm)

		/* TODO comment just for testing
    const isSetup = localStorage.getItem('setup') ?? false
    if (!isSetup) {
      this.scene.pause()
      this.scene.launch('setup')
    }
    */

    	if (!this.hasController && this.input?.gamepad?.total === 0) {
			this.input.gamepad.once(
				'connected',
				() => {
					this.startGame()
				},
				this,
			)
		}
	}

	update() {
		if (
			this.hasController &&
			(this.controller1?.direction.LEFT ||
				this.controller1?.direction.RIGHT ||
				this.controller1?.buttons.B7 > 0 ||
				this.input.pointer1.isDown)
		) {
			this.startGame()
		}
	}

	startGame() {
		I18nSingleton.getInstance().destroyEmitter()

		this.scene.start(import.meta.env.VITE_START_SCEN || 'home', {
			bgm: this.bgm,
		})
		//this.scene.start(import.meta.env.VITE_START_SCEN || 'setting')
		// import.meta.env.VITE_START_SCENE && new SoundManager(this).stop(this.bgm!)
	}

	popUp1() : void {
        // Connecting
        console.log("Device Connecting Instruction")
    }

    popUp2() : void {
        // Closing
        console.log("Device Closing Instruction")
    }

    popUp3() : void {
        // Charging
        console.log("Device Charging Instruction")
    }
}
