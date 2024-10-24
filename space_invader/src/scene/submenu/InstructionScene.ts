import I18nSingleton from 'i18n/I18nSingleton'
import Phaser from 'phaser'
import WebFont from 'webfontloader'
import i18next from 'i18next'
import BackButton from 'component/ui/Button/BackButton'

export default class InstructionScene extends Phaser.Scene {
    private howToConnectPopUp1 !: Phaser.GameObjects.DOMElement
	private howToConnectPopUp2 !: Phaser.GameObjects.DOMElement
	private howToConnectPopUp3 !: Phaser.GameObjects.DOMElement
	private howToConnectPopUp4 !: Phaser.GameObjects.DOMElement
	private howToTurnOffPopUp1 !: Phaser.GameObjects.DOMElement
	private howToTurnOffPopUp2 !: Phaser.GameObjects.DOMElement
	private howToChargePopUp1 !: Phaser.GameObjects.DOMElement
	private howToChargePopUp2 !: Phaser.GameObjects.DOMElement
	private howToChargePopUp3 !: Phaser.GameObjects.DOMElement
    private howToPlayPopUp1 !: Phaser.GameObjects.DOMElement
    private howToPlayPopUp2 !: Phaser.GameObjects.DOMElement
    private howToPlayPopUp3 !: Phaser.GameObjects.DOMElement

	private key !: string 

    constructor() {
        super("instruction")
    }

	init({key} : {key : string}) {
		this.key = key
	}

    preload() {
        this.load.script(
			'webfont',
			'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
		)

        this.load.atlas('button_spritesheet', 
            'assets/button_spritesheet/button_spritesheet.png', 
            'assets/button_spritesheet/button_spritesheet.json'
        )

        this.load.atlas('icon', 
            'assets/icon_spritesheet/icon_spritesheet.png', 
            'assets/icon_spritesheet/icon_spritesheet.json'
        )

        this.load.atlas(
			'heading_spritesheet',
			'assets/heading/heading_spritesheet.png',
			'assets/heading/heading_spritesheet.json',
		)

        this.load.image('bg', 'assets/background/submenu-background.png')

        this.load.html('howToConnect1', 'html/device_connected/howToConnect1.html')
		this.load.html('howToConnect2', 'html/device_connected/howToConnect2.html')
		this.load.html('howToConnect3', 'html/device_connected/howToConnect3.html')
		this.load.html('howToConnect4', 'html/device_connected/howToConnect4.html')
		this.load.html('howToTurnOff1', 'html/device_connected/howToTurnOff1.html')
		this.load.html('howToTurnOff2', 'html/device_connected/howToTurnOff2.html')
		this.load.html('howToCharge1', 'html/device_connected/howToCharge1.html')
		this.load.html('howToCharge2', 'html/device_connected/howToCharge2.html')
		this.load.html('howToCharge3', 'html/device_connected/howToCharge3.html')
        this.load.html('howToPlay1', 'html/device_connected/howToPlay1.html')
		this.load.html('howToPlay2', 'html/device_connected/howToPlay2.html')
		this.load.html('howToPlay3', 'html/device_connected/howToPlay3.html')
    }

    create() {
        const {width,height} = this.scale

        const i18n = I18nSingleton.getInstance()

        this.add.tileSprite(0,0,width,height,'bg').setOrigin(0).setScrollFactor(0,0)

        this.add.image(width/2, 64, 'icon', "icon_guidebook.png").setOrigin(0.5, 0)
            .setScale(3,3)

        this.add.image(width/2, 168, "heading_spritesheet", "heading_red.png").setOrigin(0.5,0)

        const headingText = i18n.createTranslatedText(this,width/2, 172, "instruction_heading").setOrigin(0.5, 0)
            .setFontSize(42)
            .setStroke("#9E461B", 12)

		new BackButton(this, this.key)

        // Button 1 
        this.add.nineslice(width/2, 432, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp1())
        this.add.image(100 + (width/2 - 528/2), 432 + 96/2, 'icon', 'icon_bluetooth.png').setOrigin(0,0.5)
        const buttontext1 = i18n.createTranslatedText(this, 170 + (width/2 - 528/2), 432 + 96/2, "how_to_connect")
            .setOrigin(0,0.5)
            .setColor("#D35E24")
            .setFontSize(32)
            .setPadding(0,20,0,20)
            
        // Button 2
        this.add.nineslice(width/2, 576, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp2())
        this.add.image(90 + (width/2 - 528/2), 576 + 96/2, 'icon', 'icon_turnoff.png').setOrigin(0,0.5)
        const buttontext2 = i18n.createTranslatedText(this, 153 + (width/2 - 528/2), 576 + 96/2, "how_to_close")
            .setOrigin(0,0.5)
            .setColor("#D35E24")
            .setFontSize(32)
            .setPadding(0,20,0,20)

        // Button 3
        this.add.nineslice(width/2, 720, 'button_spritesheet', 'button_white.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp3())
        this.add.image(50 + (width/2 - 528/2), 720 + 96/2, 'icon', 'icon_battery.png').setOrigin(0,0.5)
        const buttontext3 = i18n.createTranslatedText(this, 130 + (width/2 - 528/2), 720 + 96/2, "how_to_charge")
            .setOrigin(0,0.5)
            .setColor("#D35E24")
            .setFontSize(32)
            .setPadding(0,20,0,20)

        // Button 4
        this.add.nineslice(width/2, 864, 'button_spritesheet', 'button_red.png', 528, 96, 20, 20, 20, 30).setOrigin(0.5,0)
            .setInteractive().on('pointerup', () => this.popUp4())
        this.add.image(153 + (width/2 - 528/2), 864 + 96/2, 'icon', 'icon_play.png')
        const buttontext4 = i18n.createTranslatedText(this, 217 + (width/2 - 528/2), 864 + 96/2, "how_to_play")
            .setOrigin(0,0.5)
            .setColor("#FFFFFF")
            .setFontSize(32)
            .setPadding(0,20,0,20)

        this.createPopUp()

        // this.popUp4()

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
              buttontext1.setStyle(menuUiStyle)
              buttontext2.setStyle(menuUiStyle)
              buttontext3.setStyle(menuUiStyle)
			  buttontext4.setStyle(menuUiStyle)
              headingText.setStyle(menuUiStyle)
              self.applyPopUpFontStyle()
            }
          });
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

    popUp4() : void {
        this.scene.pause()
        this.howToPlayPopUp1.setVisible(true)
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

        //How to play
        this.howToPlayPopUp1 = this.add
            .dom(0,0)
            .setOrigin(0,0)
            .createFromCache('howToPlay1')
        this.howToPlayPopUp1.setVisible(false)
        this.howToPlayPopUp1.addListener('click')
        this.howToPlayPopUp1.on('click', function (event: any) {
            console.log("test")
			if (event.target.name === 'next') {
				self.howToPlayPopUp1.setVisible(false)
				self.howToPlayPopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToPlayPopUp1, "play", 1)

        this.howToPlayPopUp2 = this.add
            .dom(0,0)
            .setOrigin(0,0)
            .createFromCache('howToPlay2')
        this.howToPlayPopUp2.setVisible(false)
        this.howToPlayPopUp2.addListener('click')
        this.howToPlayPopUp2.on('click', function (event: any) {
			if (event.target.name === 'next') {
				self.howToPlayPopUp2.setVisible(false)
				self.howToPlayPopUp3.setVisible(true)
			}
			if (event.target.name === 'previous') {
				self.howToPlayPopUp2.setVisible(false)
				self.howToPlayPopUp1.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToPlayPopUp2, "play", 2)

        this.howToPlayPopUp3 = this.add
            .dom(0,0)
            .setOrigin(0,0)
            .createFromCache('howToPlay3')
        this.howToPlayPopUp3.setVisible(false)
        this.howToPlayPopUp3.addListener('click')
        this.howToPlayPopUp3.on('click', function (event: any) {
			if (event.target.name === 'finish') {
				self.howToPlayPopUp3.setVisible(false)
				self.scene.resume()
			}
			if (event.target.name === 'previous') {
				self.howToPlayPopUp3.setVisible(false)
				self.howToPlayPopUp2.setVisible(true)
			}
		})
		this.createTranslateTextPopUp(this.howToPlayPopUp3, "play", 3)
	}
}