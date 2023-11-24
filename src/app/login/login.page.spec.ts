import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AlumnosService } from '../services/autenticacion.service';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
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
        declarations: [LoginPage],
        imports: [IonicModule.forRoot(), FormsModule],
        providers: [
          { provide: Router, useValue: mockRouter },
          { provide: AlumnosService, useValue: mockApiService },
          { provide: Storage, useValue: mockStorage }
        ]
      }).compileComponents();

      fixture = TestBed.createComponent(LoginPage);
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

    component.user = { Gmail: 'test@duoc.cl', Contrasena: 'password', nombreAlumno: 'nombre' };
    component.rememberMe = true;

    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/inicio']);
    expect(localStorage.getItem('credentials')).toBeTruthy();
  });

  it('should handle unsuccessful login', () => {
    spyOn(component.api, 'getAlumnos').and.returnValue(of([]));

    component.user = { Gmail: 'nonexistent@duoc.cl', Contrasena: 'wrongpassword', nombreAlumno: 'null' };
    component.login();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/home']);
    expect(localStorage.getItem('credentials')).toBeNull();
  });
});
