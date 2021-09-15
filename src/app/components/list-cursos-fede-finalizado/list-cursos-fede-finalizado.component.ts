import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from 'src/app/services/federados.service';
import { CursosService } from 'src/app/services/cursos.service';
@Component({
  selector: 'app-list-cursos-fede-finalizado',
  templateUrl: './list-cursos-fede-finalizado.component.html',
  styleUrls: ['./list-cursos-fede-finalizado.component.css']
})
export class ListCursosFedeFinalizadoComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  public cursoid = JSON.parse(localStorage.getItem('SelectedIdcursfinal'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar cursos del federado segun su ID
  fed = null;

  suma=0;
  constructor(public authService: AuthService, public federado: FederadosService, public curso: CursosService) {
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
      this.federado.lista_cursos_finalizado(parseInt(codFederado)).subscribe(result => this.fed = result);



    }

  }

  listar_notas(codigo) {

    this.curso.setSelectedIdc(codigo);

  }
}
