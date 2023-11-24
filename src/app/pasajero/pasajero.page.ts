import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Component({
  selector: 'app-pasajero',
  templateUrl: './pasajero.page.html',
  styleUrls: ['./pasajero.page.scss'],
})
export class PasajeroPage implements OnInit {

  conductores: any[] = [];

  correoUsuario = localStorage.getItem('credentials') || '';

  latitud: number | undefined;
  longitud: number | undefined;

  constructor(private http: HttpClient) { }

  async enviarCorreo(destinatarioConductor: string, destinatarioUsuario: string) {
    console.log(destinatarioConductor);
    console.log(destinatarioUsuario);
    const asunto = 'Confirmar Reserva';
    
    const obtenerCoordenadas = await Geolocation.getCurrentPosition();
    const latitud = obtenerCoordenadas.coords.latitude;
    const longitud = obtenerCoordenadas.coords.longitude;
  
    // Construye el cuerpo del mensaje con saltos de línea
    const cuerpo = `Correo de confirmación reserva viaje. Dirección Pasajero: ${latitud}, ${longitud}`;
  
    // Genera el enlace 'mailto' con el destinatario específico
    const mailtoLink = `mailto:${destinatarioConductor},${destinatarioUsuario}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
  
    // Abre el cliente de correo predeterminado del usuario
    window.location.href = mailtoLink;
  }


  async obtenerCoordenadas() {
    const obtenerCoordenadas = await Geolocation.getCurrentPosition()
    this.latitud = obtenerCoordenadas.coords.latitude;
    this.longitud = obtenerCoordenadas.coords.longitude;
  }

  ngOnInit() {
    // Realizar la solicitud HTTP para obtener la lista de conductores
    this.http.get<any[]>('https://9wt8hjgn-8000.brs.devtunnels.ms/api/conductores').subscribe(
      conductores => {
        this.conductores = conductores;
      },
      error => {
        console.error('Error al obtener la lista de conductores', error);
      }
    );
  }
}