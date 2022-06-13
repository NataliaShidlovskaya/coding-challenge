import { RepositoryResponse, Search } from '@models/graphql-models/repository-graphql'

export const mapRepositoryList = ({ edges, pageInfo, repositoryCount }: Search): RepositoryResponse => ({
  repositories: edges.map(({ node }) => node),
  pagination: pageInfo,
  repositoryCount
})
