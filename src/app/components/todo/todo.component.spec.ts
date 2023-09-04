import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoComponent } from './todo.component';
import { TodoService } from '../../services/todo.service';
import { CategoriesService } from '../../services/categories.service';
import { AuthService } from 'src/app/services/auth.service';
import { ElementRef } from '@angular/core';
import { of } from 'rxjs';

// Mock para el objeto global google
const googleMock = {
  maps: {
    places: {
      Autocomplete: function () {
        return {
          addListener: function (event: string, callback: () => void) {
            if (event === 'place_changed') {
              callback();
            }
          },
          getPlace: function () {
            return {
              geometry: {
                location: {
                  lat: () => 0,
                  lng: () => 0,
                },
              },
            };
          },
        };
      },
    },
  },
};

describe('TodoComponent', () => {
  let component: TodoComponent;
  let fixture: ComponentFixture<TodoComponent>;
  let todoServiceMock: any;
  let categoriesServiceMock: any;
  let authServiceMock: any;
  let elementRefMock: any;

  beforeEach(() => {
    // Mocks para los servicios y ElementRef
    todoServiceMock = {
      addTask: jasmine.createSpy(),
    };

    categoriesServiceMock = {
      getCategoriesByUserId: jasmine.createSpy().and.returnValue(of([])),
    };

    authServiceMock = {
      getAuthenticatedUserId: jasmine.createSpy().and.returnValue('testUserId'),
    };

    elementRefMock = {
      nativeElement: {},
    };

    // Declarar google como variable global
    (window as any).google = googleMock;

    TestBed.configureTestingModule({
      declarations: [TodoComponent],
      providers: [
        { provide: TodoService, useValue: todoServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: ElementRef, useValue: elementRefMock },
      ],
    });

    fixture = TestBed.createComponent(TodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addTask when onClick is called with valid input', () => {
    component.selectedCategory = 'TestCategory';
    component.selectedCategoryColor = 'blue';
    component.selectedIdCategory = 'testCategoryId';

    const nameInput = document.createElement('input');
    nameInput.value = 'Test Task';
    const descriptionInput = document.createElement('input');
    descriptionInput.value = 'Test Description';
    const dateInput = document.createElement('input');
    dateInput.value = '2023-12-31';
    const locationInput = document.createElement('input');
    locationInput.value = 'Test Location';

    component.onClick(nameInput, descriptionInput, dateInput, locationInput);

    // Verificar que authService.getAuthenticatedUserId haya sido llamado
    expect(authServiceMock.getAuthenticatedUserId).toHaveBeenCalled();

    // Verificar que categoriesService.getCategoriesByUserId haya sido llamado
    expect(categoriesServiceMock.getCategoriesByUserId).toHaveBeenCalledWith('testUserId');

    // Verificar que todoService.addTask haya sido llamado con los valores correctos
    expect(todoServiceMock.addTask).toHaveBeenCalledWith(
      'testUserId',
      'Test Task',
      'Test Description',
      '2023-12-31',
      'Test Location',
      'testCategoryId',
      'TestCategory',
      'blue'
    );
  });

  it('should NOT call addTask when onClick is called with invalid input', () => {
    // Simular que se ha seleccionado una categoría
    component.selectedCategory = '';
    component.selectedCategoryColor = '';
    component.selectedIdCategory = '';

    const nameInput = document.createElement('input');
    nameInput.value = ''; // Simular que no se ha introducido un nombre
    const descriptionInput = document.createElement('input');
    descriptionInput.value = '';
    const dateInput = document.createElement('input');
    dateInput.value = '';
    const locationInput = document.createElement('input');
    locationInput.value = '';

    component.onClick(nameInput, descriptionInput, dateInput, locationInput);

    // Verificar que authService.getAuthenticatedUserId haya sido llamado
    expect(authServiceMock.getAuthenticatedUserId).toHaveBeenCalled();

    // Verificar que categoriesService.getCategoriesByUserId haya sido llamado
    expect(categoriesServiceMock.getCategoriesByUserId).toHaveBeenCalledWith('testUserId');

    // Verificar que todoService.addTask no haya sido llamado
    expect(todoServiceMock.addTask).not.toHaveBeenCalled();
  });

  //Eliminar la variable google
  afterAll(() => {
    delete (window as any).google;
  });

});
