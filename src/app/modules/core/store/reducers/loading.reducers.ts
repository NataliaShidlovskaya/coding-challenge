import { createReducer, on } from '@ngrx/store'
import * as RepositoriesActions from '../actions/repository.actions'
import { initialLoadingState } from '../state/loading.state'

export const loadingReducers = createReducer(
  initialLoadingState,
  on(RepositoriesActions.getRepository, (state) => ({ ...state, isLoading: true })),
  on(RepositoriesActions.getRepositories, (state) => ({ ...state, isLoading: true })),
  on(RepositoriesActions.getRepositorySuccess, (state) => ({ ...state, isLoading: false })),
  on(RepositoriesActions.getRepositoriesSuccess, (state) => ({ ...state, isLoading: false }))
)
