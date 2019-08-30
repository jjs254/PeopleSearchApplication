import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { HomeComponent } from './home.component';
import { PersonService } from '../services/person.service';
import { Person } from '../person';

describe('AddFormComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let person1 = new Person('Test', 'Test', 'Test', 'Test', 'Test', 3, 5, 'Test', 'Test');
  let person2 = new Person('Test2', 'Test2', 'Test2', 'Test2', 'Test2', 4, 3, 'Test2', 'Test2');
  let personArray: Person[] = [person1, person2];

  @Component({
    selector: 'person-card',
    template: ''
  })
  class PersonCardStub {
    @Input() person: Person;
    @Input() searchString: string = '';
  }

  const personService = jasmine.createSpyObj('PersonService', ['getSelectedPeople']);
  const postSpy = personService.getSelectedPeople.and.returnValue(Observable.of(personArray));

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent, PersonCardStub],
      providers: [{ provide: PersonService, useValue: personService }],
    })
   .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display a title', async(() => {
    const titleText = fixture.nativeElement.querySelector('h1').textContent;
    expect(titleText).toEqual('Search Database');
  }));

  it('should have nothing in the original search', async(() => {
    expect(fixture.componentInstance.originalSearch).toEqual('');
  }));

  it('should populate fields on first input entered', async(() => {
    fixture.componentInstance.onInputChange('T');
    expect(fixture.componentInstance.originalSearch).toEqual('T');
    expect(fixture.componentInstance.people).toEqual(personArray);
    expect(fixture.componentInstance.originalListOfPeople).toEqual(personArray);
    expect(fixture.componentInstance.originalSearch).toEqual('T');
  }));

  it('should use cached data upon more input', async(() => {
    fixture.componentInstance.onInputChange('T');
    expect(fixture.componentInstance.searchString).toEqual('T');
    expect(fixture.componentInstance.people).toEqual(personArray);
    expect(fixture.componentInstance.originalListOfPeople).toEqual(personArray);
    expect(fixture.componentInstance.originalSearch).toEqual('T');
    fixture.componentInstance.onInputChange('Test2');
    expect(fixture.componentInstance.searchString).toEqual('Test2');
    expect(fixture.componentInstance.people).toEqual(personArray.filter(m => m.firstName == 'Test2'));
    expect(fixture.componentInstance.originalListOfPeople).toEqual(personArray);
    expect(fixture.componentInstance.originalSearch).toEqual('T');
  }));

  it('should erase cached data when input is emptied', async(() => {
    fixture.componentInstance.onInputChange('T');
    expect(fixture.componentInstance.searchString).toEqual('T');
    expect(fixture.componentInstance.people).toEqual(personArray);
    expect(fixture.componentInstance.originalListOfPeople).toEqual(personArray);
    expect(fixture.componentInstance.originalSearch).toEqual('T');
    fixture.componentInstance.onInputChange('');
    expect(fixture.componentInstance.searchString).toEqual('');
    expect(fixture.componentInstance.people).toEqual([]);
    expect(fixture.componentInstance.originalListOfPeople).toEqual([]);
    expect(fixture.componentInstance.originalSearch).toEqual('');
  }))

  it('should show loader and message when wait is long', async(() => {
    fixture.componentInstance.waitingClock = 20;
    fixture.componentInstance.searching = true;
    fixture.componentInstance.isInSlowMode = true;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const loaderText = fixture.nativeElement.querySelector('p').textContent;
      expect(loaderText).toEqual('Looks like things are a bit slow. Hold tight!')
    });

  }));
});
