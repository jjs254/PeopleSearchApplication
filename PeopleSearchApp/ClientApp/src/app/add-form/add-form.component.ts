import { Component } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-addForm-component',
  templateUrl: './add-form.component.html',
  styleUrls: ['./add-form.component.css'],
})
export class AddFormComponent {

  constructor(private personService: PersonService) {
  }

  public model = new Person('', '', '', '', '', 0, 0,'', '');

  public submitted = false;

  onSubmit() {
    this.personService.addPerson(this.model).subscribe(result => {
      this.submitted = true;
    }, error => console.error(error));
  }

  nextPerson() {
    this.submitted = false;
    this.model = new Person('', '', '', '', '', 0, 0, '', '');
  }
}
