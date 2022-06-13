import { createSelector } from '@ngrx/store'
import { AppState } from '../state/app.state'
import { LoadingState } from '../state/loading.state'

const selectLoading = (state: AppState) => state.loading

export const selectIsLoading = createSelector(
  selectLoading,
  (state: LoadingState) => state.isLoading
)
