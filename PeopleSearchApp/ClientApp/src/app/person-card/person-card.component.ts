import { Component, Input } from '@angular/core';
import { Person } from '../person'

@Component({
  selector: 'person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['/person-card.component.css'],
})
export class PersonCardComponent {
  @Input() person: Person;
  @Input() searchString: string;

  constructor() {
  }

  public boldSearch() {
    return (this.person.firstName + ' ' + this.person.lastName).replace(new RegExp(this.searchString, "gi"), match => {
      return '<b>' + match + '</b>';
    });
  }
}
