import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LinkService } from 'src/app/services/link.service';
import { MAT_DIALOG_DATA   } from '@angular/material';


@Component({
  selector: 'app-agregar-editar-link',
  templateUrl: './agregar-editar-link.component.html',
  styleUrls: ['./agregar-editar-link.component.css']
})
export class AgregarEditarLinkComponent implements OnInit {

  formAgregarEditarLink:FormGroup;
  modeForm:string="add";

  constructor(private linkService:LinkService,
    @Inject(MAT_DIALOG_DATA) public params: any) {
    this.crearFormAgregarEditarLink();
    if(params.mode=="add"){
      this.modeForm="add";
      
    }else if(params.mode=="edit"){
      this.modeForm="edit";
      this.formAgregarEditarLink.patchValue(params.link);
      console.log("Se editara un enlace");
    }
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

  editarLink(){
    this.linkService.updateLink(this.formAgregarEditarLink.value.id, this.formAgregarEditarLink.value.url, this.formAgregarEditarLink.value.description)
      .subscribe(data=>{
        console.log(data);
        
      })
  }

}
