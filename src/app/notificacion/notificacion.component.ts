import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { SessionStorageService } from '../services/session-storage.service';
@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.scss']
})
export class NotificacionComponent implements OnInit {
  id: any;
  usuario: any;
  notificaciones: any[] = [];
  showDialog = false;
  usuarioNotificacion: any;
  idajeno: any;
  datosUser: any;
  foto: boolean = false;
  palabrasMasRepetidas: any[] = [];
  seguidor!: string;
  usuarioSesion: any;



  openDialog() {
    this.showDialog = true;
  }

  cerrarSesion() {    
    // Una vez cerrada la sesión, cierra el diálogo
    this.sessionStorageService.removeItem("usuarioPrincipal");
    this.router.navigate(['/login']);

    this.showDialog = false;
  }
  cerrar() {    
    // Una vez cerrada la sesión, cierra el diálogo
    this.showDialog = false;
  }

  constructor(private route: ActivatedRoute, private backandService: BackendService, private renderer: Renderer2,
    private sessionStorageService: SessionStorageService,
    private router: Router ) {}

  ngOnInit(): void {
    this.usuarioSesion = this.sessionStorageService.getItem('usuarioPrincipal');

    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.fotoPerfil(this.usuario);
          this.obtenerNotificacionesUsuario();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  obtenerNotificacionesUsuario(): void {
    this.backandService.obtenerNotificaciones().subscribe(
      (response) => {
        //this.obtenerDatosUsuario(response);
        
        this.notificaciones = response;
        this.notificaciones.forEach(element => {
          if (element.id_ajeno == this.id) {
            this.usuarioNotificacion = element.id_usuario;
          }
        })
        this.obtenerDatosUsuario(this.usuarioNotificacion);
        console.log(this.usuarioNotificacion);
        console.log(this.notificaciones);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  direccionar(id: any){
    this.router.navigate(['/perfil', id]);

  }
  obtenerDatosUsuario(id: any){
      this.backandService.listarUno(id).subscribe(
        response => {
          this.datosUser = response;
          console.log(this.datosUser);
        },
        error => {
          console.log(error);
        }
      );
  }
  fotoPerfil(usuario: any) {
    if (usuario.foto_perfil) {
      this.foto = true;
    }
  }
  recargarPagina() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }
  busquedadSeguidor(){
    const seguidor = this.seguidor;
    this.backandService.comprobarUsuarioArroba(seguidor).subscribe(
      response => {
        this.router.navigate(['/perfil', response.usuario.id]);
      },
      error => {
        this.seguidor = "No hay seguidores con ese nombre";
        console.log(error)
      }
    );
  }
  contarPalabras(publicaciones: any[]): void {
    const palabras: { [palabra: string]: number } = {};
    //console.log(publicaciones);
    // Recorrer las publicaciones
    for (const publicacion of publicaciones) {
      const mensaje = publicacion.contenido.mensaje;
      //console.log(mensaje);
      // Separar el mensaje en palabras
      const palabrasMensaje = mensaje.split(' ');
      //console.log(palabrasMensaje);
      // Contar las palabras
      for (const palabra of palabrasMensaje) {
        // Ignorar palabras vacías o de longitud menor a 3 caracteres
        if (palabra.trim() !== '' && palabra.length > 2) {
          if (palabras[palabra]) {
            palabras[palabra]++;
          } else {
            palabras[palabra] = 1;
          }
        }
      }
    }
    const palabrasOrdenadas = Object.entries(palabras).sort((a, b) => b[1] - a[1]);
    // Obtener las 5 palabras más frecuentes
    this.palabrasMasRepetidas = palabrasOrdenadas.slice(0, 5).map((item) => item[0]);
    
    
  }
}
