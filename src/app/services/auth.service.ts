import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../model/usuario.model';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private Url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
  private ApiKey ='AIzaSyCOYEfh7AjW2KG0-I2m-2O8W0cqmADe8h4';
  UserToken:string;

  // crear nuevos usuarios
  // accounts:signUp?key=[API_KEY]

  // iniciar sesion
  // accounts:signInWithPassword?key=[API_KEY]
  constructor( private http:HttpClient ) {
    this.LeerToken();
   }

   CerrarSeccion(){
    localStorage.removeItem('token');
    localStorage.removeItem('expira');
  }

  InicioSesion( usuario: UsuarioModel ){
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.Url }signInWithPassword?key=${ this.ApiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.GuardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  NuevoUsusario( usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.Url }signUp?key=${ this.ApiKey }`,
      authData
    ).pipe(
      map( resp => {
        this.GuardarToken( resp['idToken'] );
        return resp;
      })
    );
  }

  private GuardarToken(IdToken: string){
    this.UserToken = IdToken;
    localStorage.setItem('token', IdToken);

    let Hoy = new Date();
    Hoy.setSeconds( 3600 );

    localStorage.setItem('expira', Hoy.getTime().toString() );
  }

  LeerToken(){
    if ( localStorage.getItem('token')) {
      this.UserToken = localStorage.getItem('token')
    } else {
      this.UserToken='';
    }
    return this.UserToken;
  }

  EstaAutentecado():boolean{
    if ( this.UserToken.length < 2 ) {
      return false;
    }

    const expira = Number(localStorage.getItem('expira'));
    const expiraDate = new Date();
    expiraDate.setTime(expira);

    if ( expiraDate > new Date() ) {
      return true;
    } else {
      return false;
    }

  }

}
