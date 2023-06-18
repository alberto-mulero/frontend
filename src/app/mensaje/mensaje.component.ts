import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material/dialog';

import { SessionStorageService } from '../services/session-storage.service';
@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.scss']
})
export class MensajeComponent implements OnInit {
  id: any;
  usuario: any;
  usuarioSesion: any;
  foto: boolean = false;
  seguido: boolean = false;
  conversaciones: any[] = [];
  idUsuarioRecibe: number | null = null;
  contenido: string = '';
  usuarios: any[] = [];
  showDialog = false;
  idEnviar: any;


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
  constructor(private route: ActivatedRoute, private backandService: BackendService,
    private renderer: Renderer2, private dialog: MatDialog, private sessionStorageService: SessionStorageService,
    private router: Router) {
    
  }

  ngOnInit(): void {
    // Para acceder a la variable almacenada en la sesión desde el nuevo componente
    this.usuarioSesion = this.sessionStorageService.getItem('usuarioPrincipal');
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          
          this.fotoPerfil(this.usuario);
          this.obtenerUsuarios();
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  fotoPerfil(usuario: any) {
    if (usuario.foto_perfil) {
      this.foto = true;
    }
  }

  
  recargarPagina() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }

  obtenerConversaciones(): void {
    this.backandService.obtenerConversaciones(this.id, this.idEnviar).subscribe(
      (conversaciones) => {
        console.log(conversaciones);
        this.conversaciones = conversaciones.sort((a:any, b:any) => {
          const fechaA = new Date(a.fecha_envio);
          const fechaB = new Date(b.fecha_envio);
          return fechaA.getTime() - fechaB.getTime();
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }
  

  seleccionarUsuario(event: Event) {
    const usuarioId = (event.target as HTMLInputElement).value;
    this.idUsuarioRecibe = usuarioId ? Number(usuarioId) : null;
    this.idEnviar = usuarioId;
    this.obtenerConversaciones();
  }
  
  obtenerUsuarios() {
    this.backandService.obtenerDatos().subscribe(
      response => {
        this.usuarios = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  crearMensaje() {
    if (this.idUsuarioRecibe) {
      console.log(this.idUsuarioRecibe);
      const mensaje = {
        contenido: this.contenido,
        id_usuario_envia: this.usuario.id,
        id_usuario_recibe: this.idUsuarioRecibe
      };
      console.log(mensaje);
      this.backandService.crearMensaje(mensaje).subscribe(
        (response) => {
          // El mensaje se ha enviado correctamente, puedes realizar acciones adicionales si es necesario
          this.contenido = ''; // Limpiar el campo de entrada del mensaje
          this.idUsuarioRecibe = 0; // Reiniciar la selección del usuario destinatario
        },
        (error) => {
          console.error(error);
        }
      );
    
    } else {
      console.log('Por favor, selecciona un usuario destinatario.');
    }
    //this.recargarPagina();
  }
}
