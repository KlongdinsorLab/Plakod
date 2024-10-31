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
import { BUTTON_MAP } from 'config'
import WebFont from "webfontloader";
import MockAPIService from 'services/API/mockUp/MockAPIService'
import i18next from 'i18next'

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

	private howToConnectPopUp1 !: Phaser.GameObjects.DOMElement
	private howToConnectPopUp2 !: Phaser.GameObjects.DOMElement
	private howToConnectPopUp3 !: Phaser.GameObjects.DOMElement
	private howToConnectPopUp4 !: Phaser.GameObjects.DOMElement
	private howToTurnOffPopUp1 !: Phaser.GameObjects.DOMElement
	private howToTurnOffPopUp2 !: Phaser.GameObjects.DOMElement
	private howToChargePopUp1 !: Phaser.GameObjects.DOMElement
	private howToChargePopUp2 !: Phaser.GameObjects.DOMElement
	private howToChargePopUp3 !: Phaser.GameObjects.DOMElement


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

        this.load.image('press_home', 'assets/press_home.png')

		this.load.html('howToConnect1', 'html/device_connected/howToConnect1.html')
		this.load.html('howToConnect2', 'html/device_connected/howToConnect2.html')
		this.load.html('howToConnect3', 'html/device_connected/howToConnect3.html')
		this.load.html('howToConnect4', 'html/device_connected/howToConnect4.html')
		this.load.html('howToTurnOff1', 'html/device_connected/howToTurnOff1.html')
		this.load.html('howToTurnOff2', 'html/device_connected/howToTurnOff2.html')
		this.load.html('howToCharge1', 'html/device_connected/howToCharge1.html')
		this.load.html('howToCharge2', 'html/device_connected/howToCharge2.html')
		this.load.html('howToCharge3', 'html/device_connected/howToCharge3.html')

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

	create() {
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

		const i18n = I18nSingleton.getInstance()

        this.add.tileSprite(0, 0, width, height, 'titleBackground')
            .setOrigin(0)
            .setScrollFactor(0, 0)

        // Image
        this.add.image(width/2, 432, 'press_home').setOrigin(0.5,1)

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
            .setPadding(0,20,0,20)
            
        // Button 2
        this.add.nineslice(width/2, 920, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp2())
        this.add.image(124 + (width/2 - 528/2), 920 + 96/2, 'icon_spritesheet', 'icon_turnoff.png')
        const buttontext2 = i18n.createTranslatedText(this, width/2 + 15, 920 + 96/2, "how_to_close").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,20)

        // Button 3
        this.add.nineslice(width/2, 1040, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp3())
        this.add.image(92 + (width/2 - 528/2), 1040 + 96/2, 'icon_spritesheet', 'icon_battery.png')
        const buttontext3 = i18n.createTranslatedText(this, width/2 + 15, 1040 + 96/2, "how_to_charge").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,20)  

		this.createPopUp()

		// temporary start game button
		this.add.nineslice(width/2, 1160, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.startGame())
        this.add.image(92 + (width/2 - 528/2), 1040 + 96/2, 'icon_spritesheet', 'icon_battery.png')
        const buttontext4 = i18n.createTranslatedText(this, width/2 + 15, 1160 + 96/2, "เข้าเกม").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,20) 

		const self = this
        WebFont.load({
            google: {
              families: ['Mali', 'Sarabun:300,400,500,600']
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
			  buttontext4.setStyle(menuUiStyle)
              self.applyPopUpFontStyle()
            }
          });

		this.controller1 = this.mergedInput?.addPlayer(0)
		this.mergedInput
			?.defineKey(0, BUTTON_MAP['left'].controller, BUTTON_MAP['left'].keyboard)
			.defineKey(0, BUTTON_MAP['right'].controller, BUTTON_MAP['right'].keyboard)
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

		// this.popUp3()

		
	}

	async update() {
		if (
			this.hasController &&
			(this.controller1?.direction.LEFT ||
				this.controller1?.direction.RIGHT ||
				this.controller1?.buttons.B7 > 0 /*||
				this.input.pointer1.isDown*/)
		) {
			await this.startGame()
		}
	}

	async startGame() {
		if(import.meta.env.VITE_START_SCENE) {
			// testing flow
			if(import.meta.env.VITE_START_SCENE_INIT){
				console.log(JSON.parse(import.meta.env.VITE_START_SCENE_INIT))
				this.scene.start(import.meta.env.VITE_START_SCENE, JSON.parse(import.meta.env.VITE_START_SCENE_INIT))
			}
			else{
				this.scene.start(import.meta.env.VITE_START_SCENE)
			}
			
		}
		else {
			// normal flow
			const auth = getAuth();
			auth.useDeviceLanguage();
			(async ()=> {
				await setPersistence(auth, browserSessionPersistence)
				// const user = auth.currentUser
				const user = null
			
				if (user === null) {
					this.scene.stop()
					this.scene.launch('start-login', {bgm: this.bgm,})
					return
				}
				else {
					this.scene.stop()
					this.scene.start('home', {bgm: this.bgm,})
				}

					// TODO check user data
					// this.scene.pause()
					// this.scene.launch('register')
			})()
			I18nSingleton.getInstance().destroyEmitter()
		}

		//this.scene.start(import.meta.env.VITE_START_SCEN || 'setting')
		// import.meta.env.VITE_START_SCENE && new SoundManager(this).stop(this.bgm!)
	}

	popUp1() : void {
		this.scene.pause()
		this.howToConnectPopUp1.setVisible(true)
    }

    popUp2() : void {
        this.scene.pause()
		this.howToTurnOffPopUp1.setVisible(true)
    }

    popUp3() : void {
        this.scene.pause()
		this.howToChargePopUp1.setVisible(true)
    }

	createPopUp(){
		const self = this

		// How to Connect
		this.howToConnectPopUp1 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToConnect1')
		this.howToConnectPopUp1.setVisible(false)
		this.howToConnectPopUp1.addListener('click')
		this.howToConnectPopUp1.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToConnectPopUp1.setVisible(false)
				self.howToConnectPopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToConnectPopUp1, "connect", 1)

		this.howToConnectPopUp2 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToConnect2')
		this.howToConnectPopUp2.setVisible(false)
		this.howToConnectPopUp2.addListener('click')
		this.howToConnectPopUp2.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToConnectPopUp2.setVisible(false)
				self.howToConnectPopUp3.setVisible(true)
			}
			if (event.target.name === 'previous') {
				self.howToConnectPopUp2.setVisible(false)
				self.howToConnectPopUp1.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToConnectPopUp2, "connect", 2)

		this.howToConnectPopUp3 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToConnect3')
		this.howToConnectPopUp3.setVisible(false)
		this.howToConnectPopUp3.addListener('click')
		this.howToConnectPopUp3.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToConnectPopUp3.setVisible(false)
				self.howToConnectPopUp4.setVisible(true)
			}
			if (event.target.name === 'previous') {
				self.howToConnectPopUp3.setVisible(false)
				self.howToConnectPopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToConnectPopUp3, "connect", 3)

		this.howToConnectPopUp4 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToConnect4')
		this.howToConnectPopUp4.setVisible(false)
		this.howToConnectPopUp4.addListener('click')
		this.howToConnectPopUp4.on('click', function (event: any) {
			if (event.target.name === 'finish') {
				self.howToConnectPopUp4.setVisible(false)
				self.scene.resume()
			}
			if (event.target.name === 'previous') {
				self.howToConnectPopUp4.setVisible(false)
				self.howToConnectPopUp3.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToConnectPopUp4, "connect", 4)

		// How to Turn Off
		this.howToTurnOffPopUp1 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToTurnOff1')
		this.howToTurnOffPopUp1.setVisible(false)
		this.howToTurnOffPopUp1.addListener('click')
		this.howToTurnOffPopUp1.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToTurnOffPopUp1.setVisible(false)
				self.howToTurnOffPopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToTurnOffPopUp1, "turnoff", 1)

		this.howToTurnOffPopUp2 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToTurnOff2')
		this.howToTurnOffPopUp2.setVisible(false)
		this.howToTurnOffPopUp2.addListener('click')
		this.howToTurnOffPopUp2.on('click', function (event: any) {
			if (event.target.name === 'finish') {
				self.howToTurnOffPopUp2.setVisible(false)
				self.scene.resume()
			}
			if (event.target.name === 'previous'){
				self.howToTurnOffPopUp2.setVisible(false)
				self.howToTurnOffPopUp1.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToTurnOffPopUp2, "turnoff", 2)
		
		// How to Charge
		this.howToChargePopUp1 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToCharge1')
		this.howToChargePopUp1.setVisible(false)
		this.howToChargePopUp1.addListener('click')
		this.howToChargePopUp1.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToChargePopUp1.setVisible(false)
				self.howToChargePopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToChargePopUp1, "charge", 1)

		this.howToChargePopUp2 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToCharge2')
		this.howToChargePopUp2.setVisible(false)
		this.howToChargePopUp2.addListener('click')
		this.howToChargePopUp2.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToChargePopUp2.setVisible(false)
				self.howToChargePopUp3.setVisible(true)
			}
			if (event.target.name === 'previous') {
				self.howToChargePopUp2.setVisible(false)
				self.howToChargePopUp1.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToChargePopUp2, "charge", 2)

		this.howToChargePopUp3 = this.add
			.dom(0,0)
			.setOrigin(0,0)
			.createFromCache('howToCharge3')
		this.howToChargePopUp3.setVisible(false)
		this.howToChargePopUp3.addListener('click')
		this.howToChargePopUp3.on('click', function (event: any) {
			if (event.target.name === 'finish') {
				self.howToChargePopUp3.setVisible(false)
				self.scene.resume()
			}
			if (event.target.name === 'previous') {
				self.howToChargePopUp3.setVisible(false)
				self.howToChargePopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToChargePopUp3, "charge", 3)
	}

	createTranslateTextPopUp(popUp : Phaser.GameObjects.DOMElement, type: string, page: number) {
		let i = 1
		let text : Element = <Element>(popUp.getChildByID(`${type}${page}.${i+1}`))
		while(popUp.getChildByID(`${type}${page}.${i}`)){
			text = <Element>(popUp.getChildByID(`${type}${page}.${i}`))
			text.textContent = i18next.t(`${type}${page}.${i}`)
			i++
		}

		if(popUp.getChildByID("next")){
			text = <Element>(popUp.getChildByName("next"))
			text.textContent = i18next.t("next")
		}

		if(popUp.getChildByID("previous")){
			text = <Element>(popUp.getChildByID("previous"))
			text.textContent = i18next.t("previous")
		}

		if(popUp.getChildByID("finish")){
			text = <Element>(popUp.getChildByName("finish"))
			text.textContent = i18next.t("finish")
		}
	}

	applyPopUpFontStyle() {
        const regularElement = document.querySelectorAll(".sarabun-regular")
        regularElement.forEach(element => {
            (element as HTMLElement).style.fontFamily = 'Sarabun';
            (element as HTMLElement).style.fontWeight = '400';
        })

        const semiboldElement = document.querySelectorAll(".sarabun-semibold")
        semiboldElement.forEach(element => {
            (element as HTMLElement).style.fontFamily = 'Sarabun';
            (element as HTMLElement).style.fontWeight = '600';
        })

        const lightElement = document.querySelectorAll(".sarabun-light")
        lightElement.forEach(element => {
            (element as HTMLElement).style.fontFamily = 'Sarabun';
            (element as HTMLElement).style.fontWeight = '300';
        })

        const mediumElement = document.querySelectorAll(".sarabun-medium")
        mediumElement.forEach(element => {
            (element as HTMLElement).style.fontFamily = 'Sarabun';
            (element as HTMLElement).style.fontWeight = '500';
        })
    }
}
