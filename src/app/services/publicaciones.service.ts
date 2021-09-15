import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PublicacionesService {
  url = 'http://localhost/recursos/crud_publicaciones/';
  constructor(private http: HttpClient) { }
 //insertar una nueva publicacion
 agregar_publicacion(publicacion) {
  return this.http.post(`${this.url}insertar_publicacion.php`, JSON.stringify(publicacion));
}
  //obtener todos los datos de una publicacion
  seleccionar(codigo:number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
    }
    //editar datos de una publicacion
    modificacion(evaluacion) {
      return this.http.post(`${this.url}modificacion.php`, JSON.stringify(evaluacion));
      } 
 //eliminar una publicacion
 baja(codigo:number) {
  return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }
  
  //obtener las publicaciones de un instructor
  lista_pubs_instructor(codigo: number) {
    return this.http.get(`${this.url}listar_publicaciones_instructor.php?codigo=${codigo}`);
  }


}
