import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { ApolloLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { environment } from '@env'

@NgModule({
  declarations: [],
  providers: [
    Apollo
  ],
  imports: [
    CommonModule
  ]
})
export class GraphqlModule {
  constructor (
    apollo: Apollo,
    httpLink: HttpLink
  ) {
    const uri = environment.graphQlUrl
    const http = httpLink.create({ uri })
    const cache = new InMemoryCache()
    const authLink: ApolloLink = setContext(async () => ({
      headers: {
        Accept: 'charset=utf-8',
        Authorization: 'Bearer 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'
      }
    }))
    apollo.create({
      link: ApolloLink.from([authLink, http]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'none'
        },
        mutate: {
          errorPolicy: 'none'
        }
      }
    })
  }
}
