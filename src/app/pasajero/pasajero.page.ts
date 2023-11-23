import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit{

  conductores: any [] = [];

  latitud: number | undefined;
  longitud: number | undefined;

  constructor(private http: HttpClient) { }

  async obtenerCoordenadas(){

    const obtenerCoordenadas = await Geolocation.getCurrentPosition()
    this.latitud=obtenerCoordenadas.coords.latitude;
    this.longitud=obtenerCoordenadas.coords.longitude;
  }

  enviarCorreo() {
    const destinatario = 'correo@destino.com';
    const asunto = 'Asunto del correo';
    const cuerpo = 'Cuerpo del correo...';

    // Genera el enlace 'mailto'
    const mailtoLink = `mailto:${destinatario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;

    // Abre el cliente de correo predeterminado del usuario
    window.location.href = mailtoLink;
  }




  ngOnInit() {
    // Realizar la solicitud HTTP para obtener la lista de conductores
    this.http.get<any[]>('http://127.0.0.1:8000/api/conductores').subscribe(
      conductores => {
        this.conductores = conductores;
      },
      error => {
        console.error('Error al obtener la lista de conductores', error);
      }
    );
  }
}