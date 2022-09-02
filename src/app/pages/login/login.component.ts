import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel;
  constructor() { }

  ngOnInit() {
    this.usuario=new UsuarioModel();
  }
  onSubmit(form:NgForm){
    if(form.invalid){return};
    console.log(this.usuario)
    console.log(form)

  }

}
