import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from '../../services/federados.service';
import { DatePipe } from "@angular/common";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addfederado',
  templateUrl: './addfederado.component.html',
  styleUrls: ['./addfederado.component.css']
})
export class AddfederadoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
// contraseña por defecto
result = '';
  //objeto que almacena los datos del federado para insertarlos en la bdd
  feds = {
    id: 0,
    nombre: null,
    apellido: null,
   direccion: null,
   email:null,
   password:null,
   estado:null
  }
  constructor(public authService: AuthService,public federadoServicio:FederadosService,
    public toastr: ToastrService) { 
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

    ngOnInit(){
      //metodo que genera contraseñas por defecto
     this.clave_automatica();
    }

    clave_automatica(){
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      const charactersLength = characters.length;
      for (let i = 0; i <= 8 ; i++) {
          this.result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }

      this.feds.password=this.result
    }

    //metodo que consume el servicio de federados para agregar un nuevo federado
 alta() {
  this.federadoServicio.alta(this.feds).subscribe(datos => {
  if (datos['resultado'] == 'OK') {
  
    this.toastr.success(datos['mensaje'], 'Perfecto!');
    this.generar_cuenta();
  this.feds =  {id: 0,nombre: null,apellido: null,direccion: null,email:null,password:null,estado:null
  };
  this.result = '';
  this.clave_automatica();
  }else{
    this.toastr.error(datos['mensaje'], 'Error!');
  }
  });
  }

  generar_cuenta(){
    var date = Date.now();
   
    var fileContents = "Email: "+this.feds.email+" "+" "+"\n"+"Password: "+this.feds.password;
    var filename = date+"_"+this.feds.nombre+"_"+this.feds.apellido+".txt";
    var filetype = "text/plain";
    
    var a = document.createElement("a");
    let dataURI = "data:" + filetype +
        ";base64," + btoa(fileContents);
    a.href = dataURI;
    a['download'] = filename;
    var e = document.createEvent("MouseEvents");
    // Use of deprecated function to satisfy TypeScript.
    e.initMouseEvent("click", true, false,
        document.defaultView, 0, 0, 0, 0, 0,
        false, false, false, false, 0, null);
    a.dispatchEvent(e);
  
  }

}
