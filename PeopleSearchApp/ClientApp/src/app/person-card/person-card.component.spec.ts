import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { PersonCardComponent } from './person-card.component';
import { PersonService } from '../services/person.service';
import { Person } from '../person';

describe('AddFormComponent', () => {
  let component: PersonCardComponent = new PersonCardComponent();
  let person1 = new Person('Test', 'Test', 'Test', 'Test', 'Test', 3, 5, 'Test', 'Test');

  it('should bold part of the name', async(() => {
    component.person = person1;
    component.searchString = 'T';
    let returnString = component.boldSearch();
    expect(returnString).toEqual('<b>T</b>es<b>t</b> <b>T</b>es<b>t</b>')
  }));
});
