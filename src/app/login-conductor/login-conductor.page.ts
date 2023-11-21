import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AUTService } from 'src/app/aut.service';
import { AlumnosService } from '../services/autenticacion.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login-conductor',
  templateUrl: './login-conductor.page.html',
  styleUrls: ['./login-conductor.page.scss'],
})
export class LoginConductorPage {

  auto = {
    Gmail: "",         
    Contrasena: ""     
  };
  rememberMe!: boolean;

  constructor(private router: Router, private authService: AUTService, private api: AlumnosService, private storage: Storage) {
    this.initStorage();
  }

  async initStorage(){
    this.storage = await this.storage.create();
    console.log('Storage esta listo');
  }

  login() {
    this.api.getConductores().subscribe(
      (conductores) => {
        if (conductores && conductores.length > 0) {
          const usuario = this.auto.Gmail.toLowerCase();
          const contrasena = this.auto.Contrasena.toLowerCase();

          const conductor = conductores.find((conductor) => conductor.Gmail.toLowerCase() === usuario || conductor.nombreConductor.toLowerCase() === usuario);

          if (conductor && conductor.Contrasena.toLowerCase() === contrasena) {
            console.log('Autenticación exitosa');

            const correoUsuario = this.auto.Gmail;

            this.redirigirSegunCorreo(correoUsuario);

            let navigationExtras: NavigationExtras = {
              state: {
                auto: this.auto,
                conductor: conductor
              }
            };

            if (this.rememberMe) {
              localStorage.setItem('credentials', JSON.stringify({ Gmail: this.auto.Gmail, Contrasena: this.auto.Contrasena }));
              console.log('Credenciales guardadas en localStorage');
            } else {
              // Si no está marcado, elimina las credenciales almacenadas
              localStorage.removeItem('credentials');
              console.log('Credenciales eliminadas de localStorage');
            }
          } else {
            console.log('Autenticación fallida: Credenciales incorrectas');
            this.router.navigate(['/login']);
          }
        } else {
          console.error('La respuesta de la API es un array vacío o nulo');
          this.router.navigate(['/login']);
        }
      },
      (error) => {
        console.error('Error al obtener datos de la API', error);
        if (error.status === 401) {
          console.log('Error de autenticación: Credenciales incorrectas');
          this.router.navigate(['/login']);
        } else {
          console.error('Otro tipo de error:', error);
          this.router.navigate(['/login']);
        }
      }
    );
  }

  private redirigirSegunCorreo(correo: string) {
    // Obtener la parte del dominio del correo electrónico
    const dominio = correo.split('@')[1];

  if (dominio === 'conductor.duoc.cl') {
      // Redirigir a una página específica para correos con dominio "profesor.duoc.cl"
      this.router.navigate(['/home']);
    }
  }

}
