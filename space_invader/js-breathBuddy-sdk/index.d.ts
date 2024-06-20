import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';
export const connectorConfig: ConnectorConfig;

export type TimestampString = string;

export type UUIDString = string;

export type Int64String = string;

export type DateString = string;


export interface Achievement_Key {
  id: string;
  __typename?: 'Achievement_Key';
}

export interface Booster_Key {
  id: string;
  __typename?: 'Booster_Key';
}

export interface Character_Key {
  id: string;
  __typename?: 'Character_Key';
}

export interface CreatePlayerResponse {
  player_insert: Player_Key;
}

export interface CreatePlayerVariables {
  id?: string | null;
  tel?: string | null;
}

export interface Difficulty_Key {
  id: string;
  __typename?: 'Difficulty_Key';
}

export interface GameSession_Key {
  id: string;
  playerIdId: string;
  difficultIdId: string;
  __typename?: 'GameSession_Key';
}

export interface Level_Key {
  id: string;
  __typename?: 'Level_Key';
}

export interface ListPlayersResponse {
  players: ({
    id: string;
    tel: string;
    username?: string | null;
    gender?: string | null;
    birthYear?: number | null;
    airflow?: number | null;
    totalScore: number;
    lastPlayedAt: DateString;
    usingCharacterId?: string | null;
  } & Player_Key)[];
}

export interface PlayerAchievement_Key {
  playerIdId: string;
  achievementIdId: string;
  __typename?: 'PlayerAchievement_Key';
}

export interface PlayerBooster_Key {
  playerIdId: string;
  boosterIdId: string;
  __typename?: 'PlayerBooster_Key';
}

export interface PlayerCharacter_Key {
  playerIdId: string;
  characterIdId: string;
  __typename?: 'PlayerCharacter_Key';
}

export interface Player_Key {
  id: string;
  __typename?: 'Player_Key';
}

export interface Vas_Key {
  id: string;
  playerIdId: string;
  __typename?: 'Vas_Key';
}



/* Allow users to create refs without passing in DataConnect */
export function createPlayerRef(vars?: CreatePlayerVariables): MutationRef<CreatePlayerResponse, CreatePlayerVariables>;
/* Allow users to pass in custom DataConnect instances */
export function createPlayerRef(dc: DataConnect, vars?: CreatePlayerVariables): MutationRef<CreatePlayerResponse,CreatePlayerVariables>;

export function createPlayer(vars?: CreatePlayerVariables): MutationPromise<CreatePlayerResponse, CreatePlayerVariables>;
export function createPlayer(dc: DataConnect, vars?: CreatePlayerVariables): MutationPromise<CreatePlayerResponse,CreatePlayerVariables>;


/* Allow users to create refs without passing in DataConnect */
export function listPlayersRef(): QueryRef<ListPlayersResponse, undefined>;/* Allow users to pass in custom DataConnect instances */
export function listPlayersRef(dc: DataConnect): QueryRef<ListPlayersResponse,undefined>;

export function listPlayers(): QueryPromise<ListPlayersResponse, undefined>;
export function listPlayers(dc: DataConnect): QueryPromise<ListPlayersResponse,undefined>;


