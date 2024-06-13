import { MARGIN,SCREEN_HEIGHT } from "config";
import TimeService from 'services/timeService';
import I18nSingleton from 'i18n/I18nSingleton';
import i18next from 'i18next';

export default class boosterBar{
    private scene: Phaser.Scene | undefined;

    private selectedBooster: string[] = [];
    private maxSelectableBoosters: number = 1;

    private boosterGraphics: Map<string, Phaser.GameObjects.Graphics> = new Map();
    private boosterMark: Map<string, Phaser.GameObjects.Image> = new Map();

    private markCircle : Map<string, Phaser.GameObjects.Arc> = new Map();
    private markText : Map<string, Phaser.GameObjects.Text> = new Map();

    private descriptionImage: Map<string, Phaser.GameObjects.Image> = new Map();
    private descriptionBg: Map<string, Phaser.GameObjects.Graphics> = new Map();
    private descriptionText: Phaser.GameObjects.Text | undefined;
    private descriptionAmount: Phaser.GameObjects.Text | undefined;
    private descriptionHours : number | undefined;
    private descriptionMinutes : number | undefined;

    private position = {x: MARGIN*2, y: SCREEN_HEIGHT/2 - MARGIN*2};
    private boosterSize = {width: 96 , height: 96};
    private gapSize = {width:120, height: 140};

    private timeService = new TimeService();
    private startTime: Date = new Date();
    private timeText: string[] = [];
    private countdownText : Phaser.GameObjects.Text[]=[];
    private countdownIndex : number[]=[0,0,0,0,0,0,0,0];
    private countdownTime: Map<string, Phaser.GameObjects.Text> = new Map();
    private Mark: Phaser.GameObjects.Text[] = [];
    
    //from database
    private boosterJSON = {
            "booster_1":          {"duration": ["00:00:10","00:00:15"],    "amount" : 3,},
            "booster_2":          {"duration": ["00:00:10","00:00:15","00:01:00"],    "amount" : 3,},
            "booster_3":          {"duration": ["09:00:00",],              "amount" : 7,},
            "booster_4":          {"duration": ["12:00:00",],              "amount" : 2,},
            "booster_5":          {"duration": [], "amount" : 0,},
            "booster_rare1":      {"duration": [], "amount" : 0,},
            "booster_rare2":      {"duration": [], "amount" : 1,},          
        
    };
    
