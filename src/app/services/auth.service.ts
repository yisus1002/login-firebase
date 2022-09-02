import { HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url: 'https://identitytoolkit.googleapis.com/v1/accounts'
// crear usuario
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

//ingresar
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
// 
  constructor(private http:HttpClientModule) { }
}
