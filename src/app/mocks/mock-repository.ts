import { Repository } from '@models/repository'
import { RepositoryResponse, SearchRepositoryGraphQl } from '@models/graphql-models/repository-graphql'

export const MOCK_REPOSITORIES: Repository[] = [
  {
    databaseId: 2338,
    name: 'sprint',
    description: 'browsers.',
    owner: {
      login: 'bendc',
      avatarUrl: 'avatarUrl'
    }
  }
]

export const MOCK_REPOSITORIES_GRAPHQL_RESPONSE: SearchRepositoryGraphQl = {
  search: {
    repositoryCount: 79965547,
    pageInfo: { endCursor: 'Y3Vyc29yOjMw', startCursor: 'Y3Vyc29yOjE=' },
    edges: [{
      node: {
        databaseId: 2338,
        name: 'sprint',
        description: 'browsers.',
        owner: {
          login: 'bendc',
          avatarUrl: 'avatarUrl'
        }
      }
    }]
  }
}

export const MOCK_REPOSITORY_RESPONSE: RepositoryResponse = {
  repositories: MOCK_REPOSITORIES,
  pagination: {
    endCursor: 'Y3Vyc29yOjMw',
    startCursor: 'Y3Vyc29yOjE='
  },
  repositoryCount: 79965547
}
