import Phaser from "phaser";
import WebFont from "webfontloader";

export default class DeviceConnectedScene extends Phaser.Scene {
    constructor(){
        super('device_connected')
    }

    preload(){
        this.load.image('titleBackground', 'assets/background/title-background.jpg')
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
    }

    create(){
        const { width,height } = this.scale

        this.add.tileSprite(0, 0, width, height, 'titleBackground')
            .setOrigin(0)
            .setScrollFactor(0, 0)

        // Image
        this.add.rectangle(width/2, 144, 400, 408, 0x000000).setOrigin(0.5,0)

        // Main Text Box
        const textBox = this.add.graphics()
        textBox.fillStyle(0xFFF6E5)
        textBox.fillRoundedRect(96, 432, 528, 320, 40)

        textBox.lineStyle(5,0xD35E24)
        textBox.strokeRoundedRect(96, 432, 528, 320, 40)

        const mainText1 = this.add.text(width/2, 568 - 20, "กรุณาเชื่อมต่อสัญญาณ Bluetooth เข้ากับคอนโทรลเลอร์และ").setOrigin(0.5,0)
            .setColor("#292929")
            .setFontSize(30)
            .setWordWrapWidth(528)
            .setAlign('center')
            .setPadding(0,20,0,10)

            

        const mainText2 = this.add.text(width/2, 568 + 137 + 10, "กดปุ่ม Home เพื่อเข้าสู่หน้าเกม").setOrigin(0.5,1)
            .setColor("#D35E24")
            .setFontSize(30)
            .setAlign('center')
            .setPadding(0,20,0,10)

        // Button 1
        this.add.rectangle(width/2, 800, 528, 96, 0xFFFFFF).setOrigin(0.5,0)
        const buttontext1 = this.add.text(width/2, 800 + 96/2, "วิธีเชื่อมต่ออุปกรณ์").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,10)


        // Button 2
        this.add.rectangle(width/2, 920, 528, 96, 0xFFFFFF).setOrigin(0.5,0)
        const buttontext2 = this.add.text(width/2, 920 + 96/2, "วิธีปิดอุปกรณ์").setOrigin(0.5,0.5)
            .setColor("#D35E24")
            .setFontSize(28)
            .setPadding(0,20,0,10)

        // Button 3
        this.add.rectangle(width/2, 1040, 528, 96, 0xFFFFFF).setOrigin(0.5,0)
        const buttontext3 = this.add.text(width/2, 1040 + 96/2, "วิธีชาร์จอุปกรณ์").setOrigin(0.5,0.5)
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
}