import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Link, User, Query } from '../../types';
import { MatDialog } from '@angular/material';
import { AgregarEditarLinkComponent } from '../links/agregar-editar-link/agregar-editar-link.component';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links: Observable<Link[]>;
  constructor(private linkService:LinkService, public dialog: MatDialog) { }

  ngOnInit() {
    this.links = this.linkService.getLinks();
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
