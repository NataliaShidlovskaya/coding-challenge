import { Repository } from '../repository'

export interface PageInfo {
  endCursor: string;
  startCursor: string;
}

export interface Search {
  edges: {
    node: Repository
  }[];
  repositoryCount: number;
  pageInfo: PageInfo
}

export interface SearchRepositoryGraphQl {
  search: Search;
}

export interface RepositoryResponse {
  repositories: Repository[],
  pagination: PageInfo
  repositoryCount: number;
}

export interface RepositoryGraphQL {
  repository: Repository
}
