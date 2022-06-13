import { initialRepositoryState, RepositoryState } from './repository.state'
import { initialLoadingState, LoadingState } from './loading.state'

export interface AppState {
  loading: LoadingState;
  repositories: RepositoryState;
}

export const initialAppState: AppState = {
  loading: initialLoadingState,
  repositories: initialRepositoryState
}

export function getInitialSate (): AppState {
  return initialAppState
}
