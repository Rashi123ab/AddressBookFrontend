 import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.scss']
})
export class AddressBookComponent implements OnInit {
  persons: any[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadPersons();
  }

  /**
   * Load persons from localStorage and parse JSON safely
   */
  private loadPersons() {
    console.log('Checking LocalStorage:', localStorage.getItem('persons'));
    const storedPersons = localStorage.getItem('persons');

    if (storedPersons) {
      try {
        this.persons = JSON.parse(storedPersons);
        console.log('Parsed persons:', this.persons);
      } catch (error) {
        console.error('Error parsing persons from localStorage:', error);
        this.persons = []; // Fallback to empty array
      }
    } else {
      console.warn('⚠ No persons found in localStorage!');
      this.persons = [];
    }
  }

  navigateToAddPerson() {
    this.router.navigate(['/add-person']);
  }

  editPerson(person: any, index: number) {
    localStorage.setItem('editPersonIndex', JSON.stringify(index));
    localStorage.setItem('editPerson', JSON.stringify(person));
    this.navigateToAddPerson();
  }

  deletePerson(person: any) {
    console.log('Deleting person:', person);
    this.persons = this.persons.filter(p => p !== person);
    console.log('Updated persons list:', this.persons);
    localStorage.setItem('persons', JSON.stringify(this.persons));
  }
}
