import { TestBed } from '@angular/core/testing';
import { CategoriesService } from './categories.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { of } from 'rxjs';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let firestoreMock: any;
  let afAuthMock: any;

  beforeEach(() => {
    //  mock para AngularFirestore
    firestoreMock = jasmine.createSpyObj('AngularFirestore', ['collection']);

    // mock para AngularFireAuth
    afAuthMock = jasmine.createSpyObj('AngularFireAuth', ['auth']);

    TestBed.configureTestingModule({
      providers: [
        CategoriesService,
        { provide: AngularFirestore, useValue: firestoreMock },
        { provide: AngularFireAuth, useValue: afAuthMock },
      ],
    });

    service = TestBed.inject(CategoriesService);
  });

  //TEST 1 PASÓ
  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  

});
