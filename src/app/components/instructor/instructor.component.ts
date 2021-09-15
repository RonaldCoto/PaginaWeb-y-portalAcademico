import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AsignacionesCursosService } from 'src/app/services/asignaciones-cursos.service';
import { ActualizarService } from 'src/app/services/actualizar.service';
@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.css']
})
export class InstructorComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
   //arreglo para almacenar cursos del instructor segun su ID
   ins = null;
  constructor(public authService: AuthService,
    public asignacionesCursosService: AsignacionesCursosService, public actualizarService: ActualizarService) { 
    authService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.authService.isLoggedIn())
    {
 
    this.loginbtn=false;
    this.logoutbtn=true
    }
    else{
    this.loginbtn=true;
    this.logoutbtn=false
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
    }
    logout()
    {
      //limpiamos el localstorage
      this.actualizarService.deleteSelectedIdc();
    this.authService.deleteToken();
    window.location.href = "/login";
    
    }

    ngOnInit() {
    
         //si hay un usuaro logueado
         if(this.usuario!=null)
       {
        //obtenemos el id del instructor logueado
         let codInstructor =  this.usuario.id_emp;
         //cargamos los datos de los cursos en los que el instructor logueado esta a cargo
         this.asignacionesCursosService.lista_cursos(parseInt(codInstructor)).subscribe(result => this.ins = result);
         
         
         
       }
       }

       //metodo que almacena el id del curso seleccionado
       seleccionar(codigo){
        this.actualizarService.setSelectedIdc(codigo);
       }
  

}