    constructor(scene: Phaser.Scene){
        this.scene = scene;
                
        //first line
        this.scene.add.image(
            this.position.x+MARGIN*2/3, 
            this.position.y, 
            'dropItem',
            'booster1.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_1'), 
            this.position.x+MARGIN*2/3, 
            this.position.y,
            1
        ));

        this.scene.add.image(
            this.position.x+MARGIN*2/3+ this.gapSize.width, 
            this.position.y, 
            'dropItem',
            'booster2.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_2'),
            this.position.x+MARGIN*2/3+ 
            this.gapSize.width, 
            this.position.y,
            2
        ));
        
        this.scene.add.image(
            this.position.x+MARGIN*2/3+ this.gapSize.width*2, 
            this.position.y, 
            'dropItem',
            'booster3.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_3'), 
            this.position.x+MARGIN*2/3+ this.gapSize.width*2, 
            this.position.y,
            3
        ));
        
        this.scene.add.image(
            this.position.x+MARGIN*2/3+ this.gapSize.width*3, 
            this.position.y, 
            'dropItem',
            'booster4.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_4'), 
            this.position.x+MARGIN*2/3+ this.gapSize.width*3, 
            this.position.y,
            4
        ));
       

        //second line
        this.scene.add.image(
            this.position.x+MARGIN*2, 
            this.position.y+ this.gapSize.height, 
            'dropItem',
            'booster5.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_5'), 
            this.position.x+MARGIN*2, 
            this.position.y + this.gapSize.height,
            5
        ));
        
        
        this.scene.add.image(
            this.position.x+MARGIN*2+ this.gapSize.width, 
            this.position.y+ this.gapSize.height, 
            'dropItem',
            'booster rare1.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_rare1'), 
            this.position.x+MARGIN*2+ this.gapSize.width, 
            this.position.y + this.gapSize.height,
            6
        ));
        
        
        this.scene.add.image(
            this.position.x+MARGIN*2+ this.gapSize.width*2, 
            this.position.y+ this.gapSize.height, 
            'dropItem',
            'booster rare2.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        .setInteractive().on('pointerup', () => this.IsSelected(
            this.scene!, 
            this.getBoosterByName('booster_rare2'), 
            this.position.x+MARGIN*2+ this.gapSize.width*2, 
            this.position.y + this.gapSize.height,
            7
        ));
       
        //first line
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_1')!,
            this.position.x+MARGIN*2/3, 
            this.position.y, 
            this.getBoosterState(this.getBoosterByName('booster_1')!,1),
            1
        );
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_2')!,
            this.position.x+MARGIN*2/3+ this.gapSize.width, 
            this.position.y, 
            this.getBoosterState(this.getBoosterByName('booster_2')!,2),
            2
        );
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_3')!,
            this.position.x+MARGIN*2/3+ this.gapSize.width*2, 
            this.position.y, 
            this.getBoosterState(this.getBoosterByName('booster_3')!,3),
            3
        );
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_4')!,
            this.position.x+MARGIN*2/3+ this.gapSize.width*3, 
            this.position.y, 
            this.getBoosterState(this.getBoosterByName('booster_4')!,4),
            4
        );


        //second line
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_5')!,
            this.position.x+MARGIN*2, 
            this.position.y+ this.gapSize.height, 
            this.getBoosterState(this.getBoosterByName('booster_5')!,5),
            5
        );
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_rare1')!,
            this.position.x+MARGIN*2+ this.gapSize.width, 
            this.position.y+ this.gapSize.height, 
            this.getBoosterState(this.getBoosterByName('booster_rare1')!,6),
            6
        );
        this.initBooster(
            this.scene, 
            this.getBoosterByName('booster_rare2')!,
            this.position.x+MARGIN*2+ this.gapSize.width*2, 
            this.position.y+ this.gapSize.height, 
            this.getBoosterState(this.getBoosterByName('booster_rare2')!,7),
            7
        );

        //description
        this.setDescriptionBox(this.scene, 0xFFE7BA, -1);

        

        

    }

    IsSelected(scene: Phaser.Scene, booster: { name: string } | undefined, x: number, y: number, index:number): void {
        let state = this.getBoosterState(booster!,index);
        console.log('IsSelected',booster!.name, state);
        if (!booster) {
            console.error('Booster not found');
            return;
        }
    
        if (this.selectedBooster.includes(booster.name)) {
            this.setDeselectBooster(scene, booster,index);
            return;
        }
    
        if (this.selectedBooster.length >= this.maxSelectableBoosters) {
            console.log('Maximum selectable boosters reached');
            return;
        }
        if(state === 'none'){
            return;
        }
    
        this.setSelectedBooster(scene, booster, x, y, index);
    }
    
    setDeselectBooster(scene:Phaser.Scene,booster: { name: string }, index:number): void {
        this.selectedBooster = this.selectedBooster.filter(selected => selected !== booster.name);
            const selectedMark = this.boosterGraphics.get(booster.name);
            if (selectedMark) {
                selectedMark.destroy();
                console.log('Booster deselected',selectedMark);
                this.boosterGraphics.delete(booster.name);
            }

            const boosterMark = this.boosterMark.get(booster.name);
            if (boosterMark) {
                boosterMark.destroy();
                console.log('Booster deselected', boosterMark);
                this.boosterMark.delete(booster.name);
            }
            
            if(this.selectedBooster.length == 0){
                this.setDescriptionBox(scene , 0xFFE7BA, index);
            }else{
                this.setDescriptionBox(scene , 0xFFE7BA, index ,this.getBoosterByName(this.selectedBooster[this.selectedBooster.length-1])!);
            }
    }

    setSelectedBooster(scene: Phaser.Scene,  booster: { name: string }, x:number, y:number, index:number): void {
        const selectedMark = scene.add.graphics();
        selectedMark.lineStyle(6, 0x327F76);
        selectedMark.strokeRoundedRect(x, y, 96, 96, 100);
        this.boosterGraphics.set(booster.name, selectedMark);

        const newBoosterMark = scene.add.image(x + 104, y, 'booster_selectedMark').setOrigin(1, 0);
        newBoosterMark.setDepth(1);
        this.boosterMark.set(booster.name, newBoosterMark);

        this.selectedBooster.push(booster.name);
        this.setDescriptionBox(scene, 0xFFE7BA, index ,booster)
    }

    setDescriptionBox(scene: Phaser.Scene, color: number, index:number ,booster?: { name: string }){
        const descriptionBg = this.descriptionBg.get('descriptionBox');
        if (descriptionBg) {
            descriptionBg.destroy();
            this.descriptionBg.delete('descriptionBox');
        }

        const descriptionBox = scene.add.graphics();
        descriptionBox.fillStyle(color)
        descriptionBox.fillRoundedRect( this.position.x, this.position.y+this.gapSize.height*2,this.position.x*5.6, MARGIN*3, 18)
        this.descriptionBg.set('descriptionBox', descriptionBox);
        if(booster){
            const state = this.getBoosterState(booster,index);
            const name = booster.name;
            const fname = name.split('_')[1];
            let frame = "booster"+fname+".png";
            if(booster.name === 'booster_rare1' || booster.name === 'booster_rare2'){
                frame = "booster "+fname+".png";
            }
            console.log(frame)
            const descriptionImage = this.descriptionImage.get(booster!.name);
            

            if (descriptionImage) {
                descriptionImage.destroy();
                this.descriptionImage.delete(booster!.name);
            }
            
            const descriptionAddImage =  scene.add.image(this.position.x+MARGIN*2/3, this.position.y+this.gapSize.height*2+MARGIN/2, "dropItem" ,frame).setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height);
            this.descriptionImage.set(booster.name, descriptionAddImage);

            this.descriptionText = I18nSingleton.getInstance()
            .createTranslatedText(
                scene,
                this.position.x+MARGIN*2/3+128, 
                this.position.y+this.gapSize.height*2+MARGIN/2.5, 
                'booster_description_'+fname
            )
            .setAlign('start')
            .setOrigin(0, 0);

            this.setDescriptionAmount(scene,booster,state,index);

            
        }else{
            this.descriptionAmount = I18nSingleton.getInstance()
            .createTranslatedText(
                scene,
                this.position.x*5.6/2-64, 
                this.position.y+this.gapSize.height*2+MARGIN+8, 
                'booster_description_default'
            )
            .setAlign('center')
            .setOrigin(0, 0);
            
        }
        this.initFontStyle();
    }

    setDescriptionAmount(scene:Phaser.Scene, booster: { name: string } ,state:string, index:number): void{
        const [hours, minutes, seconds] = this.timeText[index].split(':').map(Number);
        let text : string;
        
        if (state === 'limitedTime') {
            if(hours == 0 && minutes == 0 && seconds > 0){
                text = i18next.t('booster_description_expire_seconds');
            }else{
            text = i18next.t('booster_description_expire', { hours, minutes},);
            }
        }  
        else {
            const amount = (this.boosterJSON as any)[booster.name].amount;
            text = i18next.t('booster_description_amount', { amount });
        }
        
        this.descriptionAmount = I18nSingleton.getInstance()
        .createTranslatedText(
            scene,
            this.position.x+MARGIN*2/3+128, 
            this.position.y+this.gapSize.height*2+MARGIN*2-8, 
            text
        )
        .setAlign('start')
        .setOrigin(0, 0);

    }

    getBoosterByName(name: string): { name: string } | undefined {
                const boosters = (this.boosterJSON as any);
                if (boosters.hasOwnProperty(name)) {
                    return { name: name };
                }
        return undefined; // Booster not found
    }
    
    getBoosterState(booster: { name: string }, index?:number): string {
        //check if booster is limitedTime
        const isLimitedTime = (this.boosterJSON as any)[booster.name].duration.length;
        if (isLimitedTime > 0) {
            if(index && this.countdownIndex[index-1] > isLimitedTime-1){
                const amount = (this.boosterJSON as any)[booster.name]?.amount ?? undefined;
                if (amount == 0) {
                    return 'none';
                }
                return 'permanent';
            }
            return 'limitedTime';
        }
        //check if no booster
        const amount = (this.boosterJSON as any)[booster.name]?.amount ?? undefined;
        if(amount === undefined){
            console.error('Booster amount not found');
        }
        if (amount == 0) {
            return 'none';
        }
        return 'permanent';
    }

    initBooster(scene: Phaser.Scene, booster: { name: string }, x:number, y:number, state: string, index:number): void {
        console.log('initBooster',booster.name, state);
        if(state === 'limitedTime'){
            this.setTimeout(scene,booster,(this.boosterJSON as any)[booster.name].duration, x, y, index);
            this.setMark(scene, x, y, booster.name, index);
        }else if(state === 'none'){
            this.setUnAvailable(scene,booster.name, x, y, index);
        }else{
            this.setMark(scene, x, y, booster.name, index);
        }
    }

    setTimeout(scene:Phaser.Scene, booster: { name: string }, durationArray:string[], x:number, y:number, index:number): void {
        console.log('setTimeout',booster.name);
        const duration = durationArray[this.countdownIndex[index-1]];
        const durationInSecond = this.timeService.parseDuration(duration);

        const countdown = scene.add.text(x, y + 104, '', { fontSize: '20px', color: '#111111' }).setOrigin(0, 0);
        countdown.setStyle({
            fontFamily: 'Jua',
            fontWeight: 400,
            fontSize: '20px',
            color: '#57453B',
        }).setStroke('#ffffff', 6);

        this.countdownText[index-1] = countdown;
        this.countdownTime.set(booster.name, countdown);
        let count = 0;
        

        const timerEvent = scene.time.addEvent({
            delay: 1000,
            callback: () => {
                count++;
                const timeCount = this.timeService.getDurationTime(durationInSecond ,this.startTime);
                if (timeCount === 'timeout') {
                    console.log('timeout',booster.name);
                    this.countdownIndex[index-1]++;
                    (this.boosterJSON as any)[booster.name].amount--;

                    const time = this.countdownTime.get(booster.name);
                    if (time) {
                        time.destroy();
                        console.log('time destroy',time);
                        this.countdownTime.delete(booster.name);
                    }
                    const state = this.getBoosterState(booster, index);
                    this.initBooster(scene, booster, x, y, state, index);
                    timerEvent.remove();
                }else{
                countdown.setText(timeCount);
                this.timeText[index] = timeCount;
                }
            },
            loop: true
        });
    }
    
    setUnAvailable(scene:Phaser.Scene, name:string, x:number, y:number, index:number): void {
        console.log('setUnAvailable',name);
        if(this.selectedBooster.includes(name)){
            this.setDeselectBooster(scene,this.getBoosterByName(name)!, index)
        }
        const markBg = this.markCircle.get(name);
        if (markBg) {
            markBg.destroy();
            console.log('markBG deselected',markBg);
            this.markCircle.delete(name);
        }

        const markText = this.markText.get(name);
        if (markText) {
            markText.destroy();
            console.log('markText destroy',markText);
            this.markText.delete(name);
        }
        scene.add.circle(x, y, 48, 0x000000, 0.6).setOrigin(0, 0);
    }

    setMark(scene: Phaser.Scene, x: number, y: number, name: string, index: number): void {
        if(this.Mark[index]){
            this.Mark[index].destroy();
        }       
        const markBg = this.markCircle.get(name);
        if (markBg) {
            markBg.destroy();
            console.log('markBG deselected',markBg);
            this.markCircle.delete(name);
        }

        const markText = this.markText.get(name);
        if (markText) {
            markText.destroy();
            console.log('markText destroy',markText);
            this.markText.delete(name);
        }


        const bg = scene.add.circle(x + 104, y, 16, 0xD35E24).setOrigin(1, 0);
        const amount = (this.boosterJSON as any)[name]?.amount ?? undefined;
        const mark = scene.add.text(x + 88, y + 2, amount).setOrigin(0.5, 0);
        this.Mark[index] = mark;
        this.markCircle.set(name, bg);
        this.markText.set(name, mark);

        this.initFontStyle();
    }
    
    initFontStyle() {
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
        console.log('deselect')

        this.Mark.forEach((text) => {
            text.setStyle({
                fontFamily: 'Jua',
                fontWeight: 400,
                fontSize: '20px',
                color: '#57453B',
            }).setStroke('#ffffff', 6);
        });
    }
    
}

    