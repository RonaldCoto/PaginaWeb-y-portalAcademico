import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../services/auth.service";
@Injectable({
  providedIn: 'root'
})
export class Auth4Guard implements CanActivate {
  constructor(
    public authService: AuthService,
    public router: Router
  ){ }
  canActivate(   
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const routeurl: string = state.url;
    return this.isLogin(routeurl);
    }
    
    isLogin(routeurl: string) {
    if (!this.authService.isLoggedIn()) {
      
        return true;
      
   
    }
    
    this.authService.redirectUrl = routeurl;
    this.router.navigate(['/index'], {queryParams: { returnUrl: routeurl }} );
    }
}
