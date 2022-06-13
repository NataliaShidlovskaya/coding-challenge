import { createAction, props } from '@ngrx/store'
import { Repository } from '@models/repository'
import { RepositoryResponse } from '@models/graphql-models/repository-graphql'

export enum RepositoryActions {
  GetRepositories = '[Repository] Get Repositories',
  GetRepository = '[Repository] Get Repository',
  GetRepositoriesSuccess = '[Repository] Get Repositories Success',
  GetRepositorySuccess = '[Repository] Get Repository Success',
}

export const getRepositories = createAction(
  RepositoryActions.GetRepositories,
  props<{ first: number, after?: string }>()
)

export const getRepository = createAction(
  RepositoryActions.GetRepository,
  props<{ name: string, owner: string }>()
)

export const getRepositoriesSuccess = createAction(
  RepositoryActions.GetRepositoriesSuccess,
  props<RepositoryResponse>()
)

export const getRepositorySuccess = createAction(
  RepositoryActions.GetRepositorySuccess,
  props<{ selectedRepository: Repository }>()
)
