import { Injectable } from '@angular/core';
import { User } from '../types';
import { BehaviorSubject, Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { LOGIN_MUTATION } from './graphql';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser:User;
  currentToken:string;
  estadoLogged:BehaviorSubject<boolean>;
  constructor(private apollo: Apollo) {
    this.estadoLogged=new BehaviorSubject(false);
  }

  signIn(email:string,password:string){
    return new Promise((resolve,reject)=>{
      return this.apollo.mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password
        }
      }).subscribe(result=>{
        if(result.data.login){
          this.setCurrentUser(result.data.login.user);
          this.setCurrentToken(result.data.login.token);
          this.estadoLogged.next(true);
          resolve(true);
        }
      },errors=>{
        reject(errors);
      })
    })
  }
  setCurrentUser(user:User){
    localStorage.setItem("user",JSON.stringify(user));
    this.currentUser=user;
  }

  getCurrentUser(){
    return this.currentUser;
  }

  setCurrentToken(token:string){
    localStorage.setItem("token",token);    
    this.currentToken=token;    
  }

  getCurrentToken(){
    return this.currentToken;
  }

  isLogged():BehaviorSubject<any>{
    let currentLoginU=localStorage.getItem("user");
    if(this.currentUser){
      this.estadoLogged.next(true);
    }else{
      if(currentLoginU){
        this.currentUser=JSON.parse(currentLoginU);
        this.estadoLogged.next(true);        
      }else{
        this.estadoLogged.next(false);                
      }
    }
    return this.estadoLogged;
  }

  logOut(){
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.currentUser=null;
    this.currentToken=null;
    this.estadoLogged.next(false);
  }
}
