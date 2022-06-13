import { createSelector } from '@ngrx/store'
import { RepositoryState } from '../state/repository.state'
import { AppState } from '../state/app.state'

const selectRepositories = (state: AppState) => state.repositories

export const selectRepositoryList = createSelector(
  selectRepositories,
  (state: RepositoryState) => state.repositories
)

export const selectSelectedRepository = createSelector(
  selectRepositories,
  (state: RepositoryState) => state.selectedRepository
)

export const selectPagination = createSelector(
  selectRepositories,
  (state: RepositoryState) => state.pagination
)

export const selectRepositoryCount = createSelector(
  selectRepositories,
  (state: RepositoryState) => state.repositoryCount
)
