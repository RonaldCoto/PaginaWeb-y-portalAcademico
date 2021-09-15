import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class NotasService {

  url='http://localhost/recursos/crud_notas/'; 
  constructor(private http: HttpClient) { }
  
      //matricula de federado en curso seleccionado
    alta(nota) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(nota));
    }
     //editar datos de nota
  modificacion(nota) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(nota));
  }
  //lista de notas segun la evaluacion seleccionada
  listar(codigo: number) {
    return this.http.get(`${this.url}listar.php?codigo=${codigo}`);
  }
    //obtener todos los federados matriculados en el curso seleccionado
  seleccionar_federados_del_curso(codigo: number) {
    return this.http.get(`${this.url}seleccionar_federados_del_curso.php?codigo=${codigo}`);
  }

  //obtener nota actual del federado seleccionado segun la evaluación seleccionada
  seleccionar_notas_federado(codigo: number,codigo2: number) {
    return this.http.get(`${this.url}seleccionar_notas_federado.php?codigo=${codigo}&codigo2=${codigo2}`);
  }
}
