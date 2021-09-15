import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from '../../services/federados.service';
import { ActualizarService } from '../../services/actualizar.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-admineditarfederado',
  templateUrl: './admineditarfederado.component.html',
  styleUrls: ['./admineditarfederado.component.css']
})
export class AdmineditarfederadoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
  //objeto que almacena los datos del federado para editarlos en la bdd
  feds = {
    id_federado: 0,
    nombre: null,
    apellido: null,
   direccion: null,
   email:null,
   password:null,
   estado:null
  }
  constructor(public authService: AuthService,public federadoServicio:FederadosService,
     public actualizarService: ActualizarService,public toastr: ToastrService) { 
    authService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.authService.isLoggedIn())
    {
  
    this.loginbtn=false;
    this.logoutbtn=true
    }
    else{
    this.loginbtn=true;
    this.logoutbtn=false
    }
  }

  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
    }
    logout()
    {
    this.authService.deleteToken();
    window.location.href = "/login";
    
    }
    ngOnInit() {
   
      //si hay un federado seleccionado para editar
      if(this.actualizarService.getSelectedId()!=null)
    {
     //almacenamos el id del localstorage en una variable y mediante el servicio de federado...
      //consultamos los datos del federado que coincida con el id, estos datos se almacenan en un objeto...
      //que posteriormente se desplegará en el formulario para editar.
      let codFederado =  this.actualizarService.getSelectedId();
      this.federadoServicio.seleccionar(parseInt(codFederado)).subscribe(result => this.feds = result[0]);
      //una vez traidos los datos limipiamos el id del localstorage
      this.actualizarService.deleteSelectedId();
    }
    }

     //metodo que consume el servicio de federados para modificar un federado segun el id seleccionado
  modificacion() {
   
    this.federadoServicio.modificacion(this.feds).subscribe(datos => {    
    if (datos['resultado'] == 'OK') {
      this.toastr.success(datos['mensaje'], 'Perfecto!');
    
    
    this.feds =  {id_federado: 0,nombre: null,apellido: null,direccion: null,email:null,password:null,estado:null
    };
    }else{
      this.toastr.error(datos['mensaje'], 'Error!');
    }
    });
    }

}
