import { createReducer, on } from '@ngrx/store'
import { initialRepositoryState } from '../state/repository.state'
import * as RepositoriesActions from '../actions/repository.actions'

export const repositoryReducers = createReducer(
  initialRepositoryState,
  on(RepositoriesActions.getRepositorySuccess, (state, { selectedRepository }) => ({ ...state, selectedRepository })),
  on(RepositoriesActions.getRepositoriesSuccess, (state, { repositories, pagination, repositoryCount }) => ({
    ...state, repositories: [...state.repositories, ...repositories], pagination, repositoryCount
  }))
)
