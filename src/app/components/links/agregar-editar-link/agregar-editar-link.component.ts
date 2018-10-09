import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LinkService } from 'src/app/services/link.service';

@Component({
  selector: 'app-agregar-editar-link',
  templateUrl: './agregar-editar-link.component.html',
  styleUrls: ['./agregar-editar-link.component.css']
})
export class AgregarEditarLinkComponent implements OnInit {

  formAgregarEditarLink:FormGroup;

  constructor(private linkService:LinkService) {
    this.crearFormAgregarEditarLink();
   }

  ngOnInit() {
  }

  crearFormAgregarEditarLink(){
    this.formAgregarEditarLink=new FormGroup({
      'id':new FormControl(''),
      'description':new FormControl('',Validators.required),
      'url':new FormControl('',Validators.required),
    })
  }

  agregarLink(){
    this.linkService.insertLink(this.formAgregarEditarLink.value.url, this.formAgregarEditarLink.value.description)
      .subscribe(data=>{
        console.log(data);
        
      })
  }

}
