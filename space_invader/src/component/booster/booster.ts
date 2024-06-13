//todo: booster
import Phaser from "phaser";

// Abstract Booster class
export abstract class Booster {
    protected scene: Phaser.Scene;
    protected name: string;

    constructor(scene: Phaser.Scene, name: string) {
        this.scene = scene;
        this.name = name;
    }

    // Abstract method to apply booster 
    abstract applyBooster(): void;
    
}
