import { Injectable } from '@angular/core'
import { Actions, createEffect, ofType } from '@ngrx/effects'
import { map, switchMap } from 'rxjs'
import { RepositoryService } from '../../../../services/repository.service'
import {
  getRepositories,
  getRepositoriesSuccess,
  getRepository,
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
      map(({ data }) => (getRepositoriesSuccess({ ...data })))
    ))
  ))

  getRepository$ = createEffect(() => this.actions$.pipe(
    ofType(getRepository),
    switchMap((action) => this.repositoryService.getRepository(action.name, action.owner).pipe(
      switchMap(({ data }) => this.repositoryService.getContributors(action.name, action.owner).pipe(
        map((contributors) => (getRepositorySuccess({ selectedRepository: { ...data, contributors } })))
      ))
    ))
  ))
}
