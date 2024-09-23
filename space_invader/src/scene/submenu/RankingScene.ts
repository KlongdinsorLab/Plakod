import I18nSingleton from 'i18n/I18nSingleton'
import WebFont from 'webfontloader';
import { PlayerSlotStack } from 'component/ranking/playerSlotStack';
import { MARGIN } from "config";

export enum AccumulationType{
    ACCUMULATION_SCORE,
    ACCUMULATION_HEART,
}

export default class RankingScene extends Phaser.Scene {
    private bgm?: Phaser.Sound.BaseSound
    private background!: Phaser.GameObjects.TileSprite;
    private banner!: Phaser.GameObjects.NineSlice;
    private redButtonLeft!: Phaser.GameObjects.NineSlice;
    private redButtonRight!: Phaser.GameObjects.NineSlice;
    private iconRanking!: Phaser.GameObjects.Image;
    private iconLeft!: Phaser.GameObjects.Image;
    private iconRight!: Phaser.GameObjects.Image;
    private buttonBack!: Phaser.GameObjects.Image;
    private buttonBackHitBox!: Phaser.GameObjects.Rectangle;
    private scoreButton!: Phaser.GameObjects.Graphics;
    private scoreButtonDisabled!: Phaser.GameObjects.Graphics;
    private playedButton!: Phaser.GameObjects.Graphics;
    private playedButtonDisabled!: Phaser.GameObjects.Graphics;
    private OverlayLeftButton!: Phaser.GameObjects.NineSlice;
    private OverlayRightButton!: Phaser.GameObjects.NineSlice;
    private rankingBox!: Phaser.GameObjects.Graphics;

    private headerText!: Phaser.GameObjects.Text;
    private scoreButtonText!: Phaser.GameObjects.Text;
    private scoreButtonTextDisabled!: Phaser.GameObjects.Text;
    private playedButtonText!: Phaser.GameObjects.Text;
    private playedButtonTextDisabled!: Phaser.GameObjects.Text;

    private playerSlotStack!: PlayerSlotStack;
    private accumulationType!: AccumulationType;
    private maxPlayerSlot: number = 5;
    private rankingIndex!: number;

