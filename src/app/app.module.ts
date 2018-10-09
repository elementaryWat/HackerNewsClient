import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import {ApolloLink} from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { Routes, RouterModule } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatListModule, MatButtonModule, MatToolbarModule, MatIconModule, MatFormFieldModule, MatDialogModule, MatFormFieldControl, MatInputModule} from '@angular/material';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AppRoutingModule } from './app.routes';
import { AgregarEditarLinkComponent } from './components/links/agregar-editar-link/agregar-editar-link.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgregarEditarLinkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    HttpLinkModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    FormsModule,
    ReactiveFormsModule,

    MatListModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule
  ],
  entryComponents:[AgregarEditarLinkComponent],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {

  constructor(apollo:Apollo, httpLink:HttpLink){
    const http = httpLink.create({
      uri: 'http://localhost:4000'
    });
    const middleware = new ApolloLink((operation, forward) => {
      operation.setContext({
        headers: new HttpHeaders().set(
          'Authorization',
         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJmaXJzdEdSQVBIUUxzZXJ2aWNlQGhhY2tlck5ld3MiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTM4Njc5NzAzLCJleHAiOjE1MzkyODQ1MDN9.FBmEiDBMFj6aeNQNUnN6Axkc-e1frexmlocCBHOYUuI',
        )
      });
      return forward(operation);
    });

    const link = middleware.concat(http);
    apollo.create({
      link,
      cache: new InMemoryCache()
    });
  }
 }
