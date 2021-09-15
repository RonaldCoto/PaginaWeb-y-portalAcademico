import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from 'src/app/services/federados.service';
import { CursosService } from 'src/app/services/cursos.service';
@Component({
  selector: 'app-list-notas-fedecurfinalizadoo',
  templateUrl: './list-notas-fedecurfinalizadoo.component.html',
  styleUrls: ['./list-notas-fedecurfinalizadoo.component.css']
})
export class ListNotasFedecurfinalizadooComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  public cursoid = JSON.parse(localStorage.getItem('SelectedIdcursfinal'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar cursos del federado segun su ID
  nota = null;

  suma = 0;
  nombre = null;
  cursoname = null;
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

      //metodo que consume el servicio de notas para listar las evaluaciones y su nota segun el federado y curso seleccioado
      this.federado.lista_notas_cursofinalizado(parseInt(codFederado), parseInt(this.cursoid)).subscribe(result2 => {
        this.nota = result2
        this.nota.forEach(element => {
          this.suma += parseFloat(element.promedio);
          this.suma = Number(this.suma.toFixed(2));
        });

      }
      );

      this.federado.lista_notas_cursofinalizado(parseInt(codFederado), parseInt(this.cursoid)).subscribe(result => {
        this.nombre = result

        for (var i = 0; i < this.nombre.length; i++) {
          this.cursoname = this.nombre[0].nombre;
        }



      });

    }

  }


}
