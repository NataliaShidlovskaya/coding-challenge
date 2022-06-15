import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { getRepository } from '@core/store/actions/repository.actions'
import { RepositoryService } from '../../../services/repository.service'
import { Repository } from '@models/repository'
import { selectSelectedRepository } from '@core/store/selectors/repository.selector'
import { AppState } from '@core/store/state/app.state'
import { selectIsLoading } from '@modules/core/store/selectors/loading.selector'

@Component({
  selector: 'app-details-repository',
  templateUrl: './details-repository.component.html',
  styleUrls: ['./details-repository.component.scss']
})
export class DetailsRepositoryComponent implements OnInit {
  loading$: Observable<boolean | undefined> = this.store.select((state) => selectIsLoading(state))

  repository$: Observable<Repository | null> = this.store.select((state) => selectSelectedRepository(state))

  constructor (
    private repositoryService: RepositoryService,
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit (): void {
    this.route.queryParams.subscribe(({ name, owner }) => {
      if (name && owner) {
        this.store.dispatch(getRepository({ name, owner }))
      }
    })
  }
}
