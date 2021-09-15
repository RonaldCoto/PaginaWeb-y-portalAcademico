import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url = 'http://localhost/recursos/crud_cursos/';
  constructor(private http: HttpClient) { }
  //lista de todos los cursos en ALTA o VISUAL
  listar() {
    return this.http.get(`${this.url}listar.php`);
  }
  //lista de todos los cursos
  listar_finalizado() {
    return this.http.get(`${this.url}listar_finalizado.php`);
  }
  //insertar un nuevo curso
  alta(curso) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(curso));
  }
  //eliminar un curso
  baja(codigo: number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }
  //obtener todos los datos de un curso
  seleccionar(codigo: number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  }
  //editar datos de un curso
  modificacion(curso) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(curso));
  }

  listar_cursos_visual() {
    return this.http.get(`${this.url}cursos_visual.php`);
  }

  // Funcion que almacena el id del curso seleccionado
  setSelectedIdCurso(idselected) {
    localStorage.setItem('IdcursoDetalle', idselected);
  }

  listar_cursos_visual_detalle(codigo: number) {
    return this.http.get(`${this.url}detalle_curso.php?codigo=${codigo}`);
  }

  setSelectedIdc(idselected) {
    localStorage.setItem('SelectedIdcursfinal', idselected);
  }


}
