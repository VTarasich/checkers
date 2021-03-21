import { GameState } from './store/game/reducer';

const LOCAL_STORAGE_KEY = 'checkers-game';

export function saveGameToLocalStorage(game: GameState): void {
  window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(game));
}

export function clearGameFromLocalStorage(): void {
  window.localStorage.removeItem(LOCAL_STORAGE_KEY);
}

export function readGameFromLocalStorage(): GameState | null {
  const savedGame = localStorage.getItem(LOCAL_STORAGE_KEY);

  return savedGame && JSON.parse(savedGame);
}
