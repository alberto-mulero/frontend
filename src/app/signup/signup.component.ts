import { Component, OnInit } from '@angular/core';
import { BackendService } from '../services/backend.service';
import { Router } from '@angular/router';
import { SessionStorageService } from '../services/session-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  nombre_usuario: string = '';
  nombre_arroba: string = '';
  correo: string = '';
  contrasena: string = '';
  fecha_nacimiento: string = '';
  cuenta: boolean = false;

  constructor(private backendService: BackendService, private router: Router,private sessionStorageService: SessionStorageService ) { }

 

  onSubmit() {
    const data = {
      nombre_usuario: this.nombre_usuario,
      nombre_arroba: this.nombre_arroba,
      correo: this.correo,
      contrasena: this.contrasena,
      fecha_nacimiento: this.fecha_nacimiento
    }
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    this.backendService.registrarUsuario(data).subscribe(
      response => {
        this.cuenta = false;
        let id = response.usuario.id;
        this.sessionStorageService.setItem('usuarioPrincipal', response.usuario);
        this.router.navigate(['/inicio', id]);
        // La solicitud al servidor fue exitosa, puedes manejar la respuesta aquí
        //console.log(response);
        // Por ejemplo, puedes mostrar un mensaje de éxito al usuario o redirigirlo a otra página
      },
      error => {
        this.cuenta = true;
        // La solicitud al servidor generó un error, puedes manejarlo aquí
        //console.error(error);
        // Por ejemplo, puedes mostrar un mensaje de error al usuario o realizar alguna otra acción
      }
    );
  }
}


