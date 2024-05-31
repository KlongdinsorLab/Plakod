import Player from 'component/player/Player'
import { Boss } from './Boss'

export abstract class BossSkill{
    protected skill!: Phaser.Types.Physics.Arcade.ImageWithDynamicBody | any
	protected scene: Phaser.Scene
    protected boss: Boss
	protected player: Player
	protected isActive!: boolean
	protected isTutorial = false
	protected skillTimer = 0

	protected constructor(
		scene: Phaser.Scene,
        boss: Boss,
		player: Player
	) {
        this.scene = scene
        this.boss = boss
		this.player = player
		this.isActive = false
    }

	abstract start(): void
	abstract activate(delta: number): void
	abstract attack(): void
	abstract applySkill(laser: Phaser.Types.Physics.Arcade.ImageWithDynamicBody): void
	abstract move(): void
	abstract setMovePath(path: Phaser.Curves.Path): void
	abstract setActive(isActive: boolean): void
	abstract getIsActive(): boolean
	// TODO Fix any
	abstract getBody(): Phaser.Types.Physics.Arcade.ImageWithDynamicBody | any
}
