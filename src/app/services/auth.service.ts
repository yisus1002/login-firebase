import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url:string= 'https://identitytoolkit.googleapis.com/v1/accounts:'
  private apikey:string= 'AIzaSyAcH-2xg4zq68LYWzKVynTOzDgf9K2RREQ'
  userToken:string;
  jwtHelper: any;
// crear usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//ingresar
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
// 
  constructor(private http:HttpClient,
              private router: Router) {
    this.leerToken();
   }


  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('expira')
    this.router.navigate(['login'])
  }
  login(usuario : UsuarioModel){
    const autData ={
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    }
    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,autData
    ).pipe(
      map((res:any)=>{
        this.guardarToken(res['idToken']);
        return res;
      })
    );

  }
  nuevoUsuario(usuario:UsuarioModel){
    const autData ={
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true,
    }
    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,autData
    ).pipe(
      map((res:any)=>{
        this.guardarToken(res['idToken']);
        return res;
      })
    );
  }
  private guardarToken(idToken:string){
    this.userToken=idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira', hoy.getTime().toString())
  }
  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken= localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }
  isAutentificado():boolean{
    // const token = localStorage.getItem('token');
    if(this.userToken.length<2){
      return false;
    }
    const expira = Number(localStorage.getItem('expira')); 
    const expiraDate = new Date();
    expiraDate.setTime(expira);
    if(expiraDate> new Date()){
      return true;
    }else{
      return false;
    }
    // return this.userToken.length > 2;
       // Check whether the token is expired and return
    // true or false
    // return !this.jwtHelper.isTokenExpired(token);
  }
}
