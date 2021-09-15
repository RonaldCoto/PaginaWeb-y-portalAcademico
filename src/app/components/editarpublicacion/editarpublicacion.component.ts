import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { NullTemplateVisitor } from '@angular/compiler';
import { ActualizarService } from '../../services/actualizar.service';
import { PublicacionesService } from '../../services/publicaciones.service';
import { AsignacionesCursosService } from 'src/app/services/asignaciones-cursos.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-editarpublicacion',
  templateUrl: './editarpublicacion.component.html',
  styleUrls: ['./editarpublicacion.component.css']
})
export class EditarpublicacionComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //objeto que almacena los datos del curso para actualizarlos en la bdd
  pub = {
    id_publicacion: 0,
    titulo: null,
    descripcion: null,
    archivo: null,
    extension: null,
    fecha_publicacion: null,
    id_asignacion_curso: null,
    base64textString: null
  }
  //arreglo que almacena los cursos para el select
  curs = null;
  constructor(public authService: AuthService, public asignacionesCursosService: AsignacionesCursosService,
     public actualizarService: ActualizarService,
    public publicacionesService: PublicacionesService,  public toastr: ToastrService) { 
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
   
      //si hay una publicacion seleccionada para editar
      if(this.actualizarService.getSelectedId()!=null)
    {
     //almacenamos el id del localstorage en una variable y mediante el servicio de publicaciones...
      //consultamos los datos de la publicacion que coincida con el id, estos datos se almacenan en un objeto...
      //que posteriormente se desplegará en el formulario para editar.
      let codPub =  this.actualizarService.getSelectedId();
      this.publicacionesService.seleccionar(parseInt(codPub)).subscribe(result => this.pub = result[0]);
      
      let codInstructor = this.usuario.id_emp;
      //se consume el servicio de asignacionesCursos para listar los cursos en los que un...
      // instructor logueado puede publicar
      this.asignacionesCursosService.lista_cursos_select(parseInt(codInstructor)).subscribe(result => this.curs = result);
       //una vez traidos los datos limipiamos el id del localstorage
       this.actualizarService.deleteSelectedId();
    }
    }

    //evento para subida de portada
 seleccionarArchivo(event) {
  var files = event.target.files;
   let file = files[0];
  this.pub.archivo = file.name;

  if(files && file) {
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded(readerEvent) {
  var binaryString = readerEvent.target.result;
  this.pub.base64textString = btoa(binaryString);
}


  //metodo que consume el servicio de publicaciones para modificar una publicacion segun el id seleccionado
  modificacion() {
  
    this.publicacionesService.modificacion(this.pub).subscribe(datos => {    
    if (datos['resultado'] == 'OK') {
   
    
      this.toastr.success(datos['mensaje'], 'Perfecto!');
      this.pub = {  id_publicacion: 0,
        titulo: null,
        descripcion: null,
        archivo: null,
        extension: null,
        fecha_publicacion: null,
        id_asignacion_curso: null,
        base64textString: null};
    }else{
      this.toastr.error(datos['mensaje'], 'Error!');
    }
    });
    }

}
