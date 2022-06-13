import { ActionReducerMap } from '@ngrx/store'
import { AppState } from '../state/app.state'
import { repositoryReducers } from './repository.reducers'
import { loadingReducers } from './loading.reducers'

export const appReducers: ActionReducerMap<AppState, any> = {
  loading: loadingReducers,
  repositories: repositoryReducers
}
