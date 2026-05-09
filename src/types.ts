
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Level {
  id: number;
  title: string;
  minNumber: number;
  maxNumber: number;
  operations: ('+' | '-' | '*' | '/')[];
  targetScore: number;
  timeLimit: number;
  unlocked: boolean;
  description: string;
  challengeGoal: string;
  nextChallengePreview: string;
}

export type GameStatus = 'home' | 'map' | 'playing' | 'result' | 'leaderboard';

export interface ScoreEntry {
  name: string;
  score: number;
  date: string;
  levelName: string;
}

export interface GameState {
  currentLevel: Level | null;
  score: number;
  status: GameStatus;
  lives: number;
  totalStars: number;
}
