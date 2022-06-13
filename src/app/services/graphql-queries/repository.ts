import { gql } from 'apollo-angular'

export const GET_REPOSITORY_LIST = gql`
  query search($query: String!, $type: SearchType!, $first: Int!, $after: String) {
    search(query: $query, type: $type, first: $first, after: $after) {
      repositoryCount
      pageInfo {
        endCursor
        startCursor
      }
      edges {
        node {
          ... on Repository {
            databaseId
            name
            description
            owner {
              login
              avatarUrl
            }
          }
        }
      }
    }
  }
`

export const GET_REPOSITORY = gql`
  query repository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      databaseId
      name
      description
      owner {
        login
        avatarUrl
      }
    }
  }
`
