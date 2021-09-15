import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { ActualizarService } from '../../services/actualizar.service';
import { CursosService } from '../../services/cursos.service';
import { EmpleadosService } from '../../services/empleados.service';
import { AsignacionesCursosService } from '../../services/asignaciones-cursos.service';
import { ActivatedRoute } from '@angular/router'
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-asignarcursoinstructor',
  templateUrl: './asignarcursoinstructor.component.html',
  styleUrls: ['./asignarcursoinstructor.component.css']
})
export class AsignarcursoinstructorComponent {
  loginbtn: boolean;
  logoutbtn: boolean;

  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
  //objeto que almacena los datos del curso para asignar
  curs = {
    id_curso: 0,
    nombre: null,
    descripcion: null,
    portada: null,
    imagen1: null,
    imagen2: null,
    imagen3: null,
    estado: null,
    id_empleado: null
  };
  //arreglo para almacenar empleados
  empleados = null;
  //variable de componente que recibe el id del curso para asignar desde la url
  //id_cursoSel=this.route.snapshot.paramMap.get('id');

  constructor(public authService: AuthService, public cursoServicio: CursosService,
    public actualizarService: ActualizarService, public empleadoServicio: EmpleadosService,
    public asignacionesCursosService: AsignacionesCursosService, private confirmationDialogService: ConfirmationDialogService, public toastr: ToastrService
  ) {

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
    let id_cursoSel = this.actualizarService.getSelectedId();

    //metodo que consume el servicio de empleados para listar.
    this.empleadoServicio.lista_de_alta().subscribe(result => this.empleados = result);
    this.cursoServicio.seleccionar(parseInt(id_cursoSel)).subscribe(
      result => this.curs = result[0]);

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


  //metodo que consume el servicio de asignaciones_cursos para agregar una nueva asignacion
  alta() {
    this.confirmationDialogService.confirm('¡ALERTA!', 'Esta a punto de designar a un instructor en un curso.Si lo hace este instructor no podrá ser eliminado ni removido del curso.¿Desea continuar?')
      .then((confirmed) => {

        if (confirmed) {
          //solo se pueden inscribir cursos en estado INICIADO
          if (this.curs.estado == "INICIADO") {

            this.asignacionesCursosService.alta(this.curs).subscribe(datos => {
              if (datos['resultado'] == 'OK') {
                this.toastr.success(datos['mensaje'], 'Perfecto!');
                // alert(datos['mensaje']);

                this.curs = {
                  id_curso: 0,
                  nombre: null,
                  descripcion: null,
                  portada: null,
                  imagen1: null,
                  imagen2: null,
                  imagen3: null,
                  estado: null,
                  id_empleado: null
                };
                this.empleados = null;
              } else {
                this.toastr.error(datos['mensaje'], 'Error!');

              }
            });
          } else {
            this.toastr.error("Un curso VISUAL no puede ser asignado", 'Error!');
          }

        }

      })
      .catch(() => console.log(''));





  }
}
