import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { Apollo } from 'apollo-angular'
import { HttpLink } from 'apollo-angular/http'
import { ApolloLink, InMemoryCache } from '@apollo/client/core'
import { setContext } from '@apollo/client/link/context'
import { environment } from '@env'
import { onError } from '@apollo/client/link/error'

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
        Authorization: `Bearer ${environment.token}`
      }
    }))
    const errorLink = onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          )
        )
      }
      if (networkError) console.log(`[Network error]: Message: ${networkError.message}`)
    })
    apollo.create({
      link: ApolloLink.from([authLink, errorLink, http]),
      cache,
      defaultOptions: {
        watchQuery: {
          fetchPolicy: 'no-cache',
          errorPolicy: 'all'
        },
        mutate: {
          errorPolicy: 'all'
        }
      }
    })
  }
}
