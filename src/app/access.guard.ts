import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  AUTService } from 'src/app/aut.service';


@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard implements CanActivate {

  constructor(private router: Router, private authService:  AUTService) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated) {
      return true; 
    } else {
      
      this.router.navigate(['/login']);
      return false; 
    }
  }
}
