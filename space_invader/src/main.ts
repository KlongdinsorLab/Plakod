import Phaser from 'phaser'

import GameScene from './scene/GameScene'
import TitleScene from './scene/TitleScene'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './config'
import TutorialCharacterScene from './scene/tutorial/TutorialCharacter'
import TutorialHudScene from './scene/tutorial/TutorialHudScene'
import TutorialControllerScene from './scene/tutorial/TutorialControllerScene'
import PauseScene from './scene/PauseScene'
import WarmupScene from './scene/warmup/WarmupScene'
import WarmupGaugeScene from 'scene/warmup/WarmupGaugeScene'
import SetupScene from './scene/setup/SetupScene'
import EndGameScene from './scene/EndGameScene'
import LoginScene from './scene/auth/LoginScene'
import OtpScene from './scene/auth/OtpScene'
import RegisterScene from './scene/auth/RegisterScene'
import DifficultyScene from './scene/level/DifficultyScene'
import AirflowScene from './scene/level/AirflowScene'
import BossScene from 'scene/boss/BossScene'
import BossCutSceneVS from 'scene/boss/bossCutScene/BossCutSceneVS'
import BossItemTutorial from 'scene/boss/bossTutorial/BossItemTutorial'
import BossTutorialPhase1 from 'scene/boss/bossTutorial/BossTutorialPhase1'
import BossTutorialPhase2 from 'scene/boss/bossTutorial/BossTutorialPhase2'
import BossCutSceneEscape from 'scene/boss/bossCutScene/BossCutSceneEscape'
import BossCutSceneEscape2 from 'scene/boss/bossCutScene/BossCutSceneEscape2'
import RankingScene from 'scene/submenu/RankingScene'
import HomeScene from 'scene/HomeScene'
import RandomBossCutScene from 'scene/cutscene/RandomBossCutscene'
import Cutscene1 from 'scene/cutscene/Cutscene1'
import Cutscene2 from 'scene/cutscene/Cutscene2'
import SettingScene from 'scene/submenu/SettingScene'

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	parent: 'app',
	width: SCREEN_WIDTH,
	height: SCREEN_HEIGHT,
	input: {
		gamepad: true,
	},
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
	},
	physics: {
		default: 'arcade',
		arcade: {},
	},
	dom: {
		createContainer: true,
	},
	scene: [
		TitleScene,
		LoginScene,
		HomeScene,
		OtpScene,
		RegisterScene,
		DifficultyScene,
		AirflowScene,
		SetupScene,
		GameScene,
		EndGameScene,
		Cutscene1,
		Cutscene2,
		RandomBossCutScene,
		TutorialCharacterScene,
		TutorialHudScene,
		TutorialControllerScene,
		WarmupGaugeScene,
		WarmupScene,
		BossScene,
		BossItemTutorial,
		BossTutorialPhase1,
		BossTutorialPhase2,
		BossCutSceneVS,
		BossCutSceneEscape,
		BossCutSceneEscape2,
		PauseScene,
		RankingScene,
		SettingScene,
	],
}

export default new Phaser.Game(config)
