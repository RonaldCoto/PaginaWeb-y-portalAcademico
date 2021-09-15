import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class Auth3Guard implements CanActivate {
  public usuario = JSON.parse(localStorage.getItem('usuario'));
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  //Protegiendo zona de federados
  canActivate(   
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeurl: string = state.url;
    return this.isLogin(routeurl);
    }
    
    isLogin(routeurl: string) {
    if (this.authService.isLoggedIn() && this.usuario.id_cate_empleado==null) {
      
        return true;
      
   
    }
    
    this.authService.redirectUrl = routeurl;
    this.router.navigate(['/login'], {queryParams: { returnUrl: routeurl }} );
    }
  
}
