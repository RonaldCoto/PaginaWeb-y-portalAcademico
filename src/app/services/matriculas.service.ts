import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class MatriculasService {
  url='http://localhost/recursos/crud_matriculas/'; 
  constructor(private http: HttpClient) { }
  
      //matricula de federado en curso seleccionado
    alta(matricula) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(matricula));
    }
    //obtener todos los federados matriculados en el curso seleccionado
  seleccionar_federados_del_curso(codigo: number) {
    return this.http.get(`${this.url}seleccionar_federados_del_curso.php?codigo=${codigo}`);
  }
  //obtener datos de un federado segun si id_matricula
  seleccionar_federados_matricula(codigo: number) {
    return this.http.get(`${this.url}seleccionar_federados_matricula.php?codigo=${codigo}`);
  }
   
}
