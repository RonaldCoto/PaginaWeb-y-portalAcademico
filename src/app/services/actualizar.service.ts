import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ActualizarService {

  constructor() { }
  /* -------------------PARA ACTUALIZAR CURSOS/EMPLEADOS/FEDERADOS/EVALUACIONES/PUBLICACIONES/NOTAS-----------------*/
  
 // Funcion que almacena el id del campo seleccionado
 setSelectedId(idselected) {
  localStorage.setItem('SelectedId', idselected);
 }
 //Funcion que retorna el id del dal campo seleccionado
 getSelectedId() {
  return localStorage.getItem('SelectedId');
  }
  //eliminacion del id
  deleteSelectedId() {
    localStorage.removeItem('SelectedId');
   
    }


     /* -------------------PARA ACCIONES CON CURSOS-----------------*/
  
 // Funcion que almacena el id del curso seleccionado
 setSelectedIdc(idselected) {
  localStorage.setItem('SelectedIdc', idselected);
 }
 //Funcion que retorna el id del dal campo seleccionado
 getSelectedIdc() {
  return localStorage.getItem('SelectedIdc');
  }
  //eliminacion del id
  deleteSelectedIdc() {
    localStorage.removeItem('SelectedIdc');
   
    }
  



}
