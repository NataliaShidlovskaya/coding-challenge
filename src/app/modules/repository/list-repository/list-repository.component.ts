import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs'
import { RepositoryService } from '../../../services/repository.service'
import { Repository } from '@models/repository'
import { getRepositories } from '@core/store/actions/repository.actions'
import { AppState } from '@core/store/state/app.state'
import {
  selectPagination,
  selectRepositoryCount,
  selectRepositoryList
} from '@core/store/selectors/repository.selector'
import { selectIsLoading } from '@core/store/selectors/loading.selector'
import { PageInfo } from '@models/graphql-models/repository-graphql'

const LOAD_ITEMS_PER_PAGE = 30

@Component({
  selector: 'app-list-repository',
  templateUrl: './list-repository.component.html',
  styleUrls: ['./list-repository.component.scss']
})
export class ListRepositoryComponent implements OnInit {
  displayedColumns: string[] = ['name', 'owner', 'description']

  loading$: Observable<boolean | undefined> = this.store.select((state) => selectIsLoading(state))

  repositories$: Observable<Repository[]> = this.store.select((state) => selectRepositoryList(state))

  pagination$: Observable<PageInfo | null> = this.store.select((state) => selectPagination(state))

  repositoryCount$: Observable<number> = this.store.select((state) => selectRepositoryCount(state))

  constructor (
    private repositoryService: RepositoryService,
    private router: Router,
    private store: Store<AppState>
  ) {
  }

  ngOnInit (): void {
    this.pagination$.subscribe((pagination) => {
      if (!pagination?.startCursor) {
        this.store.dispatch(getRepositories({ first: LOAD_ITEMS_PER_PAGE }))
      }
    })
  }

  async navigateToDetails ({ name, owner, databaseId }: Repository) {
    await this.router.navigate(
      [`/repositories/${databaseId}`],
      {
        queryParams: {
          name,
          owner: owner.login
        }
      }
    )
  }

  onTableScroll (e: any, pagination: PageInfo) {
    const tableViewHeight = e.target.offsetHeight
    const tableScrollHeight = e.target.scrollHeight
    const scrollLocation = e.target.scrollTop
    const limit = tableScrollHeight - tableViewHeight
    if (scrollLocation > limit) {
      this.store.dispatch(getRepositories({ first: LOAD_ITEMS_PER_PAGE, after: pagination.endCursor }))
    }
  }
}
