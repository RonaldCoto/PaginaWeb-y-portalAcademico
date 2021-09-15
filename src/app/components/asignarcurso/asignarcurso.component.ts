import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CursosService } from '../../services/cursos.service';
import { FederadosService } from '../../services/federados.service';
import { AsignacionesCursosService} from '../../services/asignaciones-cursos.service';
import { MatriculasService} from '../../services/matriculas.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-asignarcurso',
  templateUrl: './asignarcurso.component.html',
  styleUrls: ['./asignarcurso.component.css']
})
export class AsignarcursoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo que almacena a federados en estado de ALTA y BAJA
  federados_pro=null;
  //arreglo para almacenar datos de federados en ALTA (se llena con .push por lo que no debe ser "=null")
  federados=[];
  
  //arreglo que almacena los datos de asignaciones, instructores y cursos-asignados para listar
  asignaciones=null;
  //objeto que almacena los datos del instructor a cargo del curso seleccionado
  instructor={
    nombre:null,
    apellido:null,
    estado:null
  };
 //objeto que almacena los datos de la matricula a insertar
  matricula={
    id_asignacion_curso:null,
    id_federado:null
  }

 //variable que almacena el nombre del instructor segun el curso seleccionado
  selectedIns: string = '';

  //evento que se ejecuta tras seleccionar una opcion del select para cursos
  selectChangeHandler (event: any) {
    //recorremos el arreglo donde se almacenan los intructores y comparamos con "event.target.value"...
    //el cual almacena el "id_asignacion_curso" seleccionado
   this.asignaciones.forEach(element => {
     if(element.id_asignacion_curso == event.target.value){
  this.selectedIns = element.instructor+" "+element.apellido;
}
   });
  }
  constructor(public authService: AuthService,public federadoServicio: FederadosService,
    public asignacionCursoService: AsignacionesCursosService,public matriculaService: MatriculasService,
    private confirmationDialogService: ConfirmationDialogService,public toastr: ToastrService) { 

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
     //metodo que consume el servicio de federados para listar los que estan de ALTA.
   this.listafederados();
  //metodo que consume el servicio asignacionCurso para obtener los datos de cursos que tengan... 
  //un instructor y esten en estado INICIADO
 this.asignacionCursoService.seleccionar_cursos_asignados_iniciados().subscribe(
  result1 => this.asignaciones = result1
  
  );  
       }

       listafederados(){
        this.federadoServicio.lista_de_alta().subscribe(result => {
          //almacenamos a los federados en estado de ALTA y BAJA
          this.federados_pro = result;
          //Recorremos el arreglo y excluimos a los que estan de BAJA
          this.federados_pro.forEach(element => {
            if(element.estado == "ALTA"){
              //almacenamos unicamente a los federados en estado de ALTA
              this.federados.push(element);
             
            }
          });
        });
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
   
 //metodo que consume el servicio de matriculas para agregar una nueva matricula
 alta() {
  this.confirmationDialogService.confirm('¡ALERTA!', 'Esta a punto de asignar a un federado en un curso.\nSi lo hace este federado no podrá ser eliminado ni removido del curso.\n¿Desea continuar?')
  .then((confirmed) =>{

  if (confirmed) {

    this.matriculaService.alta(this.matricula).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success(datos['mensaje'], 'Perfecto!');
       
      this.matricula={
        id_asignacion_curso:null,
        id_federado:null
      }
      this.selectedIns= '';
      this.federados=[];
      this.listafederados();
      }else{
        this.toastr.error(datos['mensaje'], 'Error!');
      }
      });
   
  }
})
.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

 }

}
