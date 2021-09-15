import { Component, OnInit } from '@angular/core';
import { EvaluacionesService } from '../../services/evaluaciones.service';
import { AsignacionesCursosService } from '../../services/asignaciones-cursos.service';
import { AuthService } from "../../services/auth.service";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addevaluacion',
  templateUrl: './addevaluacion.component.html',
  styleUrls: ['./addevaluacion.component.css']
})
export class AddevaluacionComponent implements OnInit {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
  //objeto que almacena los datos de la evaluacion para insterarlos en la bdd
  evalua = {
    id: 0,
    nombre: null,
    descripcion: null,
    porcentaje: null,
    multimedia: null,
    fecha_inicio: null,
    fecha_fin: null,
    id_curso: null,
    base64textString: null
  }
  //arreglo que almacena el id y nombre de los cursos en INICIADO y que esten asignados al instructor Logueado
  cursos = null;
  constructor(public authService: AuthService, private evaluacionServicio: EvaluacionesService,
    private asignacionesCursosService: AsignacionesCursosService, public toastr: ToastrService) {

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
  ngOnInit(): void {
    //metodo que consume el servicio asignacionCurso para obtener los datos de cursos en los que...
    //este asignado el instructor Logueado y que esten en estado INICIADO
    const IdInstructor = this.usuario.id_emp;
    this.asignacionesCursosService.seleccionar_cursos_asignados_SI(IdInstructor).subscribe(
      result1 => this.cursos = result1

    );
  }


  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.authService.deleteToken();
    window.location.href = "/login";

  }

  //evento para subida de archivo
  seleccionarArchivo(event) {
    var files = event.target.files;
    let file = files[0];
    this.evalua.multimedia = file.name;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.evalua.base64textString = btoa(binaryString);
  }



  //metodo que consume el servicio de evaluaciones para agregar una nueva evaluacion
  alta() {

    this.evaluacionServicio.alta(this.evalua).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success(datos['mensaje'], 'Perfecto!');

        this.evalua = {
          id: 0,
          nombre: null,
          descripcion: null,
          porcentaje: null,
          multimedia: null,
          fecha_inicio: null,
          fecha_fin: null,
          id_curso: null,
          base64textString: null
        }
      } else {
        this.toastr.error(datos['mensaje'], 'Error!');
      }
    });
  }


}
