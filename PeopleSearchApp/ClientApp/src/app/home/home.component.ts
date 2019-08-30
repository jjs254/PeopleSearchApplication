import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Person } from '../person'
import { PersonService } from '../services/person.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  public originalListOfPeople: Person[];
  public people: Person[];
  public searchString: string = '';
  public originalSearch: string = '';
  public isInSlowMode: boolean = false;
  public searching: boolean = false;
  public waitingClock: number = 0;

  constructor(private personService: PersonService) {
  }

  public onInputChange(searchText: string) {
    if (searchText == '') {
      this.people = [];
      this.originalListOfPeople = [];
      this.originalSearch = '';
      this.searchString = searchText;
    }
    else if (this.originalSearch == '' || searchText.substring(0, this.originalSearch.length) != this.originalSearch) {
      this.originalSearch = searchText;
      this.searchString = searchText;
      this.startTimer();
      this.searching = true;
      this.personService.getSelectedPeople<Person>(searchText, this.isInSlowMode).subscribe(result => {
        this.people = result;
        this.originalListOfPeople = result;
        this.searching = false;
        this.stopTimer();
        this.onInputChange(this.searchString);
      }, (error) => { console.error(error); this.searching = false; })
    }
    else {
      this.people = this.originalListOfPeople.filter(m => m.firstName.toLowerCase().includes(searchText.toLowerCase())
        || m.lastName.toLowerCase().includes(searchText.toLowerCase())
        || (m.firstName + " " + m.lastName).toLowerCase().includes(searchText.toLowerCase()));
      this.searchString = searchText;
    }
  }
  public onCheckChange(checked: boolean) {
    this.isInSlowMode = checked;
  }

  private interval;

  public startTimer() {
    this.interval = setInterval(() => {
        this.waitingClock++; }, 1000)
  }

  public stopTimer() {
    clearInterval(this.interval);
    this.waitingClock = 0;
  }
}
