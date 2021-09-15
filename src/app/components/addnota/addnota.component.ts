import { Component, OnInit } from '@angular/core';
import { ActualizarService } from '../../services/actualizar.service';
import { NotasService } from '../../services/notas.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EvaluacionesService } from '../../services/evaluaciones.service';
import { AuthService } from "../../services/auth.service";
import { MatriculasService } from "../../services/matriculas.service";
import { RouterEvent, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addnota',
  templateUrl: './addnota.component.html',
  styleUrls: ['./addnota.component.css']
})
export class AddnotaComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //objeto que almacena los datos de la nota para asignar
  nota = {
    id_nota: 0,
    id_evaluacion: null,
    nota: null,
    promedio: null,
    id_matricula: null
  };
  //objeto que almacena los datos del federado al que se le asignará la nota
  selectedFed = {
    nombre: null,
    apellido: null
  };

  //arreglo para almacenar datos de evaluaciones disponibles segun el curso
  evaluaciones = null;


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
    //metodo que consume el servicio de matriculas para obetener datos de federados segun su id_matricula
    this.matriculaService.seleccionar_federados_matricula(parseInt(id_matricula)).subscribe(result => this.selectedFed = result[0]);

    let id_curso = this.actualizarService.getSelectedIdc();
    //metodo que consume el servicio de evaluaciones para listar las evaluaciones segun el curso seleccionado
    this.evaluacionesService.seleccionar_evaluaciones_curso(parseInt(id_curso)).subscribe(result2 => this.evaluaciones = result2);
    this.nota.id_matricula = id_matricula;
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

  alta() {


    this.notasService.alta(this.nota).subscribe(datos => {
      if (datos['resultado'] == 'OK') {

        this.toastr.success(datos['mensaje'], 'Perfecto!');
        window.location.href = "/list-federados";


      } else {
        this.toastr.error(datos['mensaje'], 'Error!');
      }
    });
  }

}
