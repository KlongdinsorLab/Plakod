import { Booster, BoosterName } from "../booster";
import Player from "component/player/Player";

export  class Booster2 extends Booster {
    private isUsed: boolean = false;
    private remainingTime: number;
    private player!: Player;
    private isCompleteBossPhase: boolean = false;
    private isActivated: boolean = false;

    constructor(player: Player) {
        super(BoosterName.BOOSTER_2);
        this.remainingTime = 15;
        this.player = player;
    }
    applyBooster():void{
        if(!this.isUsed && this.remainingTime > 0 && !this.isCompleteBossPhase){
            this.isUsed = true;
            this.isActivated = true;
            this.player.activateShield(this.remainingTime);
        }
        if(this.isCompleteBossPhase){
            this.isUsed = false;
            this.player.deactivateShield();
        }
    }
    setPlayer(player: Player):void{
        this.player = player;
    }
    getIsActivated():boolean{
        return this.isActivated;
    }
    setRemainingTime(remainingTime: number):void{
        this.remainingTime = remainingTime;
    }
    decreaseRemainingTime():void{
        this.remainingTime--;
    }
    getRemainingTime():number{
        return this.remainingTime;
    }
    getIsUsed():boolean{
        return this.isUsed; 
    }
    setIsCompleteBossPhase(isCompleteBossPhase: boolean):void{
        this.isCompleteBossPhase = isCompleteBossPhase;
        this.applyBooster()
    }
    getIsCompleteBossPhase():boolean{
        return this.isCompleteBossPhase;
    }

}