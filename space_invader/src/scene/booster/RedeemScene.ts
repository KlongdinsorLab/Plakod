import Phaser from "phaser";
import I18nSingleton from 'i18n/I18nSingleton'
import WebFont from 'webfontloader';
import { MARGIN } from "config";
import boosterBar from "component/booster/boosterBar";

export default class RedeemScene extends Phaser.Scene {
    private headerText!: Phaser.GameObjects.Text;
    private missionDescription!: Phaser.GameObjects.Text;
    private redeemBoosterText!: Phaser.GameObjects.Text;
    private buttonText!: Phaser.GameObjects.Text;

    private boosterBar! : boosterBar;


    constructor(){
        super('RedeemScene');
    
    }
    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('background', 'assets/background/landing_page_bg.jpg');

        //spritesheet
        this.load.atlas('icon', 'assets/icon/icon_spritesheet.png', 'assets/icon/icon_spritesheet.json')
        this.load.atlas('heading', 'assets/heading/heading_spritesheet.png', 'assets/heading/heading_spritesheet.json')
        this.load.atlas('button', 'assets/ui/button_spritesheet.png', 'assets/ui/button_spritesheet.json')

        //booster
        this.load.image('booster_selectedMark', 'assets/dropItem/selectedMark.png')
        this.load.atlas('dropItem', 'assets/dropItem/dropitem_spritesheet.png', 'assets/dropItem/dropitem_spritesheet.json')
        
    }
    create(){
        const {width, height} = this.scale;
        const self = this;

       
        //todo: remove this, load background from other scene
        this.add.image(0, 0, 'background').setOrigin(0, 0);
        this.add.rectangle(width/2, height/2, width, height, 0x303030, 0.6);

        //popup box
        const box = this.add.graphics();
        box.fillStyle(0xFFF6E5);
        box.fillRoundedRect( MARGIN, height/4-MARGIN*2, 624, 920, 20)
        box.lineStyle(6, 0xD35E24)
        box.strokeRoundedRect( MARGIN, height/4-MARGIN*2, 624, 920, 20)

        //line
        const line = this.add.graphics();
        line.fillStyle(0xD35E24);
        line.fillRoundedRect( MARGIN*2, 426, 527, 6, 3)

        //banner
        this.add
            .nineslice( 
                width/2, 
                138, 
                'heading', 
                'heading_red mission.png', 
                562, 
                160
            )
            .setOrigin(0.5, 0)


        //mission title
        this.headerText = I18nSingleton.getInstance()
            .createTranslatedText(
                this, 
                width/2, 
                138, 
                'redeem_title'
            ) 
            .setAlign('center')
            .setOrigin(0.5, 0)

        //mission description
        this.missionDescription = I18nSingleton.getInstance()
            .createTranslatedText(
                this,
                width/2,
                298,
                'redeem_mission_description'
            )
            .setAlign('center')
            .setOrigin(0.5, 0)

        //redeem booster text
        this.redeemBoosterText = I18nSingleton.getInstance()
            .createTranslatedText(
                this,
                width/2,
                460,
                'redeem_booster_text'
            )
            .setAlign('center')
            .setOrigin(0.5, 0)
            

        //boosters
        this.boosterBar = new boosterBar(this);

        //button
        this.add.nineslice(
            MARGIN*2, 
            1000, 
            'button', 
            'button_grey.png', 
            128, 
            96,
            20,20,20,30
        )
        .setOrigin(0, 0)

        this.add.image(
            MARGIN*2+64, 
            1000+44,
            'icon',
            'icon_back.png',
        )

        this.add.nineslice(
            MARGIN*11/2, 
            1000, 
            'button', 
            'button_red.png', 
            376, 
            96,
            20,20,20,30
        )
        .setOrigin(0, 0)
        .setInteractive().on('pointerup', () => {
            this.scene.stop();
            this.scene.start('gameGameScene');
        })

        this.buttonText = I18nSingleton.getInstance()
            .createTranslatedText(
                this,
                MARGIN*11/2+188,
                1000+48,
                'redeem_button_text'
            )
            .setAlign('center')
            .setOrigin(0.5, 0.5)

        WebFont.load({
                google:{
                    families: ['Mali:500,600,700','Jua'],
                },
                active: () =>{
                    self.boosterBar.initFontStyle();

                    self.headerText.setStyle({
                        fontFamily: 'Mali',
                        fontStyle: 'bold',
                        color: 'white',
                    })
                    .setFontSize(64)
                    .setStroke('#9E461B', 12)
                    .setLineSpacing(16);
    
                    self.missionDescription.setStyle({
                        fontFamily: 'Mali',
                        fontStyle: 'bold',
                    })
                    .setFontSize(32)
                    .setColor('#57453B')
                    .setLineSpacing(16);
    
                    self.redeemBoosterText.setStyle({
                        fontFamily: 'Mali',
                        fontStyle: 'bold',
                    })
                    .setFontSize(32)
                    .setColor('#D35E24')
                    .setLineSpacing(16);
    
                    self.buttonText.setStyle({
                        fontFamily: 'Mali',
                        fontStyle: 'bold',
                        color: 'white',
                    })
                    .setFontSize(32)
                    .setStroke('#9E461B', 6)
                    .setLineSpacing(16);

                    
                },
        });
    
        

    }
    update(){
        
    }

}