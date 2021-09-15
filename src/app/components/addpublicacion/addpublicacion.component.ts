import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EmpleadosService } from 'src/app/services/empleados.service';
import { AsignacionesCursosService } from 'src/app/services/asignaciones-cursos.service';
import { PublicacionesService } from 'src/app/services/publicaciones.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addpublicacion',
  templateUrl: './addpublicacion.component.html',
  styleUrls: ['./addpublicacion.component.css']
})
export class AddpublicacionComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  //arreglo que almacena los cursos para el select
  curs = null;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //objeto que almacena los datos del curso para insterarlos en la bdd
  pub = {
    id: 0,
    titulo: null,
    descripcion: null,
    multimedia: null,
    id_asignacion_curso: null,
    base64textString: null
  }
  constructor(public authService: AuthService,
    public asignacionesCursosService: AsignacionesCursosService,
    public publicacionesService: PublicacionesService, public toastr: ToastrService) {
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

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.authService.deleteToken();
    window.location.href = "/login";

  }

  ngOnInit() {

    //si hay un empleado seleccionado para editar
    if (this.usuario != null) {
      //se consume el servicio de asignacionesCursos para listar los cursos en los que un...
      // instructor logueado puede publicar
      let codInstructor = this.usuario.id_emp;
      this.asignacionesCursosService.lista_cursos_select(parseInt(codInstructor)).subscribe(result => this.curs = result);
      //una vez traidos los datos limipiamos el id del localstorage

    }
  }

  //evento para subida de portada
  seleccionarArchivo(event) {
    var files = event.target.files;
    let file = files[0];
    this.pub.multimedia = file.name;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.pub.base64textString = btoa(binaryString);
  }

  //metodo que consume el servicio de publicaciones para agregar una nueva publicacion
  publicar() {

    this.publicacionesService.agregar_publicacion(this.pub).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success(datos['mensaje'], 'Perfecto!');

        this.pub = { id: 0, titulo: null, descripcion: null, multimedia: null, id_asignacion_curso: null, base64textString: null };
      } else {
        this.toastr.error(datos['mensaje'], 'Error!');
      }
    });
  }


}
