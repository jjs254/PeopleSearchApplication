import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { PersonService } from './person.service';
import { Person } from '../person';

describe('PersonService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PersonService, { provide: 'BASE_URL' }],
      imports: [HttpClientTestingModule]
    });
  });

  it('should be created', inject([PersonService], (service: PersonService) => {
    expect(service).toBeTruthy();
  }));

  it('should get people', inject([HttpTestingController, PersonService], (httpMock: HttpTestingController, personService: PersonService) => {
    const mockPeople = [
      { firstName: 'Test', lastName: 'Test' },
      { firstName: 'Test2', lastName: 'Test2' }
    ];

    personService.getSelectedPeople('Test', false).subscribe((data) => {
      expect(data).toEqual(mockPeople);
    });
    const request = httpMock.expectOne(`${personService.baseUrl}api/PeopleData/People/Test/false`);
    request.flush(mockPeople);
    httpMock.verify();
  }));

  it('should save a person', inject([HttpTestingController, PersonService], (httpMock: HttpTestingController, personService: PersonService) => {

    personService.addPerson(new Person('','','','','',7,7,'','')).subscribe((data) => {
      expect(data).toEqual(true);
    });
    const request = httpMock.expectOne(`${personService.baseUrl}api/PeopleData/People`);
    httpMock.verify();
  }));
});
