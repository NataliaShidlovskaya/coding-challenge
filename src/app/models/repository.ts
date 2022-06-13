import { Contributor } from './contributor'

export interface Repository {
  databaseId?: number;
  name: string;
  description: string;
  owner: {
    login: string;
    avatarUrl: string;
  };
  contributors?: Contributor[]
}
