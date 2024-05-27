import Phaser, { Scene } from 'phaser';
import i18next from "i18next";
import I18nSingleton from 'i18n/I18nSingleton'
import {setCookie } from 'typescript-cookie'
import WebFont from 'webfontloader';
import { MARGIN, LARGE_FONT_SIZE } from 'config'


interface DOMEvent<T extends EventTarget> extends Event {
    readonly target: T
}

export default class StartLoginScene extends Phaser.Scene {
    private Text!: Phaser.GameObjects.Text;
    private buttonText!: Phaser.GameObjects.Text;
    constructor() {
        super('start-login');
    }
    preload() {
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('background', 'assets/background/landing_page_bg.png');
        this.load.atlas(
			'landing_page',
			'assets/ui/landing_page_spritesheet.png',
			'assets/ui/landing_page_spritesheet.json',
		)
    }
    create() {
        const i18n = I18nSingleton.getInstance();
        const self = this;

        WebFont.load({
			google: {
				families: ['Sarabun:400,500']
			},
            active: () => {
                self.Text.setStyle({
                    fontFamily: 'Sarabun',
                    fontWeight: '400' 
                })
                .setColor('#000000')
                .setFontSize(40)
                self.buttonText.setStyle({
                    fontFamily: 'Sarabun',
                    fontWeight: '500' 
                })
                .setColor('#FFFFFF')
                .setFontSize(36)
            }
		});
        
        const {width, height} = this.scale;
        this.add
            .tileSprite(0,0,width, height, 'background')
            .setOrigin(0)
            .setScrollFactor(0,0);
        this.add.image(width/2, 324, 'landing_page', 'logo_breathbuddy.png').setScale(1.5,1.5).setOrigin(0.5,0);

        this.Text = I18nSingleton.getInstance()
        .createTranslatedText(this, width/2, 800, 'start_login_text')
        .setAlign('center')
        .setOrigin(0.5,0.5)
        .setPadding(0,20,0,10)

        this.add
        .nineslice(width/2,864,'landing_page','button_red.png',528,96)
        .setOrigin(0.5,0)
        .setInteractive().on('pointerup', () => {
            this.scene.stop();
            this.scene.start('login');
        })

        this.buttonText = I18nSingleton.getInstance()
        .createTranslatedText(this, width/2, 880, 'start_login_button')
        .setOrigin(0.5,0)
        .setAlign('center')

    }
    update() {}
    
}

