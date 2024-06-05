import Phaser from "phaser";
import WebFont from "webfontloader";
import I18nSingleton from "i18n/I18nSingleton";

export default class DeviceConnectedScene extends Phaser.Scene {
    constructor(){
        super('device_connected')
    }

    preload(){
        this.load.image('background', 'assets/background/bg/landing page_bg.png')
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.atlas('button_spritesheet', 'assets/button_spritesheet/button_spritesheet.png', 'assets/button_spritesheet/button_spritesheet.json')
        this.load.atlas('icon_spritesheet', 'assets/icon_spritesheet/icon_spritesheet.png', 'assets/icon_spritesheet/icon_spritesheet.json')

        this.load.image('press_home', 'assets/press home.png')
    }

    create(){
        const { width,height } = this.scale

        const i18n = I18nSingleton.getInstance()

        this.add.tileSprite(0, 0, width, height, 'background')
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
        this.add.image(122 + (width/2 - 528/2), 1040 + 96/2, 'icon_spritesheet', 'icon_battery.png')
        const buttontext3 = i18n.createTranslatedText(this, width/2 + 15, 1040 + 96/2, "how_to_charge").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,10)  

        WebFont.load({
            google: {
              families: ['Mali:Bold 700','Sarabun:Regular 400']
            },
            active: function() {
              const menuUiStyle = {
                fontFamily: 'Mali'
              }
              mainText1.setStyle(menuUiStyle)
              mainText2.setStyle(menuUiStyle)
              buttontext1.setStyle(menuUiStyle)
              buttontext2.setStyle(menuUiStyle)
              buttontext3.setStyle(menuUiStyle)
              
            }
          });   
    }

    update(){

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