import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor ( private AuthService: AuthService,
                private router: Router ){}

  canActivate(): boolean{
    if ( this.AuthService.EstaAutentecado() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }

  }

}
