import { Component, Inject, Renderer2, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BackendService } from '../services/backend.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  constructor(private backandService: BackendService,
    private renderer: Renderer2,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  
  datosUsuario: any = {};
  fechaFormateada: any;
  onClose(): void {
    this.dialogRef.close();
  }
  ngOnInit(): void {
    const fecha_nacimiento = new Date(this.data.usuario.fecha_nacimiento);
   
    const dia = fecha_nacimiento.getDate();
    const mes = fecha_nacimiento.getMonth() + 1; // Los meses en JavaScript se indexan desde 0
    const anio = fecha_nacimiento.getFullYear();

  // Formatear la fecha como "dd/mm/aaaa"
    const fechaFormateada = `${anio}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
    this.datosUsuario.biografia = this.data.usuario.biografia;
    this.datosUsuario.fecha_nacimiento = fechaFormateada;
    this.datosUsuario.nombre_usuario = this.data.usuario.nombre_usuario;
  }

  
  
  onFechaNacimientoChange(value: any) {
    const fecha = value.target.value;
    this.datosUsuario.fecha_nacimiento = fecha;
    console.log(this.datosUsuario.fecha_nacimiento);
  }
  
    // Resto de tu código
  
  
  
 
  
  submitForm() {
    this.datosUsuario = {
      id: this.data.usuario.id,
      nombre_usuario: this.datosUsuario.nombre_usuario,
      foto_perfil: this.datosUsuario.foto_perfil,
      biografia: this.datosUsuario.biografia,
      fecha_nacimiento: this.datosUsuario.fecha_nacimiento,
    };
    this.backandService.actualizarPerfil(this.datosUsuario).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error(error);
      }
    );
    this.onClose();
    this.recargarPagina();
  }
  

  handleFileInput(event: any) {
    // Maneja el evento cuando se selecciona un archivo para la foto de perfil
    const file = event.target.files[0];
    this.datosUsuario.foto_perfil = file;
    console.log(this.datosUsuario.foto_perfil);
  }
  recargarPagina() {
    setTimeout(() => {
      this.renderer.setProperty(window, 'location', window.location.href);
    }, 1000); // Espera 1 segundo (1000 milisegundos) antes de recargar la página
  }
  
}
