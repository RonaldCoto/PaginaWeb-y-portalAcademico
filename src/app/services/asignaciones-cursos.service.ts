import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AsignacionesCursosService {
  url = 'http://localhost/recursos/crud_asignaciones_cursos/';
  constructor(private http: HttpClient) { }

  //generar una asignacion de curso para empleado
  alta(asignacion_curso) {
    return this.http.post(`${this.url}alta.php`, asignacion_curso);
  }
  //obtener nombre de todos los cursos que ya tengan un instructor asignado y que tengan estado 'INICIADO'
  seleccionar_cursos_asignados_iniciados() {
    return this.http.get(`${this.url}seleccionar_cursos_asignados_iniciados.php`);
  }
  //obtener todos los datos de una asignacion dependiendo de un curso seleccionado
  seleccionar_empleados_asignados(codigo: number) {
    return this.http.get(`${this.url}seleccionar_empleados_asignados.php?codigo=${codigo}`);
  }
  //obtener todos los datos de un curso segun el instructor acargo seleccionado
  seleccionar_cursos_asignados_SI(codigo: number) {
    return this.http.get(`${this.url}seleccionar_cursos_asignados_segun_instructor.php?codigo=${codigo}`);
  }

  //obtener cursos de instructor segun su ID
  lista_cursos(codigo: number) {
    return this.http.get(`${this.url}listar_cursos_instructor.php?codigo=${codigo}`);
  }

  //obtener cursos de instructor segun su ID  
  lista_cursos_select(codigo: number) {
    return this.http.get(`${this.url}cursos_por_idinstructor.php?codigo=${codigo}`);
  }

}
