import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot
} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}




  canActivate(route: ActivatedRouteSnapshot): boolean {
            // this will be passed from the route config
            // on the data property

            if (JSON.parse(localStorage.getItem("role")) === 'admin') {
              return true;
            } else {
              this.router.navigate(['/login']);
              return false;
            }

              }
  
}
