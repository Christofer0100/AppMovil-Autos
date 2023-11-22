import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {  AUTService } from 'src/app/aut.service';


@Injectable({
  providedIn: 'root'
})
export class GuardiaGuard  {

  constructor(private router: Router, private authService:  AUTService) {}

}
