import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PasajeroPage } from './pasajero.page';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('PasajeroPage', () => {
  let component: PasajeroPage;
  let fixture: ComponentFixture<PasajeroPage>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [PasajeroPage],
        imports: [HttpClientTestingModule]
      }).compileComponents();

      fixture = TestBed.createComponent(PasajeroPage);
      component = fixture.componentInstance;
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

  it('should initialize conductores', () => {
    const conductores = [{ id: 1, nombre: 'Conductor 1' }, { id: 2, nombre: 'Conductor 2' }];
    spyOn(component['http'], 'get').and.returnValue(of(conductores));

    component.ngOnInit();
    expect(component.conductores).toEqual(conductores);
  });

  it('should set correoUsuario from local storage', () => {
    const fakeLocalStorage = { getItem: () => 'test@example.com' };
    spyOn(localStorage, 'getItem').and.callFake(fakeLocalStorage.getItem);

    component.ngOnInit();
    expect(component.correoUsuario).toEqual('test@example.com');
  });

  it('should generate mailtoLink correctly', () => {
    const destinatarioConductor = 'conductor@example.com';
    const destinatarioUsuario = 'usuario@example.com';

    const locationSpy = jasmine.createSpyObj('Location', ['href']);
    locationSpy.href = '';

    spyOnProperty(window, 'location', 'get').and.returnValue(locationSpy);

    component.enviarCorreo(destinatarioConductor, destinatarioUsuario);

    const expectedMailtoLink = `mailto:${destinatarioConductor},${destinatarioUsuario}?subject=Confirmar%20Reserva&body=Correo%20de%20confirmación%20reserva%20viaje.`;

    expect(locationSpy.href).toBe(expectedMailtoLink);
  });

