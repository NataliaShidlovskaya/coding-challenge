import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    redirectTo: '/repositories',
    pathMatch: 'full'
  },
  {
    path: 'repositories',
    loadChildren: () => import('./modules/repository/repository.module').then((m) => m.RepositoryModule)
  },
  {
    path: '**',
    redirectTo: '/repositories'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
