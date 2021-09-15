//Modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import {LandingpageComponent} from '../app/components/landingpage/landingpage.component';
import {CursosComponent} from '../app/components/cursos/cursos.component';
import {GaleriaComponent} from '../app/components/galeria/galeria.component';
import {DashboardfederadoComponent} from '../app/components/dashboardfederado/dashboardfederado.component';
import {EditfederadoComponent} from '../app/components/editfederado/editfederado.component';
import { LogInComponent} from '../app/components/log-in/log-in.component';
import { AdministradorComponent } from '../app/components/administrador/administrador.component';
import { InstructorComponent } from '../app/components/instructor/instructor.component';
import {AddpublicacionComponent} from '../app/components/addpublicacion/addpublicacion.component';
import {AdministrarpubsComponent} from '../app/components/administrarpubs/administrarpubs.component';
import{EditarpublicacionComponent} from '../app/components/editarpublicacion/editarpublicacion.component';
import {ListafederadoComponent} from '../app/components/listafederado/listafederado.component';
import {EditarperfilComponent} from '../app/components/editarperfil/editarperfil.component';
import {NotasfederadoComponent} from '../app/components/notasfederado/notasfederado.component';
import {EditarperfederadoComponent} from '../app/components/editarperfederado/editarperfederado.component';
import {AddempleadoComponent} from '../app/components/addempleado/addempleado.component';
import {AddfederadoComponent} from '../app/components/addfederado/addfederado.component';
import {AdministrarfederadoComponent} from '../app/components/administrarfederado/administrarfederado.component';
import {CrearcursoComponent} from '../app/components/crearcurso/crearcurso.component';
import {AdministrarcursosComponent} from '../app/components/administrarcursos/administrarcursos.component';
import {EditarperfiladminComponent} from '../app/components/editarperfiladmin/editarperfiladmin.component';
import {AsignarcursoComponent} from '../app/components/asignarcurso/asignarcurso.component';
import {AdmineditarempleadoComponent} from '../app/components/admineditarempleado/admineditarempleado.component';
import {AdmineditarfederadoComponent} from '../app/components/admineditarfederado/admineditarfederado.component';
import {AdmineditarcursoComponent} from '../app/components/admineditarcurso/admineditarcurso.component';
import {AsignarcursoinstructorComponent} from '../app/components/asignarcursoinstructor/asignarcursoinstructor.component';
import {AddevaluacionComponent} from '../app/components/addevaluacion/addevaluacion.component';
import {AddnotaComponent} from '../app/components/addnota/addnota.component';
import {ListnotasinstructorComponent} from '../app/components/listnotasinstructor/listnotasinstructor.component';
import {AdministrarevaluacionesComponent} from '../app/components/administrarevaluaciones/administrarevaluaciones.component';
import {ListpublicacionesComponent} from '../app/components/listpublicaciones/listpublicaciones.component';
import {EditarevaluacionComponent} from '../app/components/editarevaluacion/editarevaluacion.component';
import {EditarnotaComponent} from '../app/components/editarnota/editarnota.component';
import {DetallecursoComponent} from '../app/components/detallecurso/detallecurso.component';
import {AdministrarcursosbajaComponent} from '../app/components/administrarcursosbaja/administrarcursosbaja.component';
import {AdminlistafederadoComponent} from '../app/components/adminlistafederado/adminlistafederado.component';
import {AdminlistanotasComponent} from '../app/components/adminlistanotas/adminlistanotas.component';
import{ListCursosFedeFinalizadoComponent} from '../app/components/list-cursos-fede-finalizado/list-cursos-fede-finalizado.component';
import{ListNotasFedecurfinalizadooComponent} from '../app/components/list-notas-fedecurfinalizadoo/list-notas-fedecurfinalizadoo.component';
//Guardianes 
//admin
import { AuthGuard } from "./guard/auth.guard";
//instructores
import { Auth2Guard } from "./guard/auth2.guard";
//federados
import { Auth3Guard } from "./guard/auth3.guard";
//no logueados
import { Auth4Guard } from "./guard/auth4.guard";
//logueados como instructor o federado
import { Auth5Guard } from "./guard/auth5.guard";
import { from } from 'rxjs';
const routes: Routes = [
    //patmatch para que la ruta coincida completa
    { path: '', redirectTo: '/index', pathMatch: 'full' },
    { path: 'index', component: LandingpageComponent },
    {path: 'cursos', component:CursosComponent},
    {path: 'galeria', component:GaleriaComponent},
    {path: 'dashfederado', component:DashboardfederadoComponent,canActivate:[Auth3Guard]},
    {path: 'editfede', component:EditfederadoComponent,canActivate:[Auth2Guard]},
    {path: 'cursos', component:CursosComponent },
    {path: 'detalle-cursos', component:DetallecursoComponent },
    {path: 'galeria', component:GaleriaComponent},
    {path: 'login', component:LogInComponent,canActivate:[Auth4Guard]},
    {path: 'administrador', component:AdministradorComponent,canActivate:[AuthGuard]},
    {path: 'instructor', component:InstructorComponent,canActivate:[Auth2Guard]},
    {path: 'add-publicacion', component:AddpublicacionComponent,canActivate:[Auth2Guard]},
    {path: 'add-nota', component:AddnotaComponent,canActivate:[Auth2Guard]},
    {path: 'edit-nota', component:EditarnotaComponent,canActivate:[Auth2Guard]},
    {path: 'admin-publicacion', component:AdministrarpubsComponent,canActivate:[Auth2Guard]},
    {path: 'edit-publicacion', component:EditarpublicacionComponent,canActivate:[Auth2Guard]},
    {path: 'list-federados', component:ListafederadoComponent,canActivate:[Auth2Guard]},
    {path: 'edit-perfil', component:EditarperfilComponent,canActivate:[Auth2Guard]},
    {path: 'notas-federado', component:NotasfederadoComponent,canActivate:[Auth3Guard]},
    {path: 'edit-perfil-federado', component:EditarperfederadoComponent,canActivate:[Auth3Guard]},
    {path: 'add-empleado', component:AddempleadoComponent,canActivate:[AuthGuard]},
    {path: 'add-federado', component:AddfederadoComponent,canActivate:[AuthGuard]},
    {path: 'admin-federado', component:AdministrarfederadoComponent,canActivate:[AuthGuard]},
    {path: 'crear-curso', component:CrearcursoComponent,canActivate:[AuthGuard]},
    {path: 'admin-curso', component:AdministrarcursosComponent,canActivate:[AuthGuard]},
    {path: 'admin-curso-baja', component:AdministrarcursosbajaComponent,canActivate:[AuthGuard]},
    {path: 'edit-perfil-admin', component:EditarperfiladminComponent,canActivate:[AuthGuard]},
    {path: 'asign-curso-federado', component:AsignarcursoComponent,canActivate:[AuthGuard]},
    {path: 'admin-editar-empleado', component:AdmineditarempleadoComponent,canActivate:[AuthGuard]},
    {path: 'admin-editar-federado', component:AdmineditarfederadoComponent,canActivate:[AuthGuard]},
    {path: 'admin-editar-curso', component:AdmineditarcursoComponent,canActivate:[AuthGuard]},
    {path: 'admin-lista-federados', component:AdminlistafederadoComponent,canActivate:[AuthGuard]},
    {path: 'admin-lista-notas', component:AdminlistanotasComponent,canActivate:[AuthGuard]},
    {path: 'asignar-curso-instructor', component:AsignarcursoinstructorComponent,canActivate:[AuthGuard]},
    {path: 'add-evaluacion', component:AddevaluacionComponent,canActivate:[Auth2Guard]},
    {path: 'admin-evaluacion', component:AdministrarevaluacionesComponent,canActivate:[Auth2Guard]},
    {path: 'edit-evaluacion', component:EditarevaluacionComponent,canActivate:[Auth2Guard]},
    {path: 'list-notas-instructor', component:ListnotasinstructorComponent,canActivate:[Auth2Guard]},
    //{path: 'instructor', component:InstructorComponent,canActivate:[Auth2Guard]} cuando este el login
    {path: 'publicaciones-curso', component:ListpublicacionesComponent,canActivate:[Auth3Guard]},
    {path: 'fedcursos-finalizados', component:ListCursosFedeFinalizadoComponent,canActivate:[Auth3Guard]},
    {path: 'notascursos-finalizados', component:ListNotasFedecurfinalizadooComponent,canActivate:[Auth3Guard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
