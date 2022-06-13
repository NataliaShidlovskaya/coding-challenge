import { RouterModule, Routes } from '@angular/router'
import { NgModule } from '@angular/core'
import { ListRepositoryComponent } from './list-repository/list-repository.component'
import { DetailsRepositoryComponent } from './details-repository/details-repository.component'

const routes: Routes = [
  {
    path: '',
    component: ListRepositoryComponent
  },
  {
    path: ':id',
    component: DetailsRepositoryComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepositoryRoutingModule {}
