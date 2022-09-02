import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  angForm:FormGroup;
  constructor(private fb:FormBuilder) { }

  ngOnInit() { 
    this.usuario= new UsuarioModel();
    // this.createForm();
    // this.usuario.email= 'yisusgarcia1002@gmail.com';

  }
  Onsubmit(form:NgForm){
   if(form.invalid){return}
    console.log(this.usuario)
    console.log(form)
  }
  // createForm() {
  //   this.angForm = this.fb.group({
  //     email: ["",[ Validators.required, Validators.email]],
  //     password: ["", [Validators.required, Validators.minLength(5)]],
  //     nombre:["", [Validators.required, Validators.minLength(5)]]
  //   });
  //   this.angForm.controls["email"].valueChanges.subscribe(data => {
  //     console.log(data);
  //   });
  // }

}
