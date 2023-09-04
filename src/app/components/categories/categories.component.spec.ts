import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from 'src/app/services/auth.service';
import { of } from 'rxjs';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  let authServiceMock: any;
  let categoriesServiceMock: any;

  beforeEach(() => {
    // Mock para AuthService
    authServiceMock = {
      getAuthenticatedUserId: jasmine.createSpy().and.returnValue('testUserId'),
    };

    // Mock para CategoriesService
    categoriesServiceMock = {
      addCategory: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      declarations: [CategoriesComponent],
      providers: [
        { provide: AngularFireAuth, useValue: {} },
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
      ],
    });

    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addCategory when onClick is called with valid input', () => {
    const nameInput = document.createElement('input');
    nameInput.value = 'Test Category';
    component.selectedColor = 'blue';

    component.onClick(nameInput);

    // Verificar que authService.getAuthenticatedUserId haya sido llamado
    expect(authServiceMock.getAuthenticatedUserId).toHaveBeenCalled();

    // Verificar que categoriesService.addCategory haya sido llamado con los valores correctos
    expect(categoriesServiceMock.addCategory).toHaveBeenCalledWith(
      'testUserId',
      'Test Category',
      'blue'
    );
  });

  
  it('should not call addCategory when onClick is called with invalid input', () => {
    const nameInput = document.createElement('input');
    nameInput.value = ''; // Nombre de categoría vacío
    component.selectedColor = 'blue';

    component.onClick(nameInput);

    // Verifica que authService.getAuthenticatedUserId haya sido llamado
    expect(authServiceMock.getAuthenticatedUserId).toHaveBeenCalled();

    // Verifica que categoriesService.addCategory no haya sido llamado
    expect(categoriesServiceMock.addCategory).not.toHaveBeenCalled();
  });
});
