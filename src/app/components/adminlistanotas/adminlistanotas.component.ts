import { Component, OnInit } from '@angular/core';
import { ActualizarService} from '../../services/actualizar.service';
import { NotasService} from '../../services/notas.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EvaluacionesService} from '../../services/evaluaciones.service';
import { AuthService } from "../../services/auth.service";
import { MatriculasService } from "../../services/matriculas.service";
import { parse } from 'path';
@Component({
  selector: 'app-adminlistanotas',
  templateUrl: './adminlistanotas.component.html',
  styleUrls: ['./adminlistanotas.component.css']
})
export class AdminlistanotasComponent implements OnInit {
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar datos de evaluaciones  según el curso
  evaluaciones=null;
  //objeto que almacena datos del federado seleccionado
  federado={
    nota:null,
    id_matricula:null,
    nombre:"",
    apellido:"",
    nombre_evaluacion:null,
    promedio:null,
    porcentaje:null,
    id_evaluacion:null
  };
  //variable que almacena la suma de promedios
  suma=0.00;
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
    ngOnInit(){

      let id_matricula = this.actualizarService.getSelectedId();
      
      let id_curso = this.actualizarService.getSelectedIdc();
       //metodo que consume el servicio de notas para listar las evaluaciones y su nota segun el federado y curso seleccioado
        this.notasService.seleccionar_notas_federado(parseInt(id_matricula),parseInt(id_curso)).subscribe(result2 =>
        {  
          this.evaluaciones = result2
          this.evaluaciones.forEach(element => {
            this.suma+= parseFloat(element.promedio);
            this.suma= Number(this.suma.toFixed(2));
          });
        
        } 
         );
         this.notasService.seleccionar_notas_federado(parseInt(id_matricula),parseInt(id_curso)).subscribe(result2 =>
          this.federado = result2[0]
          );
         
          

         //limpiamos el id del federado seleccionado despues de cargar la tabla
         //this.actualizarService.deleteSelectedId();
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
