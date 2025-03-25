import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

interface Person {
  name: string;
  phone: string;
  email: string;
}

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent implements OnInit {
  name: string = '';
  email: string = '';
  phone: string = '';
  editIndex: number | null = null;

  constructor(private router: Router) {}

  ngOnInit() {
    try {
      // Retrieve editing data from localStorage if available
      const editPerson = localStorage.getItem('editPerson');
      if (editPerson) {
        const person: Person = JSON.parse(editPerson);
        this.name = person.name;
        this.email = person.email;
        this.phone = person.phone;

        // Retrieve and parse edit index
        this.editIndex = JSON.parse(localStorage.getItem('editPersonIndex') || 'null');
      }
    } catch (error) {
      console.error('Error parsing stored data:', error);
    }
  }

  addPerson() {
    // Prevent adding empty fields
    if (!this.name.trim() || !this.email.trim() || !this.phone.trim()) {
      alert('All fields are required!');
      return;
    }

    const newPerson: Person = {
      name: this.name.trim(),
      phone: this.phone.trim(),
      email: this.email.trim(),
    };

    let persons: Person[] = [];
    try {
      persons = JSON.parse(localStorage.getItem('persons') || '[]');
    } catch (error) {
      console.error('Error parsing persons data:', error);
      localStorage.removeItem('persons'); // Reset corrupted data
    }

    if (this.editIndex !== null) {
      persons[this.editIndex] = newPerson; // Update existing entry
    } else {
      persons.push(newPerson); // Add new entry
    }

    // Save updated list back to localStorage
    localStorage.setItem('persons', JSON.stringify(persons));

    // Clear edit data from localStorage
    localStorage.removeItem('editPerson');
    localStorage.removeItem('editPersonIndex');

    // Navigate back to the main page
    this.router.navigate(['/']);
  }

  resetForm() {
    this.name = '';
    this.phone = '';
    this.email = '';
    this.editIndex = null; // Reset editing mode
  }
}
