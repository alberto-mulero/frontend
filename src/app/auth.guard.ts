import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
  })
  export class AuthGuard implements CanActivate {
  
    constructor(private router: Router) {}
  
    canActivate(): boolean {
      const usuarioLogeado = sessionStorage.getItem('usuarioPrincipal');
      
      if (usuarioLogeado) {
          return true; // El usuario está autenticado y se permite el acceso
      }
  
      this.router.navigate(['/login']); // Redirige al usuario a la página de inicio de sesión
      return false; // El usuario no está autenticado y se bloquea el acceso
    }
  }
  
