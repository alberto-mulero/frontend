import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  obtenerDatos(): Observable<any> {
    const url = 'http://localhost:1337/';
    return this.http.get(url + 'usuarios');
  }

  registrarUsuario(usuario: any): Observable<any> {
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios', usuario);
  }

  comprobarUsuario(usuario: any): Observable<any> {
   
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios/comprobarUsuario', usuario);
  }

  listarUno(id: any): Observable<any> {
    const url = 'http://localhost:1337/usuarios/' + id;
   
    return this.http.get(url);
  }

  registrarPublicacion(publicacion: any): Observable<any> {
    const formData = new FormData();
    formData.append('contenido', publicacion.contenido);
    formData.append('fecha_publicacion', publicacion.fecha_publicacion);
    formData.append('num_mg', publicacion.num_mg);
    formData.append('num_comentarios', publicacion.num_comentarios);
    formData.append('id_usuario', publicacion.id_usuario);
    formData.append('imagen', publicacion.imagen);
    console.log(formData);
  
    const url = 'http://localhost:1337/';
  
    return this.http.post(url + 'publicaciones', formData);
  }
  
  
  

  listarPublicaciones(): Observable<any[]> {
    const url = 'http://localhost:1337/publicaciones';
    return this.http.get<any[]>(url);
  }

  obtenerUsuariosSeguidos(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    const url = 'http://localhost:1337/seguidos/';
    return this.http.get(url,{params});
  }

  darMeGusta(id_publicacion: number, id_usuario: number): Observable<any> {
    const data = {
      id_usuario: id_usuario,
      id_publicacion: id_publicacion
    };  
    return this.http.post<any>('http://localhost:1337/megustas', data);
  }
  darReblub(id_publicacion: number, id_usuario: number): Observable<any> {
    const data = {
      id_usuario: id_usuario,
      id_publicaciones: id_publicacion
    };  
    console.log(data);
    return this.http.post<any>('http://localhost:1337/reblabbers', data);
  }

  actualizarPerfil(usuario: any): Observable<any> {
    const url = 'http://localhost:1337/';
    const formData = new FormData();
    formData.append('id', usuario.id);
    formData.append('nombre_usuario', usuario.nombre_usuario);
    formData.append('fecha_nacimiento', usuario.fecha_nacimiento);
    formData.append('foto_perfil', usuario.foto_perfil);
    formData.append('biografia', usuario.biografia);
    console.log(formData);

    return this.http.post(url + 'usuarios/actualizar', formData);
  }
  agregarRespuesta(idPublicacion: number, idUsuario: number, nuevoComentario: any): Observable<any> {
    const url = 'http://localhost:1337/comentarios';
     // Ruta del controlador en Sails
    const respuesta = {
      contenido: nuevoComentario.contenido,
      fecha_contenido: nuevoComentario.fecha_contenido,
      num_mg: nuevoComentario.num_mg,
      id_usuario: idUsuario,
      id_publicaciones: idPublicacion
  };

  console.log(respuesta);

    return this.http.post(url, respuesta);
  }

  obtenerComentarios(publicacionId: number) {
    const url = 'http://localhost:1337/comentarios/' + publicacionId;
     
    console.log(publicacionId)// Reemplaza con la URL correcta para obtener los comentarios de la publicación
    return this.http.get(url);
  }

  listarPublicacionesUsuario(userId: any): Observable<any[]> {
    const url = 'http://localhost:1337/publicaciones/' + userId;
    return this.http.get<any[]>(url);
  }


  obtenerNotificaciones(): Observable<any> {
    const url = `http://localhost:1337/notificaciones`;
    
   
    return this.http.get(url);
  }
  
  comprobarUsuarioArroba(usuario: any): Observable<any> {
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'usuarios/comprobarUsuarioArroba', {"usuario": usuario});
  }

  seguidorNuevo(seguidores: any): Observable<any> {
    const url = 'http://localhost:1337/';
   
    return this.http.post(url + 'seguidorNuevo/',seguidores);
  }
  comprobarSeguidor(comprobar: any): Observable<any> {
    const url = 'http://localhost:1337/';
    return this.http.post(url + 'seguirUsuario' , comprobar);
  }

  obtenerConversaciones(id:number ,usuarioId: number): Observable<any> {
    const usuarioIds = {
      id_usuario_envia: id,
      usuarioId: usuarioId
    }
    const url = 'http://localhost:1337/';
    // const params = new HttpParams().set('usuarioId', usuarioId);
    // console.log(params);
    console.log(url);
    
    return this.http.post(url + 'comprobarMensajes', usuarioIds);
  }

  crearMensaje(mensaje: any): Observable<any> {
    const url = 'http://localhost:1337/';
    return this.http.post(url + 'mensajes', mensaje);
  }

  eliminarPublicacion(id: any): Observable<any> {
    console.log(id);
    const url = 'http://localhost:1337/';
    return this.http.delete(url + 'publicaciones/' + id);
  }
}

