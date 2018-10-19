import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Query } from '../types';

import { map } from 'rxjs/operators';
import { CREATE_LINK_MUTATION, ALL_LINKS_QUERY, UPDATE_LINK_MUTATION, VOTE_LINK_MUTATION, DOWNVOTE_LINK_MUTATION } from './graphql';

import * as _ from 'lodash';

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
        map(result => {
          return result.data.feed
        })
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

        //Agrega el nuevo link a la cache
        data.feed.push(post);
        store.writeQuery({ query: ALL_LINKS_QUERY, data })
      }
    })
  }

  updateLink(id:string, url:string, description:string){

    return this.apollo.mutate({
      mutation: UPDATE_LINK_MUTATION,
      variables: {
        id: id,
        url: url,
        description: description
      },
      update: (store, { data: { updateLink } }) => {
        const data: any = store.readQuery({
          query: ALL_LINKS_QUERY
        });
        //Actualiza los datos en la cache
        data.feed[_.findIndex(data.feed,{id:updateLink.id})]=updateLink;
        store.writeQuery({ query: ALL_LINKS_QUERY, data })
      }
    })
  }
  voteLink(link_id:string){

    return this.apollo.mutate({
      mutation: VOTE_LINK_MUTATION,
      variables: {
        link_id
      },
      update: (store, { data: { createVote } }) => {
        const data: any = store.readQuery({
          query: ALL_LINKS_QUERY
        });

        //Actualiza el link votado en la cache
        data.feed[_.findIndex(data.feed,{id:createVote.link.id})]=createVote.link;
        store.writeQuery({ query: ALL_LINKS_QUERY, data })
      }
    })
  }

  downvoteLink(vote_id:string, link_id:string){

    return this.apollo.mutate({
      mutation: DOWNVOTE_LINK_MUTATION,
      variables: {
        vote_id
      },
      update: (store, { data: { deleteVote } }) => {
        const data: any = store.readQuery({
          query: ALL_LINKS_QUERY
        });
        let indexLink=_.findIndex(data.feed,{id:link_id});
        let indexVote=_.findIndex(data.feed[indexLink].votes,{id:vote_id});
        //Actualiza los votos del link en la cache
        data.feed[indexLink].votes.splice(indexVote,1);
        store.writeQuery({ query: ALL_LINKS_QUERY, data })
      }
    })
  }
}
