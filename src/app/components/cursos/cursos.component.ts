import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { CursosService } from 'src/app/services/cursos.service';
//declare const myFun: any;
@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.css']
})
export class CursosComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));

  curs = null;
  constructor(public authService: AuthService, public cursos: CursosService) {
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
  redirect() {
    if (this.usuario.id_cate_empleado == 1) {
      window.location.href = "/administrador";
    } else if (this.usuario.id_cate_empleado == 2) {
      window.location.href = "/instructor";
    } else {
      window.location.href = "/dashfederado";
    }


  }
  ngOnInit() {
    this.cursos.listar_cursos_visual().subscribe(result => this.curs = result);

  }

  //metodo que invoca al servicio "federado" donde se almacena el id del curso seleccionado por el federado
  detallecurso(codigo) {
    this.cursos.setSelectedIdCurso(codigo);
  }

}
