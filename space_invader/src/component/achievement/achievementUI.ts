export class AchievementUI {
    private scene: Phaser.Scene
    private achievementId!: number
    private position!: {x: number, y: number}
    private achievementSize!: {width : number, height : number}
    private isLocked!: boolean

    private achievementImage!: Phaser.GameObjects.Image
    private lockedImage!: Phaser.GameObjects.Image
    
    constructor(
        scene: Phaser.Scene,
        id: number,
        options?: {
            x?: number,
            y?: number,
            width?: number,
            height?: number,
            isLocked?: boolean,
        }
    ){
        this.scene = scene
        this.achievementId = id
        this.position = {
            x: options?.x ?? -1,
            y: options?.y ?? -1
        }
        this.achievementSize = {
            width: options?.width ?? 96,
            height: options?.height ?? 96
        }
        this.isLocked = options?.isLocked ?? false
    }
    getBody():Phaser.GameObjects.Image{
        return this.achievementImage
    }
    getPosition():{x: number, y: number}{
        return this.position
    }
    getId():number{
        return this.achievementId
    }
    create():void{
        this.achievementImage = this.scene.add.image(
            this.position.x, 
            this.position.y,
            'achievement',
            'achievement'+this.achievementId+'.png'
        )
        this.achievementImage.setDisplaySize(this.achievementSize.width, this.achievementSize.height)
        this.achievementImage.setOrigin(0)
        if(this.isLocked){
            this.setLockedAchievement()
        }
    }
    setLockedAchievement():void{
        this.lockedImage = this.scene.add.image(
            this.position.x, 
            this.position.y,
            'achievement',
            'achievement'+this.achievementId+'.png'
        )
        this.lockedImage.setDisplaySize(this.achievementSize.width, this.achievementSize.height)
        this.lockedImage.setOrigin(0)
        .setTint(0x000000)
        .setAlpha(0.5)
    }
    show():void{
        this.achievementImage.setVisible(true)
        this.lockedImage?.setVisible(true)
    }
    hide():void{
        this.achievementImage.setVisible(false)
        this.lockedImage?.setVisible(false)
    }
    destroy():void{
        this.achievementImage?.destroy()
        this.lockedImage?.destroy()
    }
}