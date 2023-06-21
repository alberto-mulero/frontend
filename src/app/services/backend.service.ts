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
    const url = 'https://backend-production-3fb8.up.railway.app/';
    return this.http.get(url + 'usuarios');
  }

  registrarUsuario(usuario: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
   
    return this.http.post(url + 'usuarios', usuario);
  }

  comprobarUsuario(usuario: any): Observable<any> {
   
    const url = 'https://backend-production-3fb8.up.railway.app/';
   
    return this.http.post(url + 'usuarios/comprobarUsuario', usuario);
  }

  listarUno(id: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/usuarios/' + id;
   
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
  
    const url = 'https://backend-production-3fb8.up.railway.app/';
  
    return this.http.post(url + 'publicaciones', formData);
  }
  
  
  

  listarPublicaciones(): Observable<any[]> {
    const url = 'https://backend-production-3fb8.up.railway.app/publicaciones';
    return this.http.get<any[]>(url);
  }

  obtenerUsuariosSeguidos(userId: any): Observable<any> {
    const params = new HttpParams().set('userId', userId);
    const url = 'https://backend-production-3fb8.up.railway.app/seguidos/';
    return this.http.get(url,{params});
  }

  darMeGusta(id_publicacion: number, id_usuario: number): Observable<any> {
    const data = {
      id_usuario: id_usuario,
      id_publicacion: id_publicacion
    };  
    return this.http.post<any>('https://backend-production-3fb8.up.railway.app/megustas', data);
  }
  darReblub(id_publicacion: number, id_usuario: number): Observable<any> {
    const data = {
      id_usuario: id_usuario,
      id_publicaciones: id_publicacion
    };  
    return this.http.post<any>('https://backend-production-3fb8.up.railway.app/reblabbers', data);
  }

  actualizarPerfil(usuario: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
    const formData = new FormData();
    formData.append('id', usuario.id);
    formData.append('nombre_usuario', usuario.nombre_usuario);
    formData.append('fecha_nacimiento', usuario.fecha_nacimiento);
    formData.append('foto_perfil', usuario.foto_perfil);
    formData.append('biografia', usuario.biografia);

    return this.http.post(url + 'usuarios/actualizar', formData);
  }
  agregarRespuesta(idPublicacion: number, idUsuario: number, nuevoComentario: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/comentarios';
     // Ruta del controlador en Sails
    const respuesta = {
      contenido: nuevoComentario.contenido,
      fecha_contenido: nuevoComentario.fecha_contenido,
      num_mg: nuevoComentario.num_mg,
      id_usuario: idUsuario,
      id_publicaciones: idPublicacion
  };


    return this.http.post(url, respuesta);
  }

  obtenerComentarios(publicacionId: number) {
    const url = 'https://backend-production-3fb8.up.railway.app/comentarios/' + publicacionId;
     
    return this.http.get(url);
  }

  listarPublicacionesUsuario(userId: any): Observable<any[]> {
    const url = 'https://backend-production-3fb8.up.railway.app/publicaciones/' + userId;
    return this.http.get<any[]>(url);
  }


  obtenerNotificaciones(): Observable<any> {
    const url = `https://backend-production-3fb8.up.railway.app/notificaciones`;
    
   
    return this.http.get(url);
  }
  
  comprobarUsuarioArroba(usuario: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
   
    return this.http.post(url + 'usuarios/comprobarUsuarioArroba', {"usuario": usuario});
  }

  seguidorNuevo(seguidores: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
   
    return this.http.post(url + 'seguidorNuevo',seguidores);
  }
  comprobarSeguidor(comprobar: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
    return this.http.post(url + 'seguirUsuario' , comprobar);
  }

  obtenerConversaciones(id:number ,usuarioId: number): Observable<any> {
    const usuarioIds = {
      id_usuario_envia: id,
      usuarioId: usuarioId
    }
    const url = 'https://backend-production-3fb8.up.railway.app/';
    // const params = new HttpParams().set('usuarioId', usuarioId);
    // console.log(params);
    
    return this.http.post(url + 'comprobarMensajes', usuarioIds);
  }

  crearMensaje(mensaje: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
    return this.http.post(url + 'mensajes', mensaje);
  }

  eliminarPublicacion(id: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
    return this.http.delete(url + 'publicaciones/' + id);
  }
  notificacionUsuario(id: any): Observable<any> {
    const url = 'https://backend-production-3fb8.up.railway.app/';
    return this.http.post(url + 'notificacion', id);
  }
}

