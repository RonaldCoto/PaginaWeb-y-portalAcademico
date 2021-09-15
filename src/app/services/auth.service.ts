import { Injectable, NgZone, EventEmitter, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";
import { User } from "../models/user.model";
import { EmpleadosService } from './empleados.service';
import { FederadosService } from './federados.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
redirectUrl: string;


baseUrl:string = "http://localhost/recursos/login";
  // arreglos que guardara la informacion de usuarios para validaciones
  empleado = null;
  federado = null;
  // modelo que almacenara la informacion del usuario ya auntenticado
  
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(
    
    public ngZone: NgZone, // Servicio NgZone para eliminar la advertencia de alcance externo
    public toastr: ToastrService,
    public router: Router,
    private empleadoservicio: EmpleadosService,
    private federadoservicio: FederadosService,
    private http: HttpClient ,private httpClient : HttpClient
  ) {

   
   }
   public userlogin(email, password) {
    //uso del recurso "login", con envio de parametros "email y password" para realizar la autenticación
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { email, password })
    .pipe(map(Users => {
  
        //validando si la cuenta de usuario usuario esta de baja
      if(Users[0].estado=="BAJA"){
        this.toastr.error("Contacte con el administrador para solucionar este problema.", 'Su cuenta ha sido dada de baja!');
       this.redirectUrl='/login';
      }else{
        this.setToken(Users[0].name);
        //establecemos que el logeo se generó con exito
        this.getLoggedInName.emit(true);
        //almacenamos información básica en arreglo userData
        let userData = {
          id_emp:Users[0].id_empleado,
          id_fed:Users[0].id_federado,
          id_cate_empleado: Users[0].id_cate_empleado ,
          nombre: Users[0].nombre,
          apellido: Users[0].apellido
        }
        //guardamos en localstorage la información básica del usuario autenticado
        localStorage.setItem('usuario', JSON.stringify(userData));
        //si el usuario es empleado se redirecciona segun su categoria de empleado
        //1=ADMINISTRADOR, 2=INSTRUCTOR
        if(Users[0].id_cate_empleado == 1 ){
          
          this.redirectUrl='/administrador';
        }else if(Users[0].id_cate_empleado==2){
          this.redirectUrl='/instructor'
        }else{
          this.redirectUrl='/dashfederado'
        }
        return Users;
      
      }
    }));
    }
  
  
  //guardado de token
  setToken(token: string) {
  localStorage.setItem('token', token);
  
  }//obtencion de token
  getToken() {
  return localStorage.getItem('token');
  }//eliminacion de token y datos básicos de usuario
  deleteToken() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  }//para saber si el usuario esta logueado o no, se revisa si existe algun token almacenado
  isLoggedIn() {
  const usertoken = this.getToken();
  if (usertoken != null) {
  return true
  }
  return false;
  }
  
}
