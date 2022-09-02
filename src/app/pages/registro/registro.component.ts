import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario:UsuarioModel;
  angForm:FormGroup;
  recuerdame:boolean=false;
  constructor(private fb:FormBuilder,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() { 
    this.usuario= new UsuarioModel();
    // this.createForm();
    // this.usuario.email= 'yisusgarcia1002@gmail.com';

  }
  Onsubmit(form:NgForm){
   if(form.invalid){return}
    // console.log(this.usuario)
    // console.log(form)
    Swal.fire({
      text: "Espere por favor ...",
      icon: "info",
      allowOutsideClick: false
    });
    Swal.showLoading()
    this.auth.nuevoUsuario(this.usuario)
    .subscribe({
      next: (data:any)=>{
        Swal.close();
        
        if(this.recuerdame){
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home')
        console.log(data)
      },
      error: (error:any)=>{
        console.log(error.error.error.message)
        Swal.fire({
          title:'Error al registrarse',
          text:error.error.error.message ,
          icon: "warning",
        });
      }
    })
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
