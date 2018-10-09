import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { map } from 'rxjs/operators';
import gql from 'graphql-tag';

import { Link, User, Query } from '../../types';
import { MatDialog } from '@angular/material';
import { AgregarEditarLinkComponent } from '../links/agregar-editar-link/agregar-editar-link.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links: Observable<Link[]>;
  constructor(private apollo: Apollo, public dialog: MatDialog) { }

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

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarEditarLinkComponent, {
      width: '250px',
      /* data: {name: this.name, animal: this.animal} */
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    }); */
  }

}
