import { Repository } from '@models/repository'
import { PageInfo } from '@models/graphql-models/repository-graphql'

export interface RepositoryState {
  repositories: Repository[];
  pagination: PageInfo | null,
  repositoryCount: number,
  selectedRepository: Repository | null;
}

export const initialRepositoryState: RepositoryState = {
  repositories: [],
  pagination: null,
  repositoryCount: 0,
  selectedRepository: null
}
