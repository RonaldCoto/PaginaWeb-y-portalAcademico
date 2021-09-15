import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {

  //variables que permitiran activar o desactivar botones segun la autenticacion.
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  constructor(public authService: AuthService) { 
//verificamos si hay un usuario logueado mediante la salida de  "getLoggedInName" en el authservice
    authService.getLoggedInName.subscribe(name => this.changeName(name));
  if(this.authService.isLoggedIn())
  {
    //si hay un usuario logueado podremos deshabilitar botones con *ngIf="loginbtn" y habilitar con *ngIf="logoutbtn"
  var varuser = localStorage.getItem("usuario");
  
  this.loginbtn=false;
  this.logoutbtn=true
  }
   //si no hay un usuario logueado podremos habilitar botones con *ngIf="loginbtn" y deshabilitar con *ngIf="logoutbtn"
  else{
  this.loginbtn=true;
  this.logoutbtn=false
  }
  
  }
  
  private changeName(name: boolean): void {
  this.logoutbtn = name;
  this.loginbtn = !name;
  }
  //al hacer click en el boton "cerrar sesion"
  logout()
  {
  this.authService.deleteToken();
  window.location.href = "/login";
  
  }
  //redirecciones segun el tipo de usuario
  redirect()
  {
  if(this.usuario.id_cate_empleado == 1){
    window.location.href = "/administrador";
  }else if (this.usuario.id_cate_empleado == 2){
    window.location.href = "/instructor";
  }else{
    window.location.href = "/dashfederado";
  }
  
  
  }
  }


