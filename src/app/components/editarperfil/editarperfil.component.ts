import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EmpleadosService } from '../../services/empleados.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editarperfil',
  templateUrl: './editarperfil.component.html',
  styleUrls: ['./editarperfil.component.css']
})
export class EditarperfilComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
  //objeto que almacena los datos del instructor para editarlos en la bdd
  inst = {
    id_empleado: 0,
    nombre: null,
    apellido: null,
    direccion: null,
    email: null,
    password: null,
    id_cate_empleado: 2,
    estado: "ALTA"
  }
  constructor(public authService: AuthService, public empleadoServicio: EmpleadosService, public toastr: ToastrService) {
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
    console.log(this.usuario);
    //si hay un empleado seleccionado para editar
    if (this.usuario != null) {
      //almacenamos el id del localstorage en una variable y mediante el servicio de empleado...
      //consultamos los datos del empleado que coincida con el id, estos datos se almacenan en un objeto...
      //que posteriormente se desplegará en el formulario para editar.
      let codEmpleado = this.usuario.id_emp;
      this.empleadoServicio.seleccionar(parseInt(codEmpleado)).subscribe(result => this.inst = result[0]);


    }
  }

  //metodo que consume el servicio de empleados para modificar un empleado segun el id seleccionado
  modificacion() {


    this.empleadoServicio.modificacion(this.inst).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success(datos['mensaje'], 'Perfecto!');


        this.inst = {
          id_empleado: 0, nombre: null, apellido: null, direccion: null, email: null, password: null, id_cate_empleado: 1, estado: "ALTA"
        };
      } else {
        this.toastr.error(datos['mensaje'], 'Error!');
      }
    });
  }

}
