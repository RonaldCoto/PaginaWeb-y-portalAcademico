import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { EmpleadosService } from '../../services/empleados.service';
import { ActualizarService } from '../../services/actualizar.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;

  //arreglo para almacenar empleados
  empleados = null;

   //variable que almacena lo digitado en el buscador 
   texto: string;
  constructor(public authService: AuthService, public empleadoServicio: EmpleadosService,
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
    ngOnInit(): void {
      //invocando metodo para lista de empleados
      this.ListarEmpleados();

      this.empleados.snapshotChanges().subscribe(item => {
        this.empleados = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          
          this.empleados.push(x);
         
        });
     
       
      });
    }
    //metodo que consume el servicio de empleados para listar.
  ListarEmpleados() {
    
    this.empleadoServicio.listar(parseInt(this.usuario.id_emp)).subscribe(result =>{
      this.empleados = result;
    } );
    }
//metodo que consume el servicio de empleados para eliminar un empleado seleccionado
    eliminar(codigo) {
      this.confirmationDialogService.confirm('¡ALERTA!', 'Esta a punto de eliminar a un empleado, todas sus publicaciones y evaluaciones serán eliminadas. ¿Desea continuar?')
    .then((confirmed) =>{

         if (confirmed){
      this.empleadoServicio.baja(codigo).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success(datos['mensaje'], 'Perfecto!');
      this.ListarEmpleados();
      }else{
        this.toastr.error(datos['mensaje'], 'Error!');
      }
      });
      }
    })
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    
      }
      
//metodo que invoca al servicio "actualizar" donde se almacenan los id 
      editar(codigo){
        this.actualizarService.setSelectedId(codigo);
      }


}
