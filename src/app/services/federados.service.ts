import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class FederadosService {
  url = 'http://localhost/recursos/crud_federados/';
  constructor(private http: HttpClient) { }
  //lista de todos los federados
  listar() {
    return this.http.get(`${this.url}listar.php`);
  }
  //insertar nuevo federado
  alta(federado) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(federado));
  }
  //eliminar un federado
  baja(codigo: number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }
  //obtener todos los datos de un federado
  seleccionar(codigo: number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  }
  //editar datos de un federado
  modificacion(federado) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(federado));
  }
  //lista todos los federados con estado en "ALTA"
  lista_de_alta() {
    return this.http.get(`${this.url}listar_dealta.php`);
  }
  //lista todos los cursos con el id del federado logueado
  lista_cursos(codigo: number) {
    return this.http.get(`${this.url}listar_cursos.php?codigo=${codigo}`);
  }

  //lista todas las publicaciones de los cursos que tiene inscrito con el id del federado logueado
  lista_publicaciones(codigo: number, idcurso: number) {
    return this.http.get(`${this.url}listar_publicaciones.php?codigo=${codigo}&idcurso=${idcurso}`);
  }

  // Funcion que almacena el id del curso seleccionado
  setSelectedIdCurso(idselected) {
    localStorage.setItem('SelectedIdCurso', idselected);
  }

  //lista todas las evaluaciones de los cursos que tiene inscrito con el id del federado logueado
  lista_evaluaciones(idcurso: number) {
    return this.http.get(`${this.url}lista_evaluaciones_por_curso.php?idcurso=${idcurso}`);
  }


  //lista todas las notas de las evaluaciones de los cursos que tiene inscrito con el id del federado logueado
  lista_notas(codigo: number) {
    return this.http.get(`${this.url}notas.php?codigo=${codigo}`);
  }

  //lista todos los cursos finalizados con el id del federado logueado
  lista_cursos_finalizado(codigo: number) {
    return this.http.get(`${this.url}list_cursos_finalizado.php?codigo=${codigo}`);
  }

  //lista todas las notas de curso finalizado segun la persona logueada
  lista_notas_cursofinalizado(codigo: number, codigo2: number) {
    return this.http.get(`${this.url}listar_notas_curso_finalizado.php?codigo=${codigo}&codigo2=${codigo2}`);
  }
}
