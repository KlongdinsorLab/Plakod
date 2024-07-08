import TimeService from "services/timeService";
import { BoosterName } from "./booster";

export enum States{
    PERMANENT,
    LIMITED_TIME,
    UNAVAILABLE
}

export class BoosterUI {
    private scene: Phaser.Scene;
    private name: BoosterName;
    private boosterSize! : {width : number, height : number}
    private boosterImage!: Phaser.GameObjects.Image
    private position!: {x : number, y : number}
    private state: States = States.UNAVAILABLE;
    private amount:number| undefined;
    private frame!:string;
    private expireDate: Date| undefined;
    private expireArray: string[]= [];
    private markCircle! :Phaser.GameObjects.Arc;
    private markText! :Phaser.GameObjects.Text;
    private unavailableCircle! : Phaser.GameObjects.Arc;

    private onSetUnavailableCallback?: () => void;

    private timeService = new TimeService();
    //private startTime: Date = new Date(Date.now());
    private timeText!: string;
    private countdownIndex : number = 0;
    private countdownTime!: Phaser.GameObjects.Text;
    private isCompleteInit: boolean = false;
    //private inGameBooster: boolean = false;
    //private remainingUses?: number;
    //private remainingTime?: number;
    //private remainingText!: Phaser.GameObjects.Text;

    constructor(
        scene: Phaser.Scene, 
        name: BoosterName,
        options?:{
            x?:number, 
            y?:number, 
            width?: number,
            height?:number,
            amount?:number, 
            expireDate?:Date, 
            expireArray?:string[],
            canSelect?:boolean,
            inGameBooster?:boolean,
            remainingUses?:number,
            remainingTime?:number
        }
        ) {
        
        this.scene = scene;
        this.name = name;

        this.position = {
            x: options?.x ?? -1,
            y: options?.y ?? -1
        };
        this.boosterSize = {
            width: options?.width ?? 96,
            height: options?.height ?? 96
        };

        this.isCompleteInit = false;

        this.amount = options?.amount?? 0
        this.expireDate = options?.expireDate?? undefined
        this.expireArray = options?.expireArray?? []
        this.setState()

        //this.inGameBooster = options?.inGameBooster ?? false
        //this.remainingUses = options?.remainingUses ?? undefined
        //this.remainingTime = options?.remainingTime ?? undefined
    }
    create(): void{
        if(this.name === BoosterName.BOOSTER_1){
            this.frame = '1'
        }else if(this.name === BoosterName.BOOSTER_2){
            this.frame = '2'
        }else if(this.name === BoosterName.BOOSTER_3){
            this.frame = '3'
        }else if(this.name === BoosterName.BOOSTER_4){
            this.frame = '4'
        }else if(this.name === BoosterName.BOOSTER_5){
            this.frame = '5'
        }else if(this.name === BoosterName.BOOSTER_RARE1){
            this.frame = '_rare1'
        }else if(this.name === BoosterName.BOOSTER_RARE2){
            this.frame = '_rare2'
        }

        this.boosterImage = this.scene.add.image(
            this.position.x, 
            this.position.y, 
            'dropItem',
            'booster'+this.frame+'.png',
        )
        .setOrigin(0,0).setSize(this.boosterSize.width, this.boosterSize.height)
        
    }

    setState(): void{
        if(this.expireDate || this.expireArray){
            this.state = States.LIMITED_TIME
            if(this.countdownIndex > this.expireArray.length-1){
                this.state = States.PERMANENT
                this.isCompleteInit = true
            }
            if(this.amount == 0){
                this.state = States.UNAVAILABLE
            }
            
        }else if(this.amount && this.amount>0){
            this.state = States.PERMANENT
            this.isCompleteInit = true
        }
    
    }

    initBooster(): void{
        if(this.state === States.PERMANENT){
            this.setAmount()
        }else if(this.state === States.LIMITED_TIME){
            if(this.expireDate){

            }else if(this.expireArray){
                this.setAmount()
                this.setTimer()
            }
        }else{
            this.setUnavailable()
        }
    }

    setAmount(){
        if (this.markText) {
            this.markText.setText(this.amount!.toString())
        }else{
            this.markCircle = this.scene.add.circle(this.position.x + 104, this.position.y, 16, 0xD35E24).setOrigin(1, 0);
            this.markText = this.scene.add.text(this.position.x + 88, this.position.y + 2, this.amount!.toString()).setOrigin(0.5, 0);
            this.initFontStyle()
        }
    }

    setTimer(): void {
        const expire = this.expireArray[this.countdownIndex];
        let dateObject: Date = new Date(expire);

        this.countdownTime = this.scene.add.text(this.position.x, this.position.y + 104, '', { fontSize: '20px', color: '#111111' }).setOrigin(0, 0);
        this.initFontStyle()

        const timerEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                const timeCount = this.timeService.getDurationTime(dateObject);
                if (timeCount === 'timeout') {
                    //console.log('timeout',this.name);
                    this.countdownIndex++;
                    this.amount!--;

                    if (this.countdownTime.active) {
                        this.countdownTime.destroy()
                    }
                    this.isCompleteInit = false
                    this.setState()
                    this.initBooster();
                    timerEvent.remove();
                }else{
                    this.countdownTime.setText(timeCount);
                    this.timeText = timeCount;
                    this.isCompleteInit = true
                }
            },
            loop: true
        });
    }
    
    setUnavailable(): void {
        
        if (this.markCircle) {
            this.markCircle.destroy();

        }
        if (this.markText) {
            this.markText.destroy();
        }
        this.unavailableCircle = this.scene.add.circle(this.position.x, this.position.y, 48, 0x000000, 0.6).setOrigin(0, 0);
        this.isCompleteInit = true

        if (this.onSetUnavailableCallback) {
            this.onSetUnavailableCallback();
        }
    }

    onSetUnavailable(callback: () => void): void {
        this.onSetUnavailableCallback = callback;
    }


    
    getBody(): Phaser.GameObjects.Image{
        return  this.boosterImage
    }

    getTimeText(): string{
        return this.timeText
    }

    getAmount():number{
        return this.amount!
    }

    getName():BoosterName{
        return this.name
    }

    getState():States{
        return this.state;
    }

    getPosition():{x:number, y:number}{
        return this.position
    }

    getIsCompleteInit():boolean{
        return this.isCompleteInit
    }

    getFrame():string{
        return this.frame
    }

    setBoosterWidth(width:number): void{
        this.boosterSize.width = width
    }
    setBoosterHeight(height:number): void{
        this.boosterSize.height = height
    }

    destroy():void{
        this.boosterImage.destroy()
        this.markCircle?.destroy()
        this.markText?.destroy()
        this.countdownTime?.destroy()
        this.unavailableCircle?.destroy()

    }

    initFontStyle(): void{
        if(this.markText){
            this.markText.setStyle({
                fontFamily: 'Jua',
                fontWeight: 400,
                fontSize: '20px',
                color: '#57453B',
            }).setStroke('#ffffff', 6);
        }
        
        if(this.countdownTime){
            this.countdownTime.setStyle({
                fontFamily: 'Jua',
                fontWeight: 400,
                fontSize: '20px',
                color: '#57453B',
            }).setStroke('#ffffff', 6);
        }
    }

}