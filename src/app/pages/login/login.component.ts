import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Usuario:UsuarioModel = new UsuarioModel();
  Recordarme:boolean= false;

  constructor( private Auth:AuthService,
    private router: Router) { }

  ngOnInit() {
    if ( localStorage.getItem('email') ) {
      this.Usuario.email = localStorage.getItem('email');
      this.Recordarme= true;
    }
  }

  SubmitLogin(FormLogin:NgForm){
    if(FormLogin.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'
    });
    Swal.showLoading();

    this.Auth.InicioSesion(this.Usuario)
    .subscribe(SesionRespuesta => {
      Swal.close();

      if ( this.Recordarme ) {
        localStorage.setItem('email', this.Usuario.email);
      }

      this.router.navigateByUrl('/home');
    },(SesionError)=>{

      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar'
      });

    });
  }
}
