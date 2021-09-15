import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from 'src/app/services/federados.service';

@Component({
  selector: 'app-notasfederado',
  templateUrl: './notasfederado.component.html',
  styleUrls: ['./notasfederado.component.css']
})
export class NotasfederadoComponent {
  loginbtn: boolean;
  logoutbtn: boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
  nota = null;
  prom = null;
  nomb = null;
  suma = 0;
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
    

    //si hay un empleado seleccionado para editar
    if (this.usuario != null) {
      //se consume el servicio de federados, invocando el metodo que lista las publicaciones del curso...
      //que ha seleccionado el federado
      let codFederado = this.usuario.id_fed;

      this.federado.lista_cursos(parseInt(codFederado)).subscribe(result => this.nomb = result);
      this.federado.lista_notas(parseInt(codFederado)).subscribe(result => this.nota = result);
      this.federado.lista_notas(parseInt(codFederado)).subscribe(result => {
        this.prom = result

        for (var i = 0; i < this.prom.length; i++) {

          this.suma += Number(this.prom[i].promedio);
          this.suma=Number(this.suma.toFixed(2));
        }


        
      });



    }

  }

}
