import { getRemoteConfig, getValue, fetchAndActivate } from 'firebase/remote-config'
import { PlayerByName } from 'component/player/playerInterface'
import { initializeApp } from 'firebase/app'

const env = import.meta.env
export const FIREBASE_API_KEY = env.VITE_FIREBASE_API_KEY
export const FIREBASE_PROJECT_ID = env.VITE_FIREBASE_PROJECT_ID
export const FIREBASE_APP_ID = env.VITE_FIREBASE_APP_ID
export const VITE_URL_PATH = env.VITE_URL_PATH

const firebaseConfig = {
	apiKey: FIREBASE_API_KEY,
	authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
	projectId: FIREBASE_PROJECT_ID,
	appId: FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig)
const remoteConfig = getRemoteConfig(app)

// For development only
remoteConfig.settings.minimumFetchIntervalMillis = 15000

await fetchAndActivate(remoteConfig)

export const SCREEN_WIDTH = getValue(remoteConfig, 'screen_width').asNumber()
export const SCREEN_HEIGHT = getValue(remoteConfig, 'screen_height').asNumber()
export const MARGIN = getValue(remoteConfig, 'margin').asNumber()
export const BACK_BUTTON_HITBOX_WIDTH = getValue(remoteConfig, 'back_button_hitbox_width').asNumber()
export const PLAYER_START_MARGIN = getValue(remoteConfig, 'player_start_margin').asNumber()
export const PLAYER_SPEED = getValue(remoteConfig, 'player_speed').asNumber()
export const LASER_SPEED = getValue(remoteConfig, 'laser_speed').asNumber()
export const TRIPLE_LASER_X_SPEED = getValue(remoteConfig, 'triple_laser_x_speed').asNumber()
export const LASER_FREQUENCY_MS = getValue(remoteConfig, 'laser_frequency_ms').asNumber()
export const BULLET_COUNT = getValue(remoteConfig, 'bullet_count').asNumber()
export const BOSS_HIT_SCORE = getValue(remoteConfig, 'boss_hit_score').asNumber()
export const BOSS_PHASE1_BULLET_COUNT = getValue(remoteConfig, 'boss_phase1_bullet_count').asNumber()
export const BOSSV1_PHASE2_BULLET_COUNT = getValue(remoteConfig, 'bossv1_phase2_bullet_count').asNumber()
export const BOSSV2_PHASE2_BULLET_COUNT = getValue(remoteConfig, 'bossv2_phase2_bullet_count').asNumber()
export const RELOAD_COUNT = getValue(remoteConfig, 'reload_count').asNumber()
export const BOSS_MULTIPLE_COUNT = getValue(remoteConfig, 'boss_multiple_count').asNumber()
export const BOSS_TIME_MS = getValue(remoteConfig, 'boss_time_ms').asNumber()
export const BOSS_CUTSCENE_DELAY_MS = getValue(remoteConfig, 'boss_cutscene_delay_ms').asNumber()
export const BOSS_TUTORIAL_DELAY_MS = getValue(remoteConfig, 'boss_tutorial_delay_ms').asNumber()
export const PHASE_1_BOSS_TIME_MS = getValue(remoteConfig, 'phase_1_boss_time_ms').asNumber()
export const PHASE_2_BOSS_TIME_MS = getValue(remoteConfig, 'phase_2_boss_time_ms').asNumber()
export const COLLECT_BULLET_COUNT = getValue(remoteConfig, 'collect_bullet_count').asNumber()

export const BOSS2_SKILL_SCORE_REDUCTION = getValue(remoteConfig, 'boss2_skill_score_reduction').asNumber()

export const BOSS3_SKILL_SPEED = getValue(remoteConfig, 'boss3_skill_speed').asNumber()
export const BOSS3_PHASE1_SKILL_ANGLE = getValue(remoteConfig, 'boss3_phase1_skill_angle').asNumber()
export const BOSS3_PHASE2_SKILL_ANGLE = getValue(remoteConfig, 'boss3_phase2_skill_angle').asNumber()
export const BOSS3_SKILL_GAP = getValue(remoteConfig, 'boss3_skill_gap').asNumber()

export const BOSS4_DOUBLE_CRESCENT_ANGLE = getValue(remoteConfig, 'boss4_double_crescent_angle').asNumber()
export const BOSS4_CRESCENT_SCALE_DURATION = getValue(remoteConfig, 'boss4_crescent_scale_duration').asNumber()
export const BOSS4_CRESCENT_VELOCITY_Y = getValue(remoteConfig, 'boss4_crescent_velocity_y').asNumber()
export const BOSS4_DOUBLE_CRESCENT_VELOCITY_X = getValue(remoteConfig, 'boss4_double_crescent_velocity_x').asNumber()
export const BOSS4_CRESCENT_SCORE_REDUCTION = getValue(remoteConfig, 'boss4_crescent_score_reduction').asNumber()

