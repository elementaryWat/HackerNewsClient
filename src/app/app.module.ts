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
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AgregarEditarLinkComponent,
    LoginComponent
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
         'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiY2ptdXdlN3JiOGk4bTBiNDhzMG1qdjR5byIsImlhdCI6MTUzOTY5NjYwOX0.TwttPsjcJTZiHcY7vBDXq2jve7HRVdXSiWfRaSNHikU',
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
