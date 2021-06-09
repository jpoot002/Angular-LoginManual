import { Component, OnInit } from '@angular/core';
import { Services } from '@angular/core/src/view';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/model/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  Usuario:UsuarioModel;
  Recordarme:boolean= false;

  constructor( private Auth:AuthService,
               private router: Router ) { }

  ngOnInit() {
    this.Usuario= new UsuarioModel();
    this.Recordarme= true;
  }

  NgSubmitform(FormRegister:NgForm){
    if(FormRegister.invalid){return;}

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espera por Favor..'
    });
    Swal.showLoading();

    this.Auth.NuevoUsusario(this.Usuario)
    .subscribe(NuevoRespuesta => {
      Swal.close();

      if ( this.Recordarme ) {
        localStorage.setItem('email', this.Usuario.email);
      }
      
      this.router.navigateByUrl('/home');
    },(NuevoError)=>{

      Swal.fire({
        icon: 'error',
        title: 'Error al autenticar'
      });

    });
  }


}
