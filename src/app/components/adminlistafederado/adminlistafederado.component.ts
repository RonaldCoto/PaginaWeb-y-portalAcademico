import { Component, OnInit } from '@angular/core';
import { MatriculasService } from '../../services/matriculas.service';
import { ActualizarService } from '../../services/actualizar.service';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminlistafederado',
  templateUrl: './adminlistafederado.component.html',
  styleUrls: ['./adminlistafederado.component.css']
})
export class AdminlistafederadoComponent implements OnInit {
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar federados
  federados = null;

  //objeto que almacena el nombre del curso seleccionado
curso={
  id_matricula:null, 
  nombre:null, 
  apellido:null,
  email:null,
  nombrecurso:null
};

  constructor(public authService: AuthService,private matriculaServicio: MatriculasService,
    private router:Router,
    private actualizarService: ActualizarService) {
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
  
    ngOnInit(): void {
     let CodCurso = this.actualizarService.getSelectedIdc();

     //utilizamos el mismo metodo que genera un arreglo de federados pero en este caso solo capturamos un objeto...
//para extraer el nombre del curso
this.matriculaServicio.seleccionar_federados_del_curso(parseInt(CodCurso)).subscribe(result2 => this.curso = result2[0]);
      //invocando metodo para lista de federados
      this.ListarFederados(CodCurso);
   
    }
  //metodo que consume el servicio de matriculas para listar.
    ListarFederados(codigo) {
      this.matriculaServicio.seleccionar_federados_del_curso(parseInt(codigo)).subscribe(result => this.federados = result);
    
      }
  //metodo que invoca al servicio "actualizar" donde se almacenan los id 
        listar_notas(codigo){
          
          this.actualizarService.setSelectedId(codigo);
         
        }
}
