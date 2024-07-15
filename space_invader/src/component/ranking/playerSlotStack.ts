import Phaser from "phaser";
import { PlayerSlot } from "./playerSlot";
import { AccumulationType } from "scene/submenu/RankingScene";

export class PlayerSlotStack{
    private scene: Phaser.Scene;
    private playerData: { id: string,name: string, score: number, played: number }[]
    private accumulationType: AccumulationType;
    private startPosition: {x:number, y:number};
    private gapHeight: number = 16;
    private slotHeight: number = 88;
    private currentPlayer!: { 
        id: string,
        name: string, 
        score: number, 
        played: number 
    }
    private playerSlots: PlayerSlot[] = [];
    private currentPlayerSlot?: PlayerSlot
    private index: number = 0;
    private rank: number = 0;
    private slotNumber: number = 0;
    private maxPlayerSlot: number;
    private playerRankScore?: number;
    private playerRankHeart?: number;

    constructor(
        scene:Phaser.Scene, 
        playerData: { id: string,name: string, score: number, played: number }[],
        currentPlayer: { id: string,name: string, score: number, played: number },
        accumulationType: AccumulationType,
        startPosition: {x:number, y:number},
        index: number,
        maxPlayerSlot: number,
        playerRankScore?: number,
        playerRankHeart?: number,
    ){
        this.scene = scene;
        this.playerData = playerData;
        this.accumulationType = accumulationType;
        this.index = index;
        this.currentPlayer = currentPlayer;
        this.startPosition = startPosition;
        this.maxPlayerSlot = maxPlayerSlot;
        this.playerRankScore = playerRankScore?? -1
        this.playerRankHeart = playerRankHeart?? -1
    }
    createPlayerSlot(){
        this.slotNumber = 0;
        for (let i = this.index; i < this.index+this.maxPlayerSlot; i++) {
            this.rank++;
            if(i >= this.playerData.length){
                break;
            }
            let stat;
            if(this.accumulationType === AccumulationType.ACCUMULATION_SCORE){
                stat = this.playerData[i].score;
            }else{
                stat = this.playerData[i].played;
            }
            this.playerSlots.push(
                new PlayerSlot(
                    this.scene, 
                    this.playerData[i].name, 
                    this.rank, 
                    stat, 
                    this.accumulationType, 
                    {x: this.startPosition.x+24, y: this.startPosition.y+24+this.slotHeight*this.slotNumber+this.gapHeight*this.slotNumber},
                    this.currentPlayer.id === this.playerData[i].id
                )
            )
            this.slotNumber++;
        }    
    }
    createCurrentPlayerSlot():void{
        let playerStat;
        let playerRank = 0;
        if(this.accumulationType === AccumulationType.ACCUMULATION_SCORE){
            playerStat = this.currentPlayer.score
            playerRank = this.playerRankScore!
        }else{
            playerStat = this.currentPlayer.played
            playerRank = this.playerRankHeart!
        }
        this.currentPlayerSlot = new PlayerSlot(
            this.scene, 
            this.currentPlayer.name, 
            playerRank, 
            playerStat, 
            this.accumulationType, 
            {x: 48, y: 1024},
            false,
            true
        )
        this.currentPlayerSlot.create()
        console.log('currentPlayerSlot is created')
    }
    nextPage(){
        this.index += this.maxPlayerSlot;
        //this.rank += this.maxPlayerSlot;
        this.playerSlots.forEach(playerSlot => { playerSlot.destroy()});
        this.playerSlots.length = 0;
        this.createPlayerSlot();
    }
    previousPage(){
        if(this.index <= 0) return;
        this.index -= this.maxPlayerSlot;
        this.rank -= this.maxPlayerSlot*2;
        this.playerSlots.forEach(playerSlot => { playerSlot.destroy()});
        this.playerSlots.length = 0;
        this.createPlayerSlot();
    }

    setCurrentPlayer(currentPlayer: { id: string,name: string, score: number, played: number }){
        this.currentPlayer = currentPlayer;
    }

    setPlayerData(playerData: { id: string,name: string, score: number, played: number }[]){
        this.playerData = playerData;
        if(this.index === 0){
            this.index = 20-(this.maxPlayerSlot);
        }else{
            this.index = 0;
        }
        this.playerSlots.forEach(playerSlot => { playerSlot.destroy()});
        this.playerSlots.length = 0;
        this.createPlayerSlot();
    }

    setRank(rank: number){
        this.rank = rank;
    }

    setAccumulationType(accumulationType: AccumulationType){
        this.accumulationType = accumulationType;
    }

    clearSlot(){
        this.index = 0
        this.rank = 0;
        this.playerSlots.forEach(playerSlot => { playerSlot.destroy()});
        this.playerSlots.length = 0;
    }

    initFontStyle(){
        this.playerSlots?.forEach(playerSlot => {
            playerSlot?.initFontStyle();
        })
        this.currentPlayerSlot?.initFontStyle()
    }

    destroy(): void{
        this.playerSlots.forEach(playerSlot => { playerSlot.destroy()});
        this.currentPlayerSlot?.destroy()
        this.playerSlots.length = 0;
    }

}