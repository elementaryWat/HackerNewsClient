import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Link, User, Query } from '../../types';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links: Observable<Link[]>;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.links = this.apollo.watchQuery<Query>({
      query: gql`
        query feed {
          feed {
            id
            description
            url
          }
        }
      `
    })
      .valueChanges
      .pipe(
        map(result => result.data.feed)
      );
  }

}
