import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-editar-link',
  templateUrl: './agregar-editar-link.component.html',
  styleUrls: ['./agregar-editar-link.component.css']
})
export class AgregarEditarLinkComponent implements OnInit {

  formAgregarEditarLink:FormGroup;

  constructor() {
    this.crearFormAgregarEditarLink();
   }

  ngOnInit() {
  }

  crearFormAgregarEditarLink(){
    this.formAgregarEditarLink=new FormGroup({
      'id':new FormControl(''),
      'nombre':new FormControl('',Validators.required),
      'descripcion':new FormControl('',Validators.required),
      'url':new FormControl('',Validators.required),
    })
  }

  agregarLink(){
    console.log(this.formAgregarEditarLink.value);
    
  }

}
