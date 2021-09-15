import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from 'src/app/services/federados.service';

@Component({
  selector: 'app-dashboardfederado',
  templateUrl: './dashboardfederado.component.html',
  styleUrls: ['./dashboardfederado.component.css']
})
export class DashboardfederadoComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar cursos del federado segun su ID
  fed = null;

  constructor(public authService: AuthService, public federado: FederadosService) {
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
    //console.log(this.usuario);
    //si hay un empleado seleccionado para editar
    if (this.usuario != null) {
     // se consume el servicio de federados, donde se invoca el metodo que trae los cursos a los que pertenece el
     // federado actualmente logueado
      let codFederado = this.usuario.id_fed;
      this.federado.lista_cursos(parseInt(codFederado)).subscribe(result => this.fed = result);
      //una vez traidos los datos limipiamos el id del localstorage

    }

  }

  //metodo que invoca al servicio "federado" donde se almacena el id del curso seleccionado por el federado
  pubscurso(codigo) {
    this.federado.setSelectedIdCurso(codigo);
  }


}
