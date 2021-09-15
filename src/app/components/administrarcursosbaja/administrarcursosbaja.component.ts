
import { Component, OnInit } from '@angular/core';
import { CursosService } from '../../services/cursos.service';
import { ActualizarService } from '../../services/actualizar.service';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-administrarcursosbaja',
  templateUrl: './administrarcursosbaja.component.html',
  styleUrls: ['./administrarcursosbaja.component.css']
})
export class AdministrarcursosbajaComponent implements OnInit {
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar cursos
  cursos = null;
  //variable que almacena lo digitado en el buscador 
  texto: string;
  constructor(public authService: AuthService,private cursoServicio: CursosService,
    private router:Router,
    private actualizarService: ActualizarService,
    public toastr: ToastrService,
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
  
    ngOnInit(): void {
     
      //invocando metodo para lista de cursos
      this.ListarCursos();
      this.cursos.snapshotChanges().subscribe(item => {
        this.cursos = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          
          this.cursos.push(x);
         
        });
     
       
      });
    }
  //metodo que consume el servicio de cursos para listar.
    ListarCursos() {
      this.cursoServicio.listar_finalizado().subscribe(result => this.cursos = result);
    
      }
  //metodo que consume el servicio de cursos para eliminar un curso seleccionado
  eliminar(codigo) {
    this.confirmationDialogService.confirm('¡ALERTA!', 'Esta a punto de eliminar un curso. Si continua se eliminarán todas las publicaciones, notas y evaluaciones realizadas. ¿Desea continuar?')
    .then((confirmed) =>{


    if (confirmed) {
    this.cursoServicio.baja(codigo).subscribe(datos => {
    if (datos['resultado'] == 'OK') {
      this.toastr.success(datos['mensaje'], 'Perfecto!');
    this.ListarCursos();
    }else{
      this.toastr.error(datos['mensaje'], 'Error!');
    }
    });
    }
  })
  .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  
    }
  //metodo que invoca al servicio "actualizar" donde se almacenan los id 
        listar_federados(codigo){
          
          this.actualizarService.setSelectedIdc(codigo);
         
        }
       

}
