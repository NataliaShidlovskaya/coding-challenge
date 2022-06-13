import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { appReducers } from './store/reducers/app.reducers'
import { RepositoryEffects } from './store/effects/repository.effects'
import { environment } from '@env'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot(([RepositoryEffects])),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ]
})
export class CoreModule { }
