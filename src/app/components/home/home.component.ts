import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Link, User, Query } from '../../types';
import { MatDialog } from '@angular/material';
import { AgregarEditarLinkComponent } from '../links/agregar-editar-link/agregar-editar-link.component';
import { LinkService } from 'src/app/services/link.service';
import { UserService } from 'src/app/services/user.service';

import * as _ from 'lodash';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  links:Link[]=[];
  constructor(private linkService:LinkService,
    public userService:UserService,
     public dialog: MatDialog) { }

  ngOnInit() {
    this.linkService.getLinks().subscribe(links=>{
      this.links = _.map(links,(link)=>({
        ...link,
        votedByMe: _.includes(_.map(link.votes,(vote)=>{
          return vote.user.id==this.userService.currentUser.id
        }),true),
        myVote: _.find(_.map(link.votes,(vote)=>{
          return {
            user_id:vote.user.id,
            vote_id:vote.id
          };
        }), (voteFromUser)=>{
          return voteFromUser.user_id==this.userService.currentUser.id;
        })
      }));
      console.log(this.links);

    })
  }

  voteLink(link_id:string){
    this.linkService.voteLink(link_id).subscribe(data=>{
      console.log(data);
      
    })
  }

  downvoteLink(vote_id:string, link_id:string){
    this.linkService.downvoteLink(vote_id,link_id).subscribe(data=>{
      console.log(data);
      
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AgregarEditarLinkComponent, {
      width: '250px',
      data: {mode:'add'}
    });

    /* dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    }); */
  }
  openDialogEdit(link:Link){
    const dialogRef = this.dialog.open(AgregarEditarLinkComponent, {
      width: '250px',
      data: {mode:'edit',link:link}
    });
  }

}
