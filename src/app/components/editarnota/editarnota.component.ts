import { Component, OnInit } from '@angular/core';
import { ActualizarService } from '../../services/actualizar.service';
import { NotasService } from '../../services/notas.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EvaluacionesService } from '../../services/evaluaciones.service';
import { AuthService } from "../../services/auth.service";
import { MatriculasService } from "../../services/matriculas.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editarnota',
  templateUrl: './editarnota.component.html',
  styleUrls: ['./editarnota.component.css']
})
export class EditarnotaComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //variable que almacena la nueva nota
  nota_nueva: number = 0;

  //objeto que almacena los datos de la nota para actualizar
  nota = {
    nota: null,
    id_matricula: null,
    nombre: "",
    apellido: "",
    nombre_evaluacion: null,
    promedio: null,
    porcentaje: null,
    id_evaluacion: null
  };



  //arreglo para almacenar datos de evaluaciones disponibles según el curso
  evaluaciones = null;
  //variable que almacena la nota actual según la evaluación seleccionada en el select 
  selectedEv: number;

  //evento que se ejecuta tras seleccionar una opcion del select para evaluaciones
  selectChangeHandler(event: any) {
    //recorremos el arreglo donde se almacenan las evaluaciones y comparamos con "event.target.value"...
    //el cual almacena el "id_evaluacion" seleccionada
    this.evaluaciones.forEach(element => {
      if (element.id_evaluacion == event.target.value) {
        this.selectedEv = element.nota;

      }
    });
  }

  constructor(public authService: AuthService, public notasService: NotasService,
    public evaluacionesService: EvaluacionesService, public actualizarService: ActualizarService,
    public matriculaService: MatriculasService, public toastr: ToastrService) {
    authService.getLoggedInName.subscribe(name => this.changeName(name));
    if (this.authService.isLoggedIn()) {

      this.loginbtn = false;
      this.logoutbtn = true
    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false
    }
  }
  ngOnInit() {

    let id_matricula = this.actualizarService.getSelectedId();

    let id_curso = this.actualizarService.getSelectedIdc();
    //metodo que consume el servicio de notas para listar las evaluaciones y su nota segun el federado y curso seleccioado
    this.notasService.seleccionar_notas_federado(parseInt(id_matricula), parseInt(id_curso)).subscribe(result2 =>
      this.evaluaciones = result2

    );
    //utilizamos el mismo metodo anterior pero solo recogemos un objeto para llenar inputs del formulario
    this.notasService.seleccionar_notas_federado(parseInt(id_matricula), parseInt(id_curso)).subscribe(result2 =>
      this.nota = result2[0]
    );

    //limpiamos el id del federado seleccionado despues de cargar el formulario
    this.actualizarService.deleteSelectedId();
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.authService.deleteToken();
    window.location.href = "/login";

  }



  //metodo que consume el servicio de notas para modificar una nota segun el curso, evaluacion y federado seleccioado
  modificacion() {
    if (this.nota_nueva > 10) {
      this.toastr.error('La nota ingresada es mayor a 10', 'Error!');
    } else {
      this.nota.nota = this.nota_nueva;


      this.notasService.modificacion(this.nota).subscribe(datos => {
        if (datos['resultado'] == 'OK') {
          this.toastr.success(datos['mensaje'], 'Perfecto!');
          window.location.href = "/list-federados";
          
        } else {
          this.toastr.error(datos['mensaje'], 'Error!');
        }
      });
    }
  }

}
