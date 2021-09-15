import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-crearcurso',
  templateUrl: './crearcurso.component.html',
  styleUrls: ['./crearcurso.component.css']
})
export class CrearcursoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
  
  //objeto que almacena los datos del curso para insertarlos en la bdd
  curs = {
    id: 0,
    nombre: null,
    descripcion: null,
   portada: null,
   imagen1:null,
   imagen2:null,
   imagen3:null,
   estado:null,
   base64textString: null,
   base64textString1: null,
   base64textString2: null,
   base64textString3: null
  }
  
  constructor(public authService: AuthService,private cursoServicio: CursosService,
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
  ngOnInit(): void {
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

 /************************ evento para subida de portada*******************************/
 seleccionarArchivo(event) {
  var files = event.target.files;
   let file = files[0];
  this.curs.portada = file.name;

  if(files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvent) {
  var binaryString = readerEvent.target.result;
  this.curs.base64textString = btoa(binaryString);
}

/************************ evento para subida de imagen 1 *******************************/
 seleccionarArchivo1(event) {
  var files = event.target.files;
   let file = files[0];
  this.curs.imagen1 = file.name;

  if(files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded1(readerEvent) {
  var binaryString = readerEvent.target.result;
  this.curs.base64textString1 = btoa(binaryString);
}

/************************ evento para subida de imagen 2 *******************************/
seleccionarArchivo2(event) {
  var files = event.target.files;
   let file = files[0];
  this.curs.imagen2 = file.name;

  if(files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded2.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded2(readerEvent) {
  var binaryString = readerEvent.target.result;
  this.curs.base64textString2 = btoa(binaryString);
}

/************************ evento para subida de imagen 3 *******************************/
seleccionarArchivo3(event) {
  var files = event.target.files;
   let file = files[0];
  this.curs.imagen3 = file.name;

  if(files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded3.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded3(readerEvent) {
  var binaryString = readerEvent.target.result;
  this.curs.base64textString3 = btoa(binaryString);
}


    //metodo que consume el servicio de cursos para agregar un nuevo curso
  alta() {
   
    this.cursoServicio.alta(this.curs).subscribe(datos => {
    if (datos['resultado'] == 'OK') {
      this.toastr.success(datos['mensaje'], 'Perfecto!');
    
    this.curs = {
      id: 0,
      nombre: null,
      descripcion: null,
     portada: null,
     imagen1:null,
     imagen2:null,
     imagen3:null,
     estado:null,
     base64textString: null,
     base64textString1: null,
     base64textString2: null,
     base64textString3: null
    }
    }else{
      this.toastr.error(datos['mensaje'], 'Error!');
    }
    });
    }


}
