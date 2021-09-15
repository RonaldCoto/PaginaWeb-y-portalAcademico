import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class EmpleadosService {
  url = 'http://localhost/recursos/crud_empleados/';
  constructor(private http: HttpClient) { }
  //lista de todos los empleados excepto el empleado que solicita los datos 
  listar(codigo: number) {
    return this.http.get(`${this.url}listar.php?codigo=${codigo}`);
  }
  //insertar nuevo empleado
  alta(empleado) {
    return this.http.post(`${this.url}alta.php`, JSON.stringify(empleado));
  }
  //eliminar un empleado
  baja(codigo: number) {
    return this.http.get(`${this.url}baja.php?codigo=${codigo}`);
  }
  //obtener todos los datos de un empleado
  seleccionar(codigo: number) {
    return this.http.get(`${this.url}seleccionar.php?codigo=${codigo}`);
  }
  //editar datos de un empleado
  modificacion(empleado) {
    return this.http.post(`${this.url}modificacion.php`, JSON.stringify(empleado));
  }
  //obtener todos los empleados que sean instructores y esten de alta 
  lista_de_alta() {
    return this.http.get(`${this.url}listar_dealta_inst.php?codigo`);
  }
 
}
