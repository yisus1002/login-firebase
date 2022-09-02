import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usuario:UsuarioModel;
  recuerdame:boolean= false;
  constructor(private auth:AuthService,
              private router:Router) { }

  ngOnInit() {
    this.usuario=new UsuarioModel();
    
    if(localStorage.getItem('email')){
      this.usuario.email= localStorage.getItem('email');
      this.recuerdame=true;;
    }
  }
  onSubmit(form:NgForm){
    if(form.invalid){return};
    // console.log(this.usuario)
    // console.log(form)
    Swal.fire({
      text: "Espere por favor ...",
      icon: "info",
      allowOutsideClick: false
    });
    Swal.showLoading()
    this.auth.login(this.usuario)
    .subscribe({
      next: (data:any)=>{
        console.log(data)
        Swal.close();
        if(this.recuerdame){
          localStorage.setItem('email', this.usuario.email);
        }
        this.router.navigateByUrl('/home')
      },
      error(err) {
        // console.log(err);
        Swal.fire({
          title:'Error al autenticar',
          text:err.error.error.message ,
          icon: "warning",
        });
      },
    })


  }

}
