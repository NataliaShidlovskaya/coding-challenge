import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { catchError, map, Observable, throwError } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { ApolloQueryResult } from '@apollo/client/core'
import { GET_REPOSITORY, GET_REPOSITORY_LIST } from './graphql-queries/repository'
import {
  RepositoryGraphQL,
  RepositoryResponse,
  SearchRepositoryGraphQl
} from '@models/graphql-models/repository-graphql'
import { SearchTypeEnum } from '../enums/searchType.enum'
import { Contributor } from '@models/contributor'
import { Repository } from '@models/repository'
import { mapRepositoryList } from './mappers/repository-mapper'
import { environment } from '@env'
import { UtilsService } from './utils.service'

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  constructor (
    private apollo: Apollo,
    private http: HttpClient,
    private utilService: UtilsService
  ) {
  }

  getRepositoryList (first: number, after?: string): Observable<ApolloQueryResult<RepositoryResponse>> {
    const SEARCH_QUERY = 'is:public archived:false'

    return this.apollo
      .watchQuery<SearchRepositoryGraphQl>({
        query: GET_REPOSITORY_LIST,
        variables: {
          query: SEARCH_QUERY,
          type: SearchTypeEnum.REPOSITORY,
          first,
          after
        }
      })
      .valueChanges.pipe(
        map((result) => ({ ...result, data: mapRepositoryList(result.data.search) })),
        catchError((error) => {
          return throwError(() => this.utilService.openSnackBar(error))
        })
      )
  }

  getRepository (name: string, owner: string): Observable<ApolloQueryResult<Repository>> {
    return this.apollo
      .watchQuery<RepositoryGraphQL>({
        query: GET_REPOSITORY,
        variables: {
          name,
          owner
        }
      })
      .valueChanges.pipe(
        map((result) => ({
          ...result,
          data: result.data.repository
        })),
        catchError((error) => {
          return throwError(() => this.utilService.openSnackBar(error))
        })
      )
  }

  getContributors (name: string, owner: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${environment.apiUrl}/repos/${owner}/${name}/contributors`).pipe(
      catchError((error) => {
        return throwError(() => this.utilService.openSnackBar(error))
      })
    )
  }
}
