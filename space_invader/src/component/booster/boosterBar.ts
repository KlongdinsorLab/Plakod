import { MARGIN,SCREEN_HEIGHT,MAX_SELECTED_BOOSTER } from "config";
import { BoosterUI } from "./boosterUI";
import I18nSingleton from 'i18n/I18nSingleton';
import i18next from 'i18next';

export default class boosterBar{
    private scene: Phaser.Scene;
    private selectedBooster: string[] = [];

    private position = {x: MARGIN*2, y: SCREEN_HEIGHT/2 - MARGIN*2};
    private boosterSize = {width: 96 , height: 96};
    private gapSize = {width:120, height: 140};

    private boosterGraphics: Map<string, Phaser.GameObjects.Graphics> = new Map();
    private boosterMark: Map<string, Phaser.GameObjects.Image> = new Map();

    private descriptionImage!: Phaser.GameObjects.Image;
    private descriptionBg!: Phaser.GameObjects.Graphics
    private descriptionText: Phaser.GameObjects.Text | undefined;
    private descriptionAmount: Phaser.GameObjects.Text | undefined;

    private boosters: BoosterUI[]=[];
    private boosterJSON = {
        "booster_1":          {"expire_date": ["2024-06-22T12:00:00.000Z","2024-06-22T13:00:00.000Z"],    "amount" : 3,},
        "booster_2":          {"expire_date": ["2024-06-21T05:00:00.000Z","2024-06-21T06:00:00.000Z"],    "amount" : 2,},
        "booster_3":          {"expire_date": [], "amount" : 30,},
        "booster_4":          {"expire_date": [], "amount" : 0,},
        "booster_5":          {"expire_date": [], "amount" : 1,},
        "booster_rare1":      {"expire_date": [], "amount" : 1,},
        "booster_rare2":      {"expire_date": [], "amount" : 1,},          
    
    };

    constructor(scene: Phaser.Scene){
        this.scene = scene
        this.boosters[1] = new BoosterUI(
            this.scene,
            '1',
            {
                x: this.position.x + MARGIN * 2 / 3,
                y: this.position.y,
                amount: this.boosterJSON.booster_1.amount,
                expireArray: this.boosterJSON.booster_1.expire_date
            }
        )
        this.boosters[1].getBody().setInteractive().on('pointerup', () => this.isSelected(1))

        this.boosters[2] = new BoosterUI(
            this.scene,
            '2',
            {
                x: this.position.x+MARGIN*2/3+ this.gapSize.width*1,
                y: this.position.y,
                amount: this.boosterJSON.booster_2.amount,
                expireArray: this.boosterJSON.booster_2.expire_date
            }
        )
        this.boosters[2].getBody().setInteractive().on('pointerup', () => this.isSelected(2))

        this.boosters[3] = new BoosterUI(
            this.scene,
            '3',
            {
                x: this.position.x+MARGIN*2/3+ this.gapSize.width*2,
                y: this.position.y,
                amount: this.boosterJSON.booster_3.amount,
                expireArray: this.boosterJSON.booster_3.expire_date
            }
        )
        this.boosters[3].getBody().setInteractive().on('pointerup', () => this.isSelected(3))

        this.boosters[4] = new BoosterUI(
            this.scene,
            '4',
            {
                x: this.position.x+MARGIN*2/3+ this.gapSize.width*3,
                y: this.position.y,
                amount: this.boosterJSON.booster_4.amount,
                expireArray: this.boosterJSON.booster_4.expire_date
            }
        )
        this.boosters[4].getBody().setInteractive().on('pointerup', () => this.isSelected(4))

        this.boosters[5] = new BoosterUI(
            this.scene,
            '5',
            {
                x: this.position.x+MARGIN*2,
                y: this.position.y+ this.gapSize.height,
                amount: this.boosterJSON.booster_5.amount,
                expireArray: this.boosterJSON.booster_5.expire_date
            }
        )
        this.boosters[5].getBody().setInteractive().on('pointerup', () => this.isSelected(5))

        this.boosters[6] = new BoosterUI(
            this.scene,
            'rare1',
            {
                x: this.position.x+MARGIN*2+this.gapSize.width,
                y: this.position.y+ this.gapSize.height,
                amount: this.boosterJSON.booster_5.amount,
                expireArray: this.boosterJSON.booster_5.expire_date
            }
        )
        this.boosters[6].getBody().setInteractive().on('pointerup', () => this.isSelected(6))

        this.boosters[7] = new BoosterUI(
            this.scene,
            'rare2',
            {
                x: this.position.x+MARGIN*2+this.gapSize.width*2,
                y: this.position.y+ this.gapSize.height,
                amount: this.boosterJSON.booster_5.amount,
                expireArray: this.boosterJSON.booster_5.expire_date
            }
        )
        this.boosters[7].getBody().setInteractive().on('pointerup', () => this.isSelected(7))

        this.boosters.forEach((booster) => {
            booster.initBooster()
        })

        this.setDescriptionBox()



    }

    isSelected(index:number):void{
        if(!this.boosters[index].getIsCompleteInit()){
            return;
        }
        if (this.selectedBooster.includes(this.boosters[index].getName())) {
            this.setDeselect(index);
            return;
        }
        
        if(this.selectedBooster.length >= MAX_SELECTED_BOOSTER){
            return;
        }
        if(this.boosters[index].getState() === 'unavailable'){
            return;
        }
        this.setSelect(index);
    }

