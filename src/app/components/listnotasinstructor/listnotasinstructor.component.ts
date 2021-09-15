import { Component, OnInit } from '@angular/core';
import { ActualizarService} from '../../services/actualizar.service';
import { NotasService} from '../../services/notas.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EvaluacionesService} from '../../services/evaluaciones.service';
import { AuthService } from "../../services/auth.service";
import { MatriculasService } from "../../services/matriculas.service";
@Component({
  selector: 'app-listnotasinstructor',
  templateUrl: './listnotasinstructor.component.html',
  styleUrls: ['./listnotasinstructor.component.css']
})
export class ListnotasinstructorComponent implements OnInit {
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo que almacena la lista de notas según la evaluación seleccionada
  notas = null;

  //objeto que almacena loa datos de la evaluacion a listar
  evaluacion={
    nombre:null,
    apellido:null,
    nota:null,
    promedio:null,
    porcentaje:null,
    nombre_evaluacion:null
  }
  constructor(public authService: AuthService, public notasService: NotasService,
    public evaluacionesService: EvaluacionesService,public actualizarService: ActualizarService,
    public matriculaService:MatriculasService) { 
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

    ngOnInit() {
      let id_evaluacion = this.actualizarService.getSelectedId();
       //utilizamos el servicio de notas para activar el metodo que lista a los federados y sus notas...
       //segun la evaluacion seleccionada 
 this.notasService.listar(parseInt(id_evaluacion)).subscribe(result2 => this.notas = result2);
   //utilizamos el mismo metodo que genera un arreglo de notas pero en este caso solo capturamos un objeto...
//para extraer el nombre de la evaluacion
this.notasService.listar(parseInt(id_evaluacion)).subscribe(result => this.evaluacion = result[0]);
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
}
