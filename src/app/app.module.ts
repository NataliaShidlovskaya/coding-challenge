import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { HttpClientModule } from '@angular/common/http'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatCardModule } from '@angular/material/card'
import { MatChipsModule } from '@angular/material/chips'
import { MatIconModule } from '@angular/material/icon'
import { CoreModule } from '@core/core.module'
import { ListRepositoryComponent } from '@modules/repository/list-repository/list-repository.component'
import { DetailsRepositoryComponent } from '@modules/repository/details-repository/details-repository.component'
import { GraphqlModule } from './graphql.module'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { MatSnackBar } from '@angular/material/snack-bar'

@NgModule({
  declarations: [
    AppComponent,
    ListRepositoryComponent,
    DetailsRepositoryComponent,
    ListRepositoryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    GraphqlModule,
    CoreModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
