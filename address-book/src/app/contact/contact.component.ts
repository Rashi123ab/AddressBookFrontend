// import { Component, OnInit } from '@angular/core';
// import { ContactService } from '../services/contact.service';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.scss']
// })
// export class ContactComponent implements OnInit {
//   contacts: any[] = [];
//   newContact = { name: '', email: '', phone: '' };
//   isFormVisible: boolean = false; // Initially hidden

//   constructor(private contactService: ContactService) {}

//   ngOnInit() {
//     this.loadContacts();
//   }

//   loadContacts() {
//     this.contactService.getContacts().subscribe(
//       (data: any[]) => {
//         this.contacts = data;
//       },
//       (error) => {
//         console.error('Error fetching contacts:', error);
//       }
//     );
//   }

//   addContact() {
//     if (this.newContact.name && this.newContact.email && this.newContact.phone) {
//       this.contactService.addContact(this.newContact).subscribe(
//         (response) => {
//           console.log('Contact added successfully:', response);
//           this.loadContacts(); // Refresh the list
//           this.newContact = { name: '', email: '', phone: '' }; // Clear input fields
//           this.isFormVisible = false; // Hide form after adding
//         },
//         (error) => {
//           console.error('Error adding contact:', error);
//         }
//       );
//     } else {
//       alert('Please fill all fields!');
//     }
//   }

//   // Toggle Form
//   toggleForm() {
//     this.isFormVisible = !this.isFormVisible;
//   }
// }


// // import { Component, OnInit } from '@angular/core';
// // import { ContactService } from '../services/contact.service';

// // @Component({
// //   selector: 'app-contact-list',
// //   templateUrl: './contact-list.component.html',
// //   styleUrls: ['./contact-list.component.scss']
// // })
// // export class ContactListComponent implements OnInit {
// //   contacts: any[] = [];
// //   newContact = { name: '', email: '', phone: '' };

// //   constructor(private contactService: ContactService) {}

// //   ngOnInit() {
// //     this.loadContacts();
// //   }

// //   loadContacts() {
// //     this.contactService.getContacts().subscribe(
// //       (data: any[]) => {
// //         this.contacts = data;
// //       },
// //       (error) => {
// //         console.error('Error fetching contacts:', error);
// //       }
// //     );
// //   }

// //   addContact() {
// //     if (this.newContact.name && this.newContact.email && this.newContact.phone) {
// //       this.contactService.addContact(this.newContact).subscribe(
// //         (response) => {
// //           console.log('Contact added successfully:', response);
// //           this.loadContacts(); // Refresh the list
// //           this.newContact = { name: '', email: '', phone: '' }; // Clear input fields
// //         },
// //         (error) => {
// //           console.error('Error adding contact:', error);
// //         }
// //       );
// //     } else {
// //       alert('Please fill all fields!');
// //     }
// //   }
// // }





// // import { Component, OnInit } from '@angular/core';
// // import { ContactService } from '../services/contact.service';

// // @Component({
// //   selector: 'app-contact-list',
// //   templateUrl: './contact-list.component.html',
// //   styleUrls: ['./contact-list.component.scss'] // Ensure correct file name & extension
// // })

// // export class ContactListComponent implements OnInit {
// //   contacts: any[] = [];

// //   constructor(private contactService: ContactService) {}

// //   ngOnInit(): void {
// //     this.contactService.getContacts().subscribe(data => {
// //       this.contacts = data;
// //     });
// //   }
// // }




// import { Component, OnInit } from '@angular/core';
// import { ContactService } from '../services/contact.service';

// @Component({
//   selector: 'app-contact',
//   templateUrl: './contact.component.html',
//   styleUrls: ['./contact.component.scss']
// })
// export class ContactComponent implements OnInit {
//   contacts: any[] = [];
//   newContact = { name: '', email: '', phone: '' };
//   isFormVisible: boolean = false;

//   constructor(private contactService: ContactService) {}

//   ngOnInit() {
//     this.loadContacts();
//   }

//   // Fetch contacts from the backend
//   loadContacts() {
//     this.contactService.getContacts().subscribe({
//       next: (data: any[]) => {
//         this.contacts = data;
//         console.log('Fetched contacts:', data); 
//       },
//       error: (error) => {
//         console.error('Error fetching contacts:', error);
//       }
//     });
//   }

//   // Add a new contact to the database
//   addContact() {
//     if (!this.newContact.name || !this.newContact.email || !this.newContact.phone) {
//       alert('Please fill all fields!');
//       return;
//     }

//     this.contactService.addContact(this.newContact).subscribe({
//       next: (response) => {
//         console.log('Contact added successfully:', response);
//         this.loadContacts(); // Refresh the list
//         this.newContact = { name: '', email: '', phone: '' }; // Reset form
//         this.isFormVisible = false; // Hide form after adding
//       },
//       error: (error) => {
//         console.error('Error adding contact:', error);
//       }
//     });
//   }

//   // Delete a contact from the database
//   deleteContact(id: number) {
//     this.contactService.deleteContact(id).subscribe({
//       next: () => {
//         console.log(`Contact with ID ${id} deleted`);
//         this.contacts = this.contacts.filter(contact => contact.id !== id); // Update UI
//       },
//       error: (error) => {
//         console.error('Error deleting contact:', error);
//       }
//     });
//   }

//   // Toggle form visibility
//   toggleForm() {
//     this.isFormVisible = !this.isFormVisible;
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: any[] = [];
  newContact = { name: '', email: '', phone: '' };
  isFormVisible: boolean = false;

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    console.log("Fetching contacts...");
    this.loadContacts();
  }

  loadContacts() {
    this.contactService.getContacts().subscribe(
      (data: any[]) => {
        console.log("Contacts received from API:", data);
        this.contacts = data;
      },
      (error) => {
        console.error("Error fetching contacts:", error);
      }
    );
  }

  addContact() {
    if (this.newContact.name && this.newContact.email && this.newContact.phone) {
      this.contactService.addContact(this.newContact).subscribe(
        (response) => {
          console.log("Contact added successfully:", response);
          this.loadContacts(); // Refresh list after adding contact
          this.newContact = { name: '', email: '', phone: '' }; // Clear input fields
          this.isFormVisible = false;
        },
        (error) => {
          console.error("Error adding contact:", error);
        }
      );
    } else {
      alert("Please fill all fields!");
    }
  }

  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }
}
