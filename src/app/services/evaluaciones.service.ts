import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EvaluacionesService {
  url = 'http://localhost/recursos/crud_evaluaciones/';
  constructor(private http: HttpClient) { }
  //lista de todas las evaluaciones
  listar() {
    return this.http.get(`${this.url}listar.php`);
  }
  //insertar una nueva evaluacion
  alta(evaluacion) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(evaluacion));
  }
  //eliminar una evaluacion
  baja(codigo: number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }
  //obtener todos los datos de una evaluacion
  seleccionar(codigo: number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  }
  //editar datos de una evaluacion
  modificacion(evaluacion) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(evaluacion));
  }

  //lista de evaluaciones de un instructor segun su id para cursos en estado INICIADO
  lista_evaluaciones_instructor(codigo: number) {
    return this.http.get(`${this.url}listar_evaluaciones_instructor.php?codigo=${codigo}`);
  }
  //lista de evaluaciones de un curso seleccionado
  seleccionar_evaluaciones_curso(codigo: number) {
    return this.http.get(`${this.url}seleccionar_evaluaciones_curso.php?codigo=${codigo}`);
  }
}