    //mockup data for test
    private currentPlayerScoreRank: number = 23;
    private currentPlayerHeartRank: number = 2;
    private totalPlayer: number = 40;
    private currentPlayer: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    } = { id: '23', name: 'user23', score: 86 , played: 999 };
    private currentPlayerJson!: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }[]
    private sortPlayerScoreJson1: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }[] = [
        { id: '1',  name: 'น้องลาคูนี่จังงงงงงงงงงงงงงง',  score: 512000000 , played: 100 },
        { id: '2',  name: 'สู้เขาสิน้องหญิง',  score: 256000000 , played: 90 },
        { id: '3',  name: "ญญญญญญญญญญญ",  score: 128000000 , played: 999 },
        { id: '4',  name: 'user4',  score: 103 , played: 70 },
        { id: '5',  name: 'user5',  score: 102 , played: 60 },
        { id: '6',  name: 'user6',  score: 101 , played: 77 },
        { id: '7',  name: 'user7',  score: 100 , played: 40 },
        { id: '8',  name: 'user8',  score: 99 ,  played: 35 },
        { id: '9',  name: 'user9',  score: 99 ,  played: 20 },
        { id: '10', name: 'user10', score: 99 ,  played: 10 },
        { id: '11', name: 'user11', score: 98 ,  played: 9 },
        { id: '12', name: 'user12', score: 97 ,  played: 6 },
        { id: '13', name: 'user13', score: 96 ,  played: 6 },
        { id: '14', name: 'user14', score: 95 ,  played: 6 },
        { id: '15', name: 'user15', score: 94 ,  played: 6 },
        { id: '16', name: 'user16', score: 93 ,  played: 6 },
        { id: '17', name: 'user17', score: 92 ,  played: 6 },
        { id: '18', name: 'user18', score: 91 ,  played: 6 },
        { id: '19', name: 'user19', score: 90 ,  played: 6 },
        { id: '20', name: 'user20', score: 89 ,  played: 6 },
    ]
    private sortPlayerScoreJson2: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }[] = [
        { id: '21', name: 'user21', score: 88 , played: 100 },
        { id: '22', name: 'user22', score: 87 , played: 90 },
        { id: '23', name: "user23", score: 86 , played: 999 },
        { id: '24', name: 'user24', score: 85 , played: 70 },
        { id: '25', name: 'user25', score: 84 , played: 60 },
        { id: '26', name: 'user26', score: 83 , played: 77 },
        { id: '27', name: 'user27', score: 82 , played: 40 },
        { id: '28', name: 'user28', score: 81 , played: 35 },
        { id: '29', name: 'user29', score: 80 , played: 20 },
        { id: '30', name: 'user30', score: 79 , played: 10 },
        { id: '31', name: 'user31', score: 78 , played: 9 },
        { id: '32', name: 'user32', score: 77 , played: 6 },
        { id: '33', name: 'user33', score: 76 , played: 6 },
        { id: '34', name: 'user34', score: 75 , played: 6 },
        { id: '35', name: 'user35', score: 74 , played: 6 },
        { id: '36', name: 'user36', score: 73 , played: 6 },
        { id: '37', name: 'user37', score: 72 , played: 6 },
        { id: '38', name: 'user38', score: 71 , played: 6 },
        { id: '39', name: 'user39', score: 70 , played: 6 },
        { id: '40', name: 'user40', score: 69 , played: 6 },
    ]
    private sortPlayerHeartJson1: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }[] = [
        { id: '3',  name: 'user3',  score: 104 , played: 9999 },
        { id: '23', name: "user23", score: 86 , played: 999 },
        { id: '1',  name: 'น้องลาคูนี่จัง',  score: 111 , played: 123 },
        { id: '21', name: 'user21', score: 88 , played: 111 },
        { id: '2',  name: 'สู้เขาสิน้องหญิง',  score: 105 , played: 99 },
        { id: '22', name: 'user22', score: 87 , played: 90 },
        { id: '4',  name: 'user4',  score: 103 , played: 88 },
        { id: '24', name: 'user24', score: 85 , played: 86 },
        { id: '5',  name: 'user5',  score: 102 , played: 84 },
        { id: '25', name: 'user25', score: 84 , played: 82 },
        { id: '6',  name: 'user6',  score: 101 , played: 79 },
        { id: '26', name: 'user26', score: 83 , played: 77 },
        { id: '7',  name: 'user7',  score: 100 , played: 44 },
        { id: '27', name: 'user27', score: 82 , played: 40 },
        { id: '8',  name: 'user8',  score: 99 ,  played: 39 },
        { id: '28', name: 'user28', score: 81 , played: 37 },
        { id: '9',  name: 'user9',  score: 99 ,  played: 24 },
        { id: '29', name: 'user29', score: 80 , played: 23 },
        { id: '10', name: 'user10', score: 99 ,  played: 22 },
        { id: '30', name: 'user30', score: 79 , played: 21 }
    ];
    private sortPlayerHeartJson2: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }[] = [
        { id: '11', name: 'user11', score: 98 ,  played: 20 },
        { id: '31', name: 'user31', score: 78 , played: 19 },
        { id: '12', name: 'user12', score: 97 ,  played: 18 },
        { id: '13', name: 'user13', score: 96 ,  played: 17 },
        { id: '14', name: 'user14', score: 95 ,  played: 16 },
        { id: '15', name: 'user15', score: 94 ,  played: 15 },
        { id: '16', name: 'user16', score: 93 ,  played: 14 },
        { id: '17', name: 'user17', score: 92 ,  played: 13 },
        { id: '18', name: 'user18', score: 91 ,  played: 12 },
        { id: '19', name: 'user19', score: 90 ,  played: 11 },
        { id: '20', name: 'user20', score: 89 ,  played: 10 },
        { id: '32', name: 'user32', score: 77 , played: 9 },
        { id: '33', name: 'user33', score: 76 , played: 8 },
        { id: '34', name: 'user34', score: 75 , played: 7 },
        { id: '35', name: 'user35', score: 74 , played: 6 },
        { id: '36', name: 'user36', score: 73 , played: 5 },
        { id: '37', name: 'user37', score: 72 , played: 4 },
        { id: '38', name: 'user38', score: 71 , played: 3 },
        { id: '39', name: 'user39', score: 70 , played: 2 },
        { id: '40', name: 'user40', score: 69 , played: 1 }
    ];

    constructor(){
        super('ranking');
    }
    init({ bgm } : { bgm : any}){
        this.bgm = bgm
    }
    preload(){
        this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.image('bg', 'assets/background/submenu-background.png');
        this.load.atlas(
            'heading', 
            'assets/heading/heading_spritesheet.png', 
            'assets/heading/heading_spritesheet.json'
        )
        this.load.atlas(
            'button', 
            'assets/ui/button_spritesheet.png', 
            'assets/ui/button_spritesheet.json'
        )
        this.load.atlas(
            'icon', 
            'assets/icon/icon_spritesheet.png', 
            'assets/icon/icon_spritesheet.json'
        )
    }
    create(){
        const {width, height} = this.scale;
        const self = this;
        this.rankingIndex = 0;
        this.accumulationType = AccumulationType.ACCUMULATION_SCORE;
        this.currentPlayerJson = this.sortPlayerScoreJson1;

        this.background = this.add.tileSprite(
          0,
          0,
          width,
          height,
          'bg'
        ).setOrigin(0).setScrollFactor(0,0)

        this.buttonBack = this.add.image(MARGIN,MARGIN,'icon', 'icon_white_arrow.png')
        this.buttonBackHitBox = this.add.rectangle(0, 0, 256, 256)
        this.buttonBackHitBox.setInteractive().on('pointerup', () => {
            this.destroy()
            this.scene.stop()
            this.scene.start('home', {bgm: this.bgm})
        })

        this.iconRanking = this.add.image(
          width/2, 
          110, 
          'icon', 
          'icon_ranking.png', 
        ).setOrigin(0.5, 0.5)
        .setScale(2.5)
        
        this.banner = this.add.nineslice(
          width/2, 
          228, 
          'heading', 
          'heading_red.png', 
          528, 
          128
        ).setOrigin(0.5, 0.5)

        this.headerText = I18nSingleton.getInstance()
        .createTranslatedText(
            this, 
            width/2, 
            212, 
            'ranking_title'
        ) 
        .setAlign('center')
        .setOrigin(0.5, 0.5)

        this.createScoreButton()
        this.createPlayedButton()
        this.createScoreDisabledButton()
        this.createPlayedDisabledButton()
        this.setScoreButtonDisabled(false)
        this.setPlayedButtonDisabled(true)
        

        //ranking box (background of the ranking list)
        this.rankingBox = this.add.graphics()
        this.rankingBox.fillStyle(0xFFF6E5)
        this.rankingBox.fillRoundedRect(
            MARGIN, 
            459,
            624, 
            696, 
            40
        )
        this.rankingBox.lineStyle(6, 0xD35E24)
        this.rankingBox.strokeRoundedRect(
            MARGIN, 
            459,
            624, 
            696, 
            40
        )

        this.playerSlotStack = new PlayerSlotStack(
            this, 
            this.sortPlayerScoreJson1, 
            this.currentPlayer, 
            this.accumulationType, 
            {x: MARGIN, y: 459}, 
            this.rankingIndex, 
            this.maxPlayerSlot, 
            this.currentPlayerScoreRank, 
            this.currentPlayerHeartRank
        )
        this.playerSlotStack.createPlayerSlot()
        this.playerSlotStack.createCurrentPlayerSlot()

        this.redButtonLeft = this.add.nineslice(
            width/2+86, 
            1160, 
            'button', 
            'button_red40.png', 
            96, 
            96
        ).setOrigin(0.5, 0.5)
        .setInteractive().on('pointerup', () => {
            this.decreaseRankingIndex()
            this.updateFont()
        }).setDepth(1)

        this.iconLeft = this.add.image(
            width/2+86, 
            1155, 
            'icon', 
            'icon_white_arrow.png'
        ).setOrigin(0.5, 0.5)
        .setDepth(1)

        this.redButtonRight = this.add.nineslice(
            width/2+214, 
            1160, 
            'button', 
            'button_red40.png', 
            96, 
            96
        ).setOrigin(0.5, 0.5)
        .setInteractive().on('pointerup', () => {
            this.increaseRankingIndex()
            this.updateFont()
        }).setDepth(1)

        this.iconRight = this.add.image(
            width/2+214, 
            1155, 
            'icon', 
            'icon_white_arrow.png'
        ).setOrigin(0.5, 0.5)
        .setFlipX(true)
        .setDepth(1)
        
        this.createOverlayOnButtonLeft()
        this.createOverlayOnButtonRight()
        
        WebFont.load({
          google:{
              families: ['Mali:500,600,700','Jua'],
          },
          active: () =>{
            self.playerSlotStack.initFontStyle()
            self.headerText.setStyle({
                fontFamily: 'Mali',
                fontWeight: 600,
                color: 'white',
            })
            .setFontSize(42)
            .setStroke('#9E461B', 12)
            .setLineSpacing(16)

            self.scoreButtonText.setStyle({
                fontFamily: 'Mali',
                fontStyle: 'bold',
                color: 'white',
            })
            .setFontSize(32)
            .setStroke('#327F76', 5)

            self.playedButtonText.setStyle({
                fontFamily: 'Mali',
                fontStyle: 'bold',
                color: 'white',
            })
            .setFontSize(32)
            .setStroke('#BF7F03', 5)

            self.scoreButtonTextDisabled.setStyle({
                fontFamily: 'Mali',
                fontStyle: 'bold',
                color: 'white',
            })
            .setFontSize(32)
            .setStroke('#958E83', 5)

            self.playedButtonTextDisabled.setStyle({
                fontFamily: 'Mali',
                fontStyle: 'bold',
                color: 'white',
            })
            .setFontSize(32)
            .setStroke('#958E83', 5)
          },
      });
    }
    update(): void {}

    private createScoreButton():void{
        this.scoreButton = this.add.graphics()
        this.scoreButton.fillStyle(0x43A99E)
        this.scoreButton.fillRoundedRect(
            this.scale.width/2-272, 384, 264, 80, 
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )
        this.scoreButton.lineStyle(6, 0x327F76)
        this.scoreButton.strokeRoundedRect(
            this.scale.width/2-272, 384, 264, 80,  
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )

        this.scoreButtonText = I18nSingleton.getInstance()
        .createTranslatedText(
            this, 
            this.scale.width/2-140, 
            424, 
            'accumulate_score'
        ).setAlign('center')
        .setOrigin(0.5, 0.5)
    }

    private createPlayedButton():void{
        this.playedButton = this.add.graphics()
        this.playedButton.fillStyle(0xFFAA04)
        this.playedButton.fillRoundedRect(
            this.scale.width/2+8, 384, 264, 80, 
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )
        this.playedButton.lineStyle(6, 0xBF7F03)
        this.playedButton.strokeRoundedRect(
            this.scale.width/2+8, 384, 264, 80,  
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )

        this.playedButtonText = I18nSingleton.getInstance()
        .createTranslatedText(
            this, 
            this.scale.width/2+140, 
            424, 
            'accumulate_play'
        ).setAlign('center')
        .setOrigin(0.5, 0.5)
    }

    private createScoreDisabledButton():void{
        this.scoreButtonDisabled = this.add.graphics()
        this.scoreButtonDisabled.fillStyle(0xC7BEAF)
        this.scoreButtonDisabled.fillRoundedRect(
            this.scale.width/2-272, 384, 264, 80, 
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )
        this.scoreButtonDisabled.lineStyle(6, 0x958E83)
        this.scoreButtonDisabled.strokeRoundedRect(
            this.scale.width/2-272, 384, 264, 80,  
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )

        this.scoreButtonTextDisabled = I18nSingleton.getInstance()
        .createTranslatedText(
            this, 
            this.scale.width/2-140, 
            424, 
            'accumulate_score'
        ).setAlign('center')
        .setOrigin(0.5, 0.5)
        this.scoreButtonTextDisabled.setInteractive().on('pointerup', () => {
            this.setPlayedButtonDisabled(true)
            this.setScoreButtonDisabled(false)
            this.setButtonOverlayLeft(true)
            this.setButtonOverlayRight(false)
            this.rankingIndex = 0
            this.accumulationType = AccumulationType.ACCUMULATION_SCORE
            this.currentPlayerJson = this.setCurrentPlayerData()
            this.playerSlotStack.setPlayerData(this.currentPlayerJson)
            this.playerSlotStack.setAccumulationType(this.accumulationType)
            this.playerSlotStack.clearSlot()
            this.playerSlotStack.createPlayerSlot()
            this.playerSlotStack.createCurrentPlayerSlot()
            this.updateFont()
        })
    }

    private createPlayedDisabledButton():void{
        this.playedButtonDisabled = this.add.graphics()
        this.playedButtonDisabled.fillStyle(0xC7BEAF)
        this.playedButtonDisabled.fillRoundedRect(
            this.scale.width/2+8, 384, 264, 80, 
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )
        this.playedButtonDisabled.lineStyle(6, 0x958E83)
        this.playedButtonDisabled.strokeRoundedRect(
            this.scale.width/2+8, 384, 264, 80,  
            { tl: 40, tr: 40, bl: 0, br: 0 }
        )

        this.playedButtonTextDisabled = I18nSingleton.getInstance()
        .createTranslatedText(
            this, 
            this.scale.width/2+140, 
            424, 
            'accumulate_play'
        ).setAlign('center')
        .setOrigin(0.5, 0.5)
        this.playedButtonTextDisabled.setInteractive().on('pointerup', () => {
            this.setScoreButtonDisabled(true)
            this.setPlayedButtonDisabled(false)
            this.setButtonOverlayLeft(true)
            this.setButtonOverlayRight(false)
            this.rankingIndex = 0
            this.accumulationType = AccumulationType.ACCUMULATION_HEART
            this.currentPlayerJson = this.setCurrentPlayerData()
            this.playerSlotStack.setPlayerData(this.currentPlayerJson)
            this.playerSlotStack.setAccumulationType(this.accumulationType)
            this.playerSlotStack.clearSlot()
            this.playerSlotStack.createPlayerSlot()
            this.playerSlotStack.createCurrentPlayerSlot()
            this.updateFont()
        })
    }

    private createOverlayOnButtonLeft():void{
        this.OverlayLeftButton = this.add.nineslice(
            720/2+86,  
            1160, 
            'button', 
            'button_red40.png', 
            96, 
            96
        ).setOrigin(0.5, 0.5)
        .setAlpha(0.6)
        .setTint(0x000000)
        .setActive(true)
        .setVisible(true)
        .setDepth(1)
    }

    private createOverlayOnButtonRight():void{
        this.OverlayRightButton = this.add.nineslice(
            720/2+214, 
            1160, 
            'button', 
            'button_red40.png', 
            96, 
            96
        ).setOrigin(0.5, 0.5)
        .setAlpha(0.6)
        .setTint(0x000000)
        .setActive(false)
        .setVisible(false)
        .setDepth(1)
    }

    private setButtonOverlayLeft(isActive:boolean):void{
        this.OverlayLeftButton.setVisible(isActive)
        this.OverlayLeftButton.setActive(isActive)
    }

    private setButtonOverlayRight(isActive:boolean):void{
        this.OverlayRightButton.setVisible(isActive)
        this.OverlayRightButton.setActive(isActive)
    }

    private setScoreButtonDisabled(isActive:boolean):void{
        this.scoreButtonDisabled.setVisible(isActive)
        this.scoreButtonTextDisabled.setVisible(isActive)
        this.scoreButtonDisabled.setActive(isActive)
        this.scoreButtonTextDisabled.setActive(isActive)
    }

    private setPlayedButtonDisabled(isActive:boolean):void{
        this.playedButtonDisabled.setVisible(isActive)
        this.playedButtonTextDisabled.setVisible(isActive)
        this.playedButtonDisabled.setActive(isActive)
        this.playedButtonTextDisabled.setVisible(isActive)
    }

    //todo: fetch data from backend
    private setCurrentPlayerData():{ 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }[]{
        if(this.accumulationType === AccumulationType.ACCUMULATION_SCORE){
            const fileNumber = Math.floor(this.rankingIndex/20)
            if(fileNumber === 0){
                return this.sortPlayerScoreJson1
            }else{
                return this.sortPlayerScoreJson2
            }

        }else{
            const fileNumber = Math.floor(this.rankingIndex/20)
            if(fileNumber === 0){
                return this.sortPlayerHeartJson1
            }else{
                return this.sortPlayerHeartJson2
            }
        }
    }

    private increaseRankingIndex():void{
        if(this.rankingIndex+this.maxPlayerSlot >= this.totalPlayer) {
            this.setButtonOverlayRight(true)
            return;
        }
        this.setButtonOverlayLeft(false)
        this.setButtonOverlayRight(false)
        this.rankingIndex += this.maxPlayerSlot;
        if(this.rankingIndex+this.maxPlayerSlot >= this.totalPlayer) {
            this.setButtonOverlayRight(true)
        }
        if(this.rankingIndex%20 === 0){
            this.currentPlayerJson = this.setCurrentPlayerData()
            this.playerSlotStack.setPlayerData(this.currentPlayerJson)
            return
        }
        this.playerSlotStack.nextPage()
    }

    private decreaseRankingIndex():void{
        if(this.rankingIndex <= 0) {
            this.setButtonOverlayLeft(true)
            return;
        }
        this.setButtonOverlayLeft(false)
        this.setButtonOverlayRight(false)
        if(this.rankingIndex%20 <= 0){
            this.rankingIndex -= this.maxPlayerSlot;
            this.currentPlayerJson = this.setCurrentPlayerData()
            this.playerSlotStack.setRank(this.rankingIndex)
            this.playerSlotStack.setPlayerData(this.currentPlayerJson)
            return
        }
        this.rankingIndex -= this.maxPlayerSlot;
        if(this.rankingIndex <= 0) {
            this.setButtonOverlayLeft(true)
        }
        this.playerSlotStack.previousPage()
    }

    private updateFont():void{
        const self = this;
        WebFont.load({
            google:{
                families: ['Mali:500,600,700','Jua'],
            },
            active: () =>{
              self.playerSlotStack?.initFontStyle()
            },
        });
    }

    destroy():void {
        this.bgm?.destroy()
        this.background.destroy()
        this.banner.destroy()
        this.redButtonLeft.destroy()
        this.redButtonRight.destroy()
        this.iconRanking.destroy()
        this.iconLeft.destroy()
        this.iconRight.destroy()
        this.buttonBack.destroy()
        this.buttonBackHitBox.destroy()
        this.scoreButton.destroy()
        this.scoreButtonDisabled.destroy()
        this.playedButton.destroy()
        this.playedButtonDisabled.destroy()
        this.OverlayLeftButton.destroy()
        this.OverlayRightButton.destroy()
        this.rankingBox.destroy()
    
        this.headerText.destroy()
        this.scoreButtonText.destroy()
        this.scoreButtonTextDisabled.destroy()
        this.playedButtonText.destroy()
        this.playedButtonTextDisabled.destroy()
    
        this.playerSlotStack.destroy()
    }
}