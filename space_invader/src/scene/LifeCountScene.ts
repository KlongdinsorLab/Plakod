import Phaser from "phaser";
import WebFont from 'webfontloader'

export default class LifeCountScene extends Phaser.Scene{
    private allheart = 5
    private showingheart = 1

    constructor() {
        super('life_count')
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.atlas('sheet', 'assets/landing page/landing page_spritesheet.png', 'assets/landing page/landing page_spritesheet.json')
        this.load.image('bg', 'assets/landing page/landing page_bg.png')
    }

    create(){
        const { width,height } = this.scale
        this.add.tileSprite(0,0,width,height,'bg').setOrigin(0).setScrollFactor(0,0)

        // Black Window
        this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0,0)

        // Heart 1
        if (this.showingheart >= 1) { 
          this.add.image(205 + 26, 528, 'sheet', 'heart_full.png').setOrigin(0,0) 
        }
        else {
          this.add.image(205 + 26, 528, 'sheet', 'heart_empty.png').setOrigin(0,0) 
        }

        // Heart 2
        if (this.showingheart >= 2) { 
          this.add.image(205 + 2+ + 258, 528, 'sheet', 'heart_full.png').setOrigin(1,0)
        }
        else {
          this.add.image(205 + 2+ + 258, 528, 'sheet', 'heart_empty.png').setOrigin(1,0)
        }

        const HeartText = this.add.text(width/2, 528 + 166 - 20, `หัวใจเหลือ ${this.allheart} ดวง`)
            .setColor("#DD2E05")
            .setStroke("#FFFFFF",6)
            .setFontSize(32)
            .setPadding(0,20,0,10)
            .setAlign("center")
            .setOrigin(0.5,0)

        WebFont.load({
            google: {
              families: ['Mali:Bold 700']
            },
            active: function() {
              const menuUiStyle = {
                fontFamily: 'Mali'
              }

              HeartText.setStyle(menuUiStyle)
            }
          });
    }
}