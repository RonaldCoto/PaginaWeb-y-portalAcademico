import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { HttpClient, HttpResponse } from '@angular/common/http';
import { FederadosService } from '../../services/federados.service';
import { ActualizarService } from '../../services/actualizar.service';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-administrarfederado',
  templateUrl: './administrarfederado.component.html',
  styleUrls: ['./administrarfederado.component.css']
})
export class AdministrarfederadoComponent{
  loginbtn:boolean;
  logoutbtn:boolean;
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  //variable para mostrar u ocultar el sidebar
  contentHighlighted: boolean = false;
   //arreglo para almacenar federados
   federados = null;

   //variable que almacena lo digitado en el buscador 
   texto: string;
  constructor(public authService: AuthService,public federadoServicio:FederadosService,
    public actualizarService:ActualizarService,
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
      //invocando metodo para lista de federados
      this.ListarFederados();

      this.federados.snapshotChanges().subscribe(item => {
        this.federados = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x["$key"] = element.key;
          
          this.federados.push(x);
         
        });
     
       
      });
    }
    //metodo que consume el servicio de federados para listar.
  ListarFederados() {
    this.federadoServicio.listar().subscribe(result => {
      this.federados = result;
     
    });
    }
//metodo que consume el servicio de federados para eliminar un federado seleccionado
    eliminar(codigo) {
      this.confirmationDialogService.confirm('¡ALERTA!', 'Esta a punto de eliminar un perfil de federado. ¿Desea continuar?')
      .then((confirmed) =>{
  
      if (confirmed) {
      this.federadoServicio.baja(codigo).subscribe(datos => {
      if (datos['resultado'] == 'OK') {
        this.toastr.success(datos['mensaje'], 'Perfecto!');
      this.ListarFederados();
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
