import { ApolloTestingController, ApolloTestingModule } from 'apollo-angular/testing'
import { TestBed } from '@angular/core/testing'

import { RepositoryService } from './repository.service'
import {
  MOCK_REPOSITORIES,
  MOCK_REPOSITORIES_GRAPHQL_RESPONSE,
  MOCK_REPOSITORY_RESPONSE
} from '../mocks/mock-repository'
import { GET_REPOSITORY, GET_REPOSITORY_LIST } from './graphql-queries/repository'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { MOCK_CONTRIBUTORS } from '../mocks/mock-contributor'

export const searchStub = {
  data: {
    ...MOCK_REPOSITORIES_GRAPHQL_RESPONSE
  }
}

describe('RepositoryService', () => {
  let controller: ApolloTestingController
  let repositoryService: RepositoryService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ApolloTestingModule,
        HttpClientTestingModule
      ]
    })
    controller = TestBed.inject(ApolloTestingController)
    repositoryService = TestBed.inject(RepositoryService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    controller.verify()
  })

  it('should be created', () => {
    expect(repositoryService).toBeTruthy()
  })

  it('get repository list', () => {
    repositoryService.getRepositoryList(50, 'Y3Vyc29yOjMw')
      .subscribe((response) => {
        expect(response.data.pagination).toEqual(MOCK_REPOSITORY_RESPONSE.pagination)
      })
    const request = controller.expectOne(GET_REPOSITORY_LIST)

    expect(request.operation.variables.first).toEqual(50)

    request.flush(searchStub)
  })

  it('get repository', () => {
    repositoryService.getRepository('name', 'owner')
      .subscribe((response) => {
        expect(response.data).toEqual(MOCK_REPOSITORIES[0])
      })
    const request = controller.expectOne(GET_REPOSITORY)

    expect(request.operation.variables.name).toEqual('name')

    request.flush({ data: { repository: { ...MOCK_REPOSITORIES[0] } } })
  })

  it('get contributors', () => {
    httpMock.verify()
    repositoryService.getContributors('name', 'owner')
      .subscribe((response) => {
        expect(response).toEqual(MOCK_CONTRIBUTORS)
      })
    const request = httpMock.expectOne('https://api.github.com/repos/owner/name/contributors')

    expect(request.request.method).toEqual('GET')

    request.flush(MOCK_CONTRIBUTORS)
  })
})
