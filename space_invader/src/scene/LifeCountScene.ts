import Phaser from "phaser";
import Heart from "component/ui/Heart";
import WebFont from 'webfontloader'
import I18nSingleton from "i18n/I18nSingleton";

export default class LifeCountScene extends Phaser.Scene{
    private heart1 !: Heart
    private heart2 !: Heart

    private heart_count = 7 // from backend

    constructor() {
        super('life_count')
    }

    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');

        this.load.atlas('heart_spritesheet', 'assets/heart_spritesheet/heart_spritesheet.png', 'assets/heart_spritesheet/heart_spritesheet.json')
        this.load.image('bg', 'assets/background/bg/landing page_bg.png')
    }

    create(){
        const { width,height } = this.scale

        const i18n = I18nSingleton.getInstance()
        this.add.tileSprite(0,0,width,height,'bg').setOrigin(0).setScrollFactor(0,0)

        // Black Window
        this.add.rectangle(0, 0, width, height, 0x000000, 0.5).setOrigin(0,0)

        const HeartText = i18n.createTranslatedText(this, width/2, 528 + 166 - 20, `life_count`, {heart : this.heart_count})
            .setColor("#DD2E05")
            .setStroke("#FFFFFF",6)
            .setFontSize(32)
            .setPadding(0,20,0,10)
            .setAlign("center")
            .setOrigin(0.5,0)


        this.heart1 = new Heart(this, width/2 - 24 - 46, 528, 1, false)
        this.heart2 = new Heart(this, width/2 + 24 + 46, 528, 2, false)

        if (this.heart2.getIsRecharged()) {
          this.heart2.emptyHeart()
        }
        else {
          this.heart1.emptyHeart()
        }
            
        const self = this
        WebFont.load({
            google: {
              families: ['Jua:Regular 700']
            },
            active: function() {
              const menuUiStyle = {
                fontFamily: 'Jua'
              }

              HeartText.setStyle(menuUiStyle)
              self.heart1.initFontStyle()
              self.heart2.initFontStyle()
            }
          });
    }
}