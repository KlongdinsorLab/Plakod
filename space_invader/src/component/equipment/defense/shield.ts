import { booster2 } from "scene/boss/BossScene";
import { Equipment } from "../equipment";
export default class Shield extends Equipment{
	private scene: Phaser.Scene
	private shield!: Phaser.GameObjects.Image
    private timeEvent!: Phaser.Time.TimerEvent;

	constructor(scene: Phaser.Scene, player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody) {
        super('shield')
		this.scene = scene
		this.shield = this.scene.add.image(player.x, player.y, 'dropItem', 'mc_shield.png')
		this.shield.setOrigin(0.5, 0.5)
		//this.shield.setDepth(player.depth - 1) // Ensure shield is behind the player
		this.shield.setVisible(false)
	}
    countDownShield(): void{
        this.activate()
        this.timeEvent = this.scene.time.addEvent({
            delay: 1000,
            callback: () => {
                booster2.decreaseRemainingTime()
                if(booster2.getRemainingTime() === 0 || booster2.getIsCompleteBossPhase()){
                    this.timeEvent.remove();
                    this.deactivate()
                }
            },
            loop: true
        })
    }

	activate(): void {
		this.shield.setVisible(true)
	}

	deactivate(): void {
        if(this.timeEvent){
            this.timeEvent.remove();
        }
		this.shield.setVisible(false)
	}

    isHit():void{
        let count = 0;
        const timeEvent = this.scene.time.addEvent({
            delay: 500,
            callback: () => {
                count++;
                if(count === 5){
                    this.activate()
                    timeEvent.remove();
                }else if(count % 2 === 0){
                    this.activate()
                }else{
                    this.deactivate()
                }
            },
            loop: true
        })
    }

	updatePosition(player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody): void {
		this.shield.setPosition(player.x, player.y)
	}

	destroy(): void {
		this.shield.destroy()
	}
}
