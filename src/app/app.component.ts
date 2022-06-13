import { Component } from '@angular/core'
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { selectIsLoading } from '@core/store/selectors/loading.selector'
import { AppState } from '@core/store/state/app.state'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading$: Observable<boolean | undefined> = this.store.select((state) => selectIsLoading(state))

  constructor (
    private store: Store<AppState>
  ) {
  }
}
