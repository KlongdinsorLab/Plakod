import Phaser from 'phaser'

import GameScene from './scene/GameScene'
import TitleScene from './scene/TitleScene'
import StartLoginScene from 'scene/auth/StartLoginScene'

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
import ConfirmScene from 'scene/auth/ConfirmScene'
import DifficultyScene from './scene/level/DifficultyScene'
import AirflowScene from './scene/level/AirflowScene'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from './config'
import { initializeApp } from 'firebase/app'
import { FIREBASE_API_KEY, FIREBASE_PROJECT_ID } from './config'

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
	projectId: FIREBASE_PROJECT_ID,
}

initializeApp(firebaseConfig)

import BossScene from 'scene/boss/BossScene'
import BossCutSceneVS from 'scene/boss/bossCutScene/BossCutSceneVS'
import BossItemTutorial from 'scene/boss/bossTutorial/BossItemTutorial'
import BossCutSceneEscape from 'scene/boss/bossCutScene/BossCutSceneEscape'
import BossCutSceneEscape2 from 'scene/boss/bossCutScene/BossCutSceneEscape2'
import RedeemScene from 'scene/booster/RedeemScene'
import RankingScene from 'scene/submenu/RankingScene'
import HomeScene from 'scene/HomeScene'
import RandomBossCutScene from 'scene/cutscene/RandomBossCutscene'
import Cutscene1 from 'scene/cutscene/Cutscene1'
import Cutscene2 from 'scene/cutscene/Cutscene2'
import SettingScene from 'scene/submenu/SettingScene'
import LifeCountScene from 'scene/LifeCountScene'
import DisplayNameScene from 'scene/DisplayNameScene'
import MyBagScene from 'scene/submenu/MyBagScene'

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
		StartLoginScene,
		LoginScene,
		HomeScene,
		OtpScene,
		RegisterScene,
		ConfirmScene,
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
		BossCutSceneVS,
		BossCutSceneEscape,
		BossCutSceneEscape2,
		PauseScene,
		RedeemScene,
		RankingScene,
		SettingScene,
		LifeCountScene,
		DisplayNameScene,
		MyBagScene,
	],
}

export default new Phaser.Game(config)