export const BOSS_HIT_DELAY_MS = getValue(remoteConfig, 'boss_hit_delay_ms').asNumber()
export const HOLD_DURATION_MS = getValue(remoteConfig, 'hold_duration_ms').asNumber()
export const HOLD_BAR_HEIGHT = getValue(remoteConfig, 'hold_bar_height').asNumber()
export const HOLD_BAR_BORDER = getValue(remoteConfig, 'hold_bar_border').asNumber()
export const HOLD_BAR_COLOR = 0x9966ff
export const HOLD_BAR_IDLE_COLOR = 0x603f8b
export const HOLD_BAR_CHARGING_COLOR = 0xefc53f
export const HOLD_BAR_CHARGED_COLOR = 0x00b1b0
export const HOLD_BAR_EMPTY_COLOR = 0xff8370
export const MODAL_BACKGROUND_COLOR = 0xfff6e5
export const HOLDBAR_REDUCING_RATIO = getValue(remoteConfig, 'holdbar_reducing_ratio').asNumber()
export const CIRCLE_GAUGE_MARGIN = getValue(remoteConfig, 'circle_gauge_margin').asNumber()
export const CIRCLE_GAUGE_RADIUS = getValue(remoteConfig, 'circle_gauge_radius').asNumber()
export const CIRCLE_OVER_GAUGE_RADIUS = getValue(remoteConfig, 'circle_over_gauge_radius').asNumber()
export const CIRCLE_GAUGE_SHAKE_X = getValue(remoteConfig, 'circle_gauge_shake_x').asNumber()
export const SPACE_BETWEEN_MARGIN_SCALE = getValue(remoteConfig, 'space_between_margin_scale').asNumber()
export const FULLCHARGE_SCALE = getValue(remoteConfig, 'fullcharge_scale').asNumber()
export const FULLCHARGE_ANIMATION_MS = getValue(remoteConfig, 'fullcharge_animation_ms').asNumber()
export const METEOR_FREQUENCY_MS = getValue(remoteConfig, 'meteor_frequency_ms').asNumber()
export const METEOR_SPEED = getValue(remoteConfig, 'meteor_speed').asNumber()
export const METEOR_ITEMPHASE_SPEED = getValue(remoteConfig, 'meteor_itemphase_speed').asNumber()
export const METEOR_SPIN_SPEED = getValue(remoteConfig, 'meteor_spin_speed').asNumber()
export const PLAYER_HIT_DELAY_MS = getValue(remoteConfig, 'player_hit_delay_ms').asNumber()
export const HIT_METEOR_SCORE = getValue(remoteConfig, 'hit_meteor_score').asNumber()
export const DESTROY_METEOR_SCORE = getValue(remoteConfig, 'destroy_meteor_score').asNumber()
export const BULLET_FREQUENCY_MS = getValue(remoteConfig, 'bullet_frequency_ms').asNumber()
export const BULLET_SPEED = getValue(remoteConfig, 'bullet_speed').asNumber()
export const POISON_FREQUENCY_MS = getValue(remoteConfig, 'poison_frequency_ms').asNumber()
export const POISON_SPEED = getValue(remoteConfig, 'poison_speed').asNumber()
export const HIT_POISON_SCORE = getValue(remoteConfig, 'hit_poison_score').asNumber()
export const BOOSTER_FREQUENCY_MS = getValue(remoteConfig, 'booster_frequency_ms').asNumber()
export const MAX_SELECTED_BOOSTER = getValue(remoteConfig, 'max_selected_booster').asNumber()

export const GAME_TIME_LIMIT_MS = getValue(remoteConfig, 'game_time_limit_ms').asNumber()
export const TUTORIAL_DELAY_MS = getValue(remoteConfig, 'tutorial_delay_ms').asNumber()
export const WARM_UP_DELAY_MS = getValue(remoteConfig, 'warm_up_delay_ms').asNumber()
export const MEDIUM_FONT_SIZE = getValue(remoteConfig, 'medium_font_size').asString()
export const LARGE_FONT_SIZE = getValue(remoteConfig, 'large_font_size').asString()

export const DARK_BROWN = 0x57453b
export const DARK_PURPLE = 0x583e7c
export const DARK_ORANGE = 0xd35e24
export const GREEN = 0x05ff00

export const VAS_COUNT = getValue(remoteConfig, 'vas_count').asNumber()
export const MAX_PLAYED = getValue(remoteConfig, 'max_played').asNumber()
export const TOTAL_MC = getValue(remoteConfig, 'total_mc').asNumber()

export const INHALE_GAUGE_SECTIONS = getValue(remoteConfig, 'inhale_gauge_sections').asNumber()

export const ALL_CHARACTER: {
	characterId: number
	name: string
	detail: string
	mcName: keyof typeof PlayerByName
}[] = [
	{
		characterId: 1,
		name: 'นักผจญภัย',
		detail: '',
		mcName: 'mc1',
	},
	{
		characterId: 2,
		name: 'นักเวทย์',
		detail: '',
		mcName: 'mc2',
	},
	{
		characterId: 3,
		name: 'จอมโจร',
		detail: '',
		mcName: 'mc3',
	},
]

export type keyboardInput =
	| 'ONE'
	| 'TWO'
	| 'THREE'
	| 'FOUR'
	| 'LEFT'
	| 'RIGHT'
	| 'SPACE'

const keyboardOne: keyboardInput = 'ONE'
const keyboardTwo: keyboardInput = 'TWO'
const keyboardThree: keyboardInput = 'THREE'
const keyboardFour: keyboardInput = 'FOUR'
const keyboardCharge: keyboardInput = 'SPACE'
const keyboardLeft: keyboardInput = 'LEFT'
const keyboardRight: keyboardInput = 'RIGHT'

export const BUTTON_MAP = {
	'1': {
		controller: 'B6',
		keyboard: keyboardOne,
	},
	'2': {
		controller: 'B4',
		keyboard: keyboardTwo,
	},
	'3': {
		controller: 'B7',
		keyboard: keyboardThree,
	},
	'4': {
		controller: 'B5',
		keyboard: keyboardFour,
	},
	charge: {
		controller: 'B16',
		keyboard: keyboardCharge,
	},
	left: {
		controller: 'LEFT',
		keyboard: keyboardLeft,
	},
	right: {
		controller: 'RIGHT',
		keyboard: keyboardRight,
	},
}
