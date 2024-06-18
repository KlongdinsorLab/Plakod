//todo: booster
import Phaser from "phaser";

// Abstract Booster class
export abstract class Booster {
    protected scene: Phaser.Scene;
    protected name: string;

    protected constructor(scene: Phaser.Scene, name: string) {
        this.scene = scene;
        this.name = name;
    }

    abstract setState(): void
    abstract applyBooster(): void;
    abstract getBody(): Phaser.GameObjects.Image;

    
}
