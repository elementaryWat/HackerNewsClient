import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  user:User;
  hayErrorLogin:boolean=false;
  errorMsgL:string;
  hayErrorRegistro:boolean=false;
  registroExitoso:boolean=false;
  errorMsgR:string;
  constructor(private userService:UserService,
    private router:Router) {
    this.crearFormLogin();
    userService.estadoLogged.subscribe(isLogged=>{
      if(isLogged){
        router.navigate(['/home']);
      }
    })
  }

  crearFormLogin() {
    this.formLogin = new FormGroup({
      'password': new FormControl('', Validators.required),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$")])
    });
    this.formLogin.valueChanges.subscribe(data=>{
      this.hayErrorLogin=false;
    })
  }
  login() {
    this.userService.signIn(this.formLogin.value.email,this.formLogin.value.password)
    .then(data=>{
      console.log(data);
    },errors=>{
      console.log(errors.message);
      this.hayErrorLogin=true;
      this.errorMsgL="Credenciales de acceso no validas";
    })
  }
  ngOnInit() {

  }

}