    setSelect(index:number):void{
        const position = this.boosters[index].getPosition()
        const selectedMark = this.scene.add.graphics();
        selectedMark.lineStyle(6, 0x327F76);
        selectedMark.strokeRoundedRect(position.x, position.y, 96, 96, 100);
        this.boosterGraphics.set(this.boosters[index].getName(), selectedMark);

        const newBoosterMark = this.scene.add.image(position.x + 104, position.y, 'booster_selectedMark').setOrigin(1, 0);
        newBoosterMark.setDepth(1);
        this.boosterMark.set(this.boosters[index].getName(), newBoosterMark);

        this.selectedBooster.push(this.boosters[index].getName());
        this.setDescriptionBox(index)
    }

    setDeselect(index: number): void {
        const name = this.boosters[index].getName();
        const selectedMark = this.boosterGraphics.get(name);
        if (selectedMark) {
            selectedMark.destroy();
            this.boosterGraphics.delete(name);
        }
    
        const boosterMark = this.boosterMark.get(name);
        if (boosterMark) {
            boosterMark.destroy();
            this.boosterMark.delete(name);
        }
    
        this.selectedBooster = this.selectedBooster.filter(selected => selected !== name);
        this.setDescriptionBox();
    }
    

    setDescriptionBox(index?: number, color?: number) {
        if (!this.scene) return; // Ensure scene is defined
    
        if (this.descriptionBg) {
            this.descriptionBg.destroy();
        }
    
        const descriptionBox = this.scene.add.graphics();
        descriptionBox.fillStyle(color ?? 0xFFE7BA);
        descriptionBox.fillRoundedRect(this.position.x, this.position.y + this.gapSize.height * 2, this.position.x * 5.6, MARGIN * 3, 18);
        this.descriptionBg = descriptionBox;
    
        if (index !== undefined) {
            const name = this.boosters[index].getName();
            let frame = "booster_" + name + ".png";
    
            if (this.descriptionImage) {
                this.descriptionImage.destroy();
            }
            
            this.descriptionImage = this.scene.add.image(
                this.position.x + MARGIN * 2 / 3, 
                this.position.y + this.gapSize.height * 2 + MARGIN / 2, 
                "dropItem", 
                frame
            ).setOrigin(0, 0).setSize(this.boosterSize.width, this.boosterSize.height);
    
            this.descriptionText = I18nSingleton.getInstance()
                .createTranslatedText(
                    this.scene,
                    this.position.x + MARGIN * 2 / 3 + 128,
                    this.position.y + this.gapSize.height * 2 + MARGIN / 2.5,
                    'booster_description_' + name
                )
                .setAlign('start')
                .setOrigin(0, 0);
    
            this.setDescriptionAmount(index);
    
        } else {
            this.descriptionAmount = I18nSingleton.getInstance()
                .createTranslatedText(
                    this.scene,
                    this.position.x * 5.6 / 2 - 64,
                    this.position.y + this.gapSize.height * 2 + MARGIN + 8,
                    i18next.t('booster_description_default',{MAX_SELECTED_BOOSTER})

                )
                .setAlign('center')
                .setOrigin(0, 0);
    
        }
    
        this.initFontStyle(); // Ensure initFontStyle is called after setting descriptionText and descriptionAmount
    }
    
    setDescriptionAmount(index:number): void{
        let text : string;
        if (this.boosters[index].getState() === 'limitedtime') {
            const [hours, minutes, seconds] = this.boosters[index].getTimeText().split(':').map(Number);
            if(hours == 0 && minutes == 0 && seconds > 0){
                text = i18next.t('booster_description_expire_seconds');
            }else{
            text = i18next.t('booster_description_expire', { hours, minutes},);
            }
        }  
        else {
            const amount = this.boosters[index].getAmount();
            text = i18next.t('booster_description_amount', { amount });
        }
        
        this.descriptionAmount = I18nSingleton.getInstance()
        .createTranslatedText(
            this.scene,
            this.position.x+MARGIN*2/3+128, 
            this.position.y+this.gapSize.height*2+MARGIN*2-8, 
            text
        )
        .setAlign('start')
        .setOrigin(0, 0);

    }

    boosterFontStyle(){
        this.boosters.forEach((booster) => {
            booster.initFontStyle()
        })
    }

    getBooster(){
        return this.selectedBooster
    }

    initFontStyle(){
        
        if (this.descriptionText) {
            this.descriptionText.setStyle({
                fontFamily: 'Mali',
                fontStyle: 500,
                fontSize: '24px',
                color: '#57453B'
            }).setLineSpacing(8);
        }
    
        if (this.descriptionAmount) {
            this.descriptionAmount.setStyle({
                fontFamily: 'Mali',
                fontWeight: 500,
                fontSize: '24px',
                color: '#D35E24'
            });
        }
    }

    destroy(){
        this.boosters.forEach((booster) => {
            booster.destroy()
        })

        this.descriptionBg.destroy()
        this.descriptionImage?.destroy()
        this.descriptionText?.destroy()
        this.descriptionAmount?.destroy()

    }
    
}

    