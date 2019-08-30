import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Person } from '../person'
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonService {
  private http: HttpClient;
  public baseUrl: string;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  public getSelectedPeople<Person>(searchText: string, slowVersion: boolean): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl + 'api/PeopleData/People/' + searchText + '/' + slowVersion);
  }

  public addPerson(newPerson: Person): Observable<boolean> {
    const body = JSON.stringify(newPerson);
    const headerOptions = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<boolean>(this.baseUrl + 'api/PeopleData/People', body, { headers: headerOptions });
  }
}
