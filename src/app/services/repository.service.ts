import { Injectable } from '@angular/core'
import { Apollo } from 'apollo-angular'
import { map, Observable } from 'rxjs'
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

@Injectable({
  providedIn: 'root'
})
export class RepositoryService {
  private GITHUB_URL = 'https://api.github.com'

  constructor (
    private apollo: Apollo,
    private http: HttpClient
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
        map((result) => ({ ...result, data: mapRepositoryList(result.data.search) }))
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
        }))
      )
  }

  getContributors (name: string, owner: string): Observable<Contributor[]> {
    return this.http.get<Contributor[]>(`${this.GITHUB_URL}/repos/${owner}/${name}/contributors`)
  }
}
