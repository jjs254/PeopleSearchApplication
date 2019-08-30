import { async, ComponentFixture,  TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { AddFormComponent } from './add-form.component';
import { PersonService } from '../services/person.service';

describe('AddFormComponent', () => {
  let component: AddFormComponent;
  let fixture: ComponentFixture<AddFormComponent>;

  const personService = jasmine.createSpyObj('PersonService', ['addPerson']);
  // Make the spy return a synchronous Observable with the test data
  const postSpy = personService.addPerson.and.returnValue(Observable.of(true));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddFormComponent],
      imports: [FormsModule],
      providers: [{ provide: PersonService, useValue: personService }],
    })
   .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a title', async(() => {
    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual('Add a Person');
  }));

  it('should have a form with 9 parts', async(() => {
    const formFields = fixture.nativeElement.querySelector('form').children;
    expect(formFields.length).toEqual(9);
  }));

  it('should bind with html form', async(() => {
    fixture.componentInstance.model.firstName = 'Test'; 
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formFields = fixture.nativeElement.querySelector('form').children;
      expect(formFields[0].children[1].value).toEqual('Test');
    });
  }));

  it('should switch screens on submit', async(() => {
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const successBox = fixture.nativeElement.querySelector('p');
      expect(successBox.textContent).toEqual('Person successfully submitted.');
    });
  }));

  it('should switch to new form on button click', async(() => {
    fixture.componentInstance.onSubmit();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const successBox = fixture.nativeElement.querySelector('p');
      expect(successBox.textContent).toEqual('Person successfully submitted.');
    });
    fixture.componentInstance.nextPerson();
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const formFields = fixture.nativeElement.querySelector('form').children;
      expect(formFields.length).toEqual(9);
    });
  }))
});
