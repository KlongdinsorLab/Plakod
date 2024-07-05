import { Booster, BoosterName } from "../booster";
import Player from "component/player/Player";

export class Booster1 extends Booster {
    private isActivated: boolean = false;
    private remainingUses: number;
    private player!: Player;
    private isCompleteBossPhase: boolean = false;
    constructor(player: Player) {
        super(BoosterName.BOOSTER_1);
        this.remainingUses = 4;
        this.player = player;
    }
    applyBooster():void{
        if(this.isCompleteBossPhase){
            this.player.deactivateShield();
            return
        }
        if(this.remainingUses === 4){
            this.isActivated = true;
            this.remainingUses--;
            this.player.activateShield();
        }
        else if(this.remainingUses > 0){
            this.remainingUses--;
            this.player.activateShield();
            //this.player.isHitShield();
        }
        else if(this.remainingUses === 0){
            this.remainingUses--;
            this.player.deactivateShield();
        }
    }
    setIsCompleteBossPhase(isCompleteBossPhase: boolean):void{
        this.isCompleteBossPhase = isCompleteBossPhase;
        if(this.isCompleteBossPhase){
            this.applyBooster()
        }
    }
    setPlayer(player: Player):void{
        this.player = player;
    }
    getRemainingUses():number{
        return this.remainingUses;
    }
    getIsActivated():boolean{
        return this.isActivated;
    }   
}
