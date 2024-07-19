import Phaser from "phaser";
import { MARGIN } from 'config';
import WebFont from 'webfontloader'
import I18nSingleton from "i18n/I18nSingleton";

import characterSelectUi from "component/setting/characterSelectUi"
import difficultySelectUi from "component/setting/difficultySelectUi";
import usernameBox from "component/setting/usernameBox";
import airflowBox from "component/setting/airflowBox";
import { DifficultyDTO } from "services/API/definition/responseDTO";

export default class SettingScene extends Phaser.Scene {
    // Heading
    private headingText : Phaser.GameObjects.Text | undefined

    // Username Box
    private usernameBox : usernameBox | undefined

    // Character Select
    private characterSelectUi : characterSelectUi | undefined

    private airflowEditText: Phaser.GameObjects.Text | undefined
    private medicalAdviceText : Phaser.GameObjects.Text | undefined

    // Airflow Box
    private airflowBox : airflowBox | undefined

    //Difficulty
    private difficultyText : Phaser.GameObjects.Text | undefined
    private difficultySelectUi : difficultySelectUi | undefined

    //Return Scene
    private returnscene = 'home'

    constructor() {
        super('setting')
    }

    init({ returnscene } : { returnscene : string }){
        if(returnscene) {
            this.returnscene = returnscene
        }
    }

    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.atlas('sheet','assets/setting/setting_spritesheet.png','assets/setting/setting_spritesheet.json');

        this.load.image('bg','assets/setting/setting_bg.png')

        this.load.svg('editAirflow', 'assets/setting/logo_modal_edit airflow.svg')
        this.load.svg('editName', 'assets/setting/logo_modal_edit name.svg')

        this.load.html('editnameForm', 'html/setting/editname.html')
        this.load.html('editairflowForm1', 'html/setting/editairflow1.html')
        this.load.html('editairflowForm2', 'html/setting/editairflow2.html')
        this.load.html('editairflowForm3', 'html/setting/editairflow3.html')
        this.load.html('editairflowForm4', 'html/setting/editairflow4.html')
        this.load.html('editairflowForm5', 'html/setting/editairflow5.html')
    }

    create(){
        const { width, height } = this.scale

        const i18n = I18nSingleton.getInstance()
        
        this.add.tileSprite(0,0,width,height,'bg').setOrigin(0).setScrollFactor(0,0)

        // Back Button
        this.add.image( MARGIN, MARGIN, 'sheet', "logo_setting_next.png").setOrigin(0,0)
            .setInteractive().on('pointerup', () => {
                this.scene.start(this.returnscene)
            })

        // Headings
        this.add.image( width/2 , MARGIN, 'sheet', "logo_heading_setting.png" ).setOrigin(0.5,0)
        this.add.image( width/2, 169, 'sheet', 'heading_setting.png' ).setOrigin(0.5,0)
        this.headingText = i18n.createTranslatedText( this, width/2, 190 -20, 'setting_title' )
            .setFontSize(42)
            .setColor("#FFFFFF")
            .setStroke("#9E461B", 6)
            .setPadding(0,20,0,10)
            //.setLineSpacing(200)
            .setOrigin(0.5,0)

        // Character Select
        this.characterSelectUi = new characterSelectUi(this)

        // Airflow and Difficulty Box
        const bigBox = this.add.graphics()
        bigBox.fillStyle(0xFFF6E5)
        bigBox.fillRoundedRect( width/2 - 288, height - 512, 576, 448, 40 )
        bigBox.lineStyle(5,0xD35E24)
        bigBox.strokeRoundedRect( width/2 - 288, height - 512, 576, 448, 40 )

        // Airflow Text
        this.add.image(216, 816, 'sheet', 'logo_setting_airflow.png').setOrigin(0,0) // Icon
        this.airflowEditText = i18n.createTranslatedText( this, 216 + 59 + 13, 816 -13, "airflow_volume" )
            .setFontSize(32)
            .setPadding(0,20,0,10)
            .setColor("#57453B") 
            .setOrigin(0,0)

        this.medicalAdviceText = i18n.createTranslatedText( this, width/2, 872 - 20, "doctor_advice_airflow" )
            .setFontSize(28)
            .setPadding(0,20,0,10)
            .setColor("#D35E24")
            .setOrigin(0.5,0)

        // Difficulty
        this.add.image( 216, 1024, 'sheet', 'logo_setting_difficulty.png').setOrigin(0,0)
        this.difficultyText = i18n.createTranslatedText( this, 216+59+13, 1024 - 13, "difficulty_title")
            .setPadding(0,20,0,10)
            .setFontSize( 32 )
            .setColor("#57453B") 
            .setOrigin(0,0)
        
        const difficultyDTO: DifficultyDTO = this.registry.get('difficulty');
        const difficultyId: number = difficultyDTO.difficultyId;
        this.difficultySelectUi = new difficultySelectUi(this, difficultyId)

        // Airflow Box
        this.airflowBox = new airflowBox(this)

        // Username Box
        this.usernameBox = new usernameBox(this)

        this.usernameBox.createPopUp(this)

        this.airflowBox.createPopUp(this)


        // Set font for all texts
        const self = this
        WebFont.load({
            google: {
              families: ['Mali:Bold 700','Sarabun:Regular 400']
            },
            active: function() {
              const menuUiStyle = {
                fontFamily: 'Mali',
                fontStyle: "Bold",
                fontWeight: 700
              }

              self.setAllText(menuUiStyle)
              self.setPopUpFont()
            }
          });

        // this.popUpEditAirflow3()
    }

    update() {

    }

    setAllText(style : any) : void {

        this.characterSelectUi?.setFont(style)

        this.difficultySelectUi?.setFont(style)

        this.usernameBox?.setFont(style)
        this.airflowBox?.setFont(style)

        this.headingText?.setStyle(style)

        this.airflowEditText?.setStyle(style)
        this.medicalAdviceText?.setStyle(style)
        this.difficultyText?.setStyle(style)
    }

    setPopUpFont() : void {
        const sarabunElements = document.querySelectorAll('.sarabun')
        sarabunElements.forEach(element => {
            (element as HTMLElement).style.fontFamily = 'Sarabun'
        })
    }
}