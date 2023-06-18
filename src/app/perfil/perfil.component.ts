import { Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../services/backend.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { SessionStorageService } from '../services/session-storage.service';



@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  id: any;
  usuario: any;
  foto: boolean = false;
  palabrasMasRepetidas: any[] = [];
  publicaciones: any[] = [];
  usuarioSesion: any;
  seguido: boolean = false;
  seguidor!: string;
  showDialog = false;



  openDialog2() {
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
    this.listarTodasPublicaciones();
  }

  ngOnInit(): void {
    // Para acceder a la variable almacenada en la sesión desde el nuevo componente
    this.usuarioSesion = this.sessionStorageService.getItem('usuarioPrincipal');
    this.route.params.subscribe(params => {
      this.backandService.listarUno(params['id']).subscribe(
        response => {
          this.usuario = response;
          this.id = this.usuario.id;
          this.listarPublicaciones(this.id);
          this.fotoPerfil(this.usuario);
          this.comprobarUsuario(response);
        },
        error => {
          console.log(error);
        }
      );
    });
  }
  


  listarPublicaciones(userId: any) {
    userId = this.id;
    this.backandService.listarPublicacionesUsuario(userId).subscribe(
      (response) => {
        this.publicaciones = response;
      },
      (error) => {
        console.error(error);
      }
    )
  };



  getTimeElapsed(fechaPublicacion: string): string {
    const fechaCreacion = new Date(fechaPublicacion);
    const fechaActual = new Date();

    const diferencia = Math.abs(fechaActual.getTime() - fechaCreacion.getTime());
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);

    if (dias > 0) {
      return ` ${dias} dias`;
    } else if (horas > 0) {
      return ` ${horas} horas`;
    } else if (minutos > 0) {
      return ` ${minutos} minutos`;
    } else {
      return 'Ahora mismo';
    }
  }

  recargarPagina() {
    this.renderer.setProperty(window, 'location', window.location.href);
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: "50%",
      height: "72%",
      position: { top: "-20%", left: "25%" },
      data: { "usuario": this.usuario }
    });

  }
  fotoPerfil(usuario: any) {
    if (usuario.foto_perfil) {
      this.foto = true;
    }
  }
  listarTodasPublicaciones() {
    this.backandService.listarPublicaciones().subscribe(
      (response) => {
        this.contarPalabras(response);
      }
      ,
      (error) => {
        console.error(error);
      }
    );
  }

  contarPalabras(publicaciones: any[]): void {
    const palabras: { [palabra: string]: number } = {};
    // Recorrer las publicaciones
    for (const publicacion of publicaciones) {
      const mensaje = publicacion.contenido.mensaje;
      // Separar el mensaje en palabras
      const palabrasMensaje = mensaje.split(' ');
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

  seguir() {

    let fecha = new Date();

    let anio = fecha.getFullYear(); // Obtiene el año en formato AAAA
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Obtiene el mes en formato MM
    let dia = fecha.getDate().toString().padStart(2, '0'); // Obtiene el día en formato DD

    let horas = fecha.getHours().toString().padStart(2, '0'); // Obtiene las horas en formato HH
    let minutos = fecha.getMinutes().toString().padStart(2, '0'); // Obtiene los minutos en formato MI
    let segundos = fecha.getSeconds().toString().padStart(2, '0'); // Obtiene los segundos en formato SS

    let formatoBase = `${anio}-${mes}-${dia} ${horas}:${minutos}:${segundos}`;

    const seguidor = {
      fecha: formatoBase,
      seguidor_id: this.usuario.id,
      seguido_id: this.usuarioSesion.id
    };
    this.backandService.seguidorNuevo(seguidor).subscribe(
      (response) => {
       console.log(response);
      }
      ,
      (error) => {
        console.error(error);
      }
    );
  }

  comprobarUsuario(usuario: any) {
    const comprobar = {
      seguidor_id: this.usuarioSesion.id,
      seguido_id: usuario.id
    };
  
    this.backandService.comprobarSeguidor(comprobar).subscribe(
      response => {
        console.log(response);
        if (response.id) {
          
          this.seguido = true;
          console.log(this.seguido);
        }
      },
      error => {
        console.error(error);
      }
    );
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
}