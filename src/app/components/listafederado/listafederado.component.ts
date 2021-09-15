import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { MatriculasService } from 'src/app/services/matriculas.service';
import {ActualizarService} from 'src/app/services/actualizar.service'
@Component({
  selector: 'app-listafederado',
  templateUrl: './listafederado.component.html',
  styleUrls: ['./listafederado.component.css']
})
export class ListafederadoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

//arreglo que almacena a los federados y su id_matricula segun el curso seleccionado
federados =null;

//objeto que almacena el nombre del curso seleccionado
curso={
  id_matricula:null, 
  nombre:null, 
  apellido:null,
  email:null,
  nombrecurso:null
};

  constructor(public authService: AuthService, public matriculasService: MatriculasService,
    public actualizarService: ActualizarService) { 
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
    this.authService.deleteToken();
    window.location.href = "/login";
    
    }

    ngOnInit() {
     let id_curso = this.actualizarService.getSelectedIdc();
    
      //utilizamos el mismo metodo que genera un arreglo de federados pero en este caso solo capturamos un objeto...
//para extraer el nombre del curso
this.matriculasService.seleccionar_federados_del_curso(parseInt(id_curso)).subscribe(result2 => this.curso = result2[0]);
           //invocando metodo para lista de federados     
           this.ListarFederados(id_curso);
          
      
  
    }
 //metodo que consume el servicio de matriculas para listar.
 ListarFederados(codigo) {
  //se consume el servicio de matriculas, invocando el metodo que trae a todos los federados...
// matriculados en el curso seleccionado
this.matriculasService.seleccionar_federados_del_curso(parseInt(codigo)).subscribe(result => this.federados = result);

 }

//metodo que invoca al servicio "actualizarService" donde se almacenan el id_matricula del federado seleccionado
seleccionar(codigo) {
  this.actualizarService.setSelectedId(codigo);
}


}
