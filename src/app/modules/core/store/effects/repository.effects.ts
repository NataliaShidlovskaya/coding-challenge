import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap, catchError, of } from 'rxjs'
import { RepositoryService } from '../../../../services/repository.service'
import {
  getRepositories, getRepositoriesFailed,
  getRepositoriesSuccess,
  getRepository, getRepositoryFailed,
  getRepositorySuccess
} from '../actions/repository.actions'

@Injectable()
export class RepositoryEffects {
  constructor (
    private actions$: Actions,
    private repositoryService: RepositoryService
  ) {
  }

  getRepositories$ = createEffect(() => this.actions$.pipe(
    ofType(getRepositories),
    switchMap((action) => this.repositoryService.getRepositoryList(action.first, action.after).pipe(
      map(({ data }) => (getRepositoriesSuccess({ ...data }))),
      catchError(() => of(getRepositoriesFailed()))
    ))
  ))

  getRepository$ = createEffect(() => this.actions$.pipe(
    ofType(getRepository),
    switchMap((action) => this.repositoryService.getRepository(action.name, action.owner).pipe(
      switchMap(({ data }) => this.repositoryService.getContributors(action.name, action.owner).pipe(
        map((contributors) => (getRepositorySuccess({ selectedRepository: { ...data, contributors } }))),
        catchError(() => of(getRepositoryFailed()))
      ))
    ))
  ))
}
