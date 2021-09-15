import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { ActualizarService } from '../../services/actualizar.service';
import { parse } from 'path';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
@Component({
  selector: 'app-admineditarcurso',
  templateUrl: './admineditarcurso.component.html',
  styleUrls: ['./admineditarcurso.component.css']
})
export class AdmineditarcursoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  
  //objeto que almacena los datos del curso para actualizarlos en la bdd
  curs = {
    id_curso: 0,
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
  
  constructor(public authService: AuthService,public cursoServicio: CursosService,
    public actualizarService: ActualizarService, public toastr: ToastrService,
    private confirmationDialogService: ConfirmationDialogService) { 
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
   
    //si hay un curso seleccionado para editar
    if(this.actualizarService.getSelectedId()!=null)
  {
   //almacenamos el id del localstorage en una variable y mediante el servicio de cursos...
    //consultamos los datos del curso que coincida con el id, estos datos se almacenan en un objeto...
    //que posteriormente se desplegará en el formulario para editar.
  
    let codCurso =  this.actualizarService.getSelectedId();
    this.cursoServicio.seleccionar(parseInt(codCurso)).subscribe(result => this.curs = result[0]);
     //una vez traidos los datos limipiamos el id del localstorage
     this.actualizarService.deleteSelectedId();
  }
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

  //metodo que se activa al hacer click en el boton "modificar"
  modificacion() {
   if(this.curs.estado == "FINALIZADO"){

    this.confirmationDialogService.confirm('¡ALERTA!', 'Esta a punto de finalizar un curso. \nUn curso FINALIZADO no será accesible para ningún instructor ni podrá ser INICIADO de nuevo. \n¿Desea continuar?')
    .then((confirmed) =>{

         if (confirmed){
         this.update();
        }
})
.catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));

}else{
  this.update();
}
    }

    //metodo que consume el servicio de cursos para modificar un curso segun el id seleccionado
    update(){
      this.cursoServicio.modificacion(this.curs).subscribe(datos => {    
        if (datos['resultado'] == 'OK') {
          this.toastr.success(datos['mensaje'], 'Perfecto!');
          this.curs = {
            id_curso: 0,
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
