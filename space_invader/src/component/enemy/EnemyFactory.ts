import Player from 'component/player/Player'
import Score from 'component/ui/Score'
import { Enemy } from './Enemy'

export abstract class EnemyFactory {
	abstract create(
		scene: Phaser.Scene,
		player: Player,
		score: Score,
		soundEffect:
			| Phaser.Sound.NoAudioSound
			| Phaser.Sound.WebAudioSound
			| Phaser.Sound.HTML5AudioSound,
	): Enemy
}
