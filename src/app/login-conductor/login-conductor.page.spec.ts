import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginConductorPage } from './login-conductor.page';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlumnosService } from '../services/autenticacion.service';

describe('LoginConductorPage', () => {
  let component: LoginConductorPage;
  let fixture: ComponentFixture<LoginConductorPage>;
  let mockRouter: any;
  let mockApiService: any;
  let mockStorage: any;

  beforeEach(
    waitForAsync(() => {
      mockRouter = {
        navigate: jasmine.createSpy('navigate')
      };

      mockApiService = {
        getAlumnos: jasmine.createSpy('getAlumnos').and.returnValue(of([]))
      };

      mockStorage = {
        create: jasmine.createSpy('create').and.returnValue(Promise.resolve())
      };

      TestBed.configureTestingModule({
        declarations: [LoginConductorPage],
        imports: [IonicModule.forRoot(), FormsModule],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: AlumnosService, useValue: mockApiService },
          { provide: Storage, useValue: mockStorage }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginConductorPage);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize storage', async () => {
    await component.initStorage();
    expect(mockStorage.create).toHaveBeenCalled();
  });

  it('should redirect on successful login', () => {
    const mockAlumno = { Gmail: 'test@duoc.cl', password: 'password' };
    spyOn(component.api, 'getAlumnos').and.returnValue(of([mockAlumno]));

    component.auto = { Gmail: 'test@duoc.cl', Contrasena: 'password', nombreConductor: 'nombre' };
    component.rememberMe = true;

    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
    expect(localStorage.getItem('credentials')).toBeTruthy();
  });

  it('should handle unsuccessful login', () => {
    spyOn(component.api, 'getAlumnos').and.returnValue(of([]));

    component.auto = { Gmail: 'nonexistent@duoc.cl', Contrasena: 'wrongpassword', nombreConductor: 'null' };
    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    expect(localStorage.getItem('credentials')).toBeNull();
  });
});