import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Query } from '../types';

import { map } from 'rxjs/operators';
import { CREATE_LINK_MUTATION, ALL_LINKS_QUERY } from './graphql';


@Injectable({
  providedIn: 'root'
})
export class LinkService {

  constructor(private apollo: Apollo) { }
  
  getLinks(){
    return this.apollo.watchQuery<Query>({
      query: ALL_LINKS_QUERY
    })
      .valueChanges
      .pipe(
        map(result => result.data.feed)
      );
  }

  insertLink(url:string, description:string){
    console.log(url,description);
    
    return this.apollo.mutate({
      mutation: CREATE_LINK_MUTATION,
      variables: {
        url: url,
        description: description
      },
      update: (store, { data: { post } }) => {
        const data: any = store.readQuery({
          query: ALL_LINKS_QUERY
        });

        data.feed.push(post);
        store.writeQuery({ query: ALL_LINKS_QUERY, data })
      }
    })
  }
}
