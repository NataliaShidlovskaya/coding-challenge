import { createReducer, on } from '@ngrx/store'
import * as RepositoriesActions from '../actions/repository.actions'
import { initialLoadingState } from '../state/loading.state'

export const loadingReducers = createReducer(
  initialLoadingState,
  on(
    RepositoriesActions.getRepository,
    RepositoriesActions.getRepositories,
    (state) => ({ ...state, isLoading: true })),
  on(
    RepositoriesActions.getRepositorySuccess,
    RepositoriesActions.getRepositoriesSuccess,
    RepositoriesActions.getRepositoryFailed,
    RepositoriesActions.getRepositoriesFailed,
    () => initialLoadingState)
)
