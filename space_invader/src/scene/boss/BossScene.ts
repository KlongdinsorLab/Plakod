import { Boss, BossCutScene, BossName, BossState, BossStateName } from "component/enemy/boss/Boss";
import Player from "component/player/Player";
import { BossByName, BossInterface } from "./bossInterface";
import Score from "component/ui/Score";
import { BossVersion } from "component/enemy/boss/BossVersion";
import Menu from "component/ui/Menu";

export default class BossScene extends Phaser.Scene {
    private playerX !: number
    private player !: Player
    private lap !: number
    private bossName !: BossName
    private state !: BossState
    private boss !: Boss
    private bossVersion!: BossVersion
    private props !: BossInterface
    private scoreObj !: Score
    private scoreNum !: number
    private bossLayer !: Phaser.GameObjects.Layer
    private isGameplayLaunched !: boolean
    private runningScenes !: string[]

    constructor(){
        super('bossMaster')
    }

    preload(){
        this.load.atlas(
			'ui',
			'assets/ui/asset_warmup.png',
			'assets/ui/asset_warmup.json',
		)

        this.load.atlas(
			'player',
			'assets/character/player/mc1_spritesheet.png',
			'assets/character/player/mc1_spritesheet.json',
		)

        this.load.atlas(
			'b1v1',
			'assets/character/enemy/b1v1_spritesheet.png',
			'assets/character/enemy/b1v1_spritesheet.json',
		)

		this.load.atlas(
			'b1v2',
			'assets/character/enemy/b1v2_spritesheet.png',
			'assets/character/enemy/b1v2_spritesheet.json',
		)
    }

    init({ bossName, lap, playerX, player, score } : 
        { bossName: BossName, lap : number, playerX : number, player : Player, score : number}){

        this.bossName = bossName ?? 'B1'
        this.lap = lap ?? 6
        this.playerX = playerX ?? 360
        this.player = player
        this.scoreNum = score ?? 0
    }

    create(){
        this.bossLayer = this.add.layer()

        console.log(this.bossLayer.depth)

        // TODO: Fix to obtain from Game Scene
		this.player = new Player(this, this.bossLayer)
		this.player.getBody().setX(this.playerX)
		this.player.addChargeParticle()

        

        // TODO: Fix to obtain from Game Scene
        this.scoreObj = new Score(this)
		this.scoreObj.setScore(this.scoreNum)

        this.hidePlayer()
        this.hideUI()

        this.boss = new BossByName[this.bossName ?? 'B1'](
			this,
			this.player,
			this.scoreObj,
			this.lap,
		)
		this.bossVersion = this.boss.getVersion()

        this.runningScenes = []
        this.runningScenes.push(BossCutScene.VS)
        new Menu(this,this.runningScenes)
        
        this.state = new BossState(BossStateName.CUTSCENEVS)
        

        this.props = {
            name : this.bossName,
            bossVersion : this.bossVersion,
            boss : this.boss,
            score : this.scoreNum,
            playerX : this.playerX,
            reloadCount : this.lap,
            player : this.player,
            state : this.state,
            scoreObj : this.scoreObj,
        }

        this.scene.launch(BossCutScene.VS, this.props)

        /*setTimeout(() => {
			this.state.setState(BossStateName.GAMEPLAY)
            this.scene.launch('bossScene', this.props)
            this.showPlayer()
            this.showUI()
		}, 3000)*/
    }

    update(){
        if(this.state.getState() === BossStateName.GAMEPLAY && !this.isGameplayLaunched) {
            this.isGameplayLaunched = true
            this.scene.launch('bossScene', this.props)

            this.runningScenes.length = 0
            this.runningScenes.push('bossScene')
            
            this.showPlayer()
            this.showUI()
        }

    }

    hideUI() : void {
        this.scoreObj.hide()
    }

    hidePlayer(): void {
        this.player.hide()
    }

    showUI() : void {
        this.scoreObj.show()
    }

    showPlayer(): void {
        this.player.show()
    }
}