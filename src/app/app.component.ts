// import { HttpClient} from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { EmailJSResponseStatus } from '@emailjs/browser';
import emailjs from 'emailjs-com';
// import { EmailJSResponseStatus } from 'emailjs-com/es/models/EmailJSResponseStatus';
// import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
// import axios from 'axios';

// import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  bookingForm = this.fb.group({
      department: ['', Validators.required],
      date: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      message: ['']
    });

  isNavbarCollapsed = true; // Variable to track navbar collapse state
  @ViewChild('bookingForm') bookingFormElement?: ElementRef;

  constructor(private fb: FormBuilder) { }

  toggleNavbar(): void {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.setNavbarBlur();
  }

  closeNavbar(): void {
    this.isNavbarCollapsed = true;
    this.setNavbarBlur();
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -50;
      const yPosition = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: yPosition, behavior: 'smooth' });
      this.closeNavbar(); // Collapse the navbar after scrolling
    }
  }

  setNavbarBlur(): void {
    const navbar = document.querySelector('.navbar') as HTMLElement;
    if (this.isNavbarCollapsed) {
      navbar.classList.remove('navbar-collapsed');
    } else {
      navbar.classList.add('navbar-collapsed');
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth > 768 && !this.isNavbarCollapsed) {
      this.closeNavbar();
    }
  }


  // ngOnInit(): void {
  //   this.bookingForm = this.fb.group({
  //     department: ['international', Validators.required], // Sample value 'international'
  //     date: ['2024-07-05', Validators.required], // Sample date value
  //     name: ['John Doe', [Validators.required, Validators.minLength(3)]], // Sample name
  //     phone: ['1234567890', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Sample phone number
  //     message: [''] // Initial value for message
  //   });
  //   // emailjs.init('VW8QJSJtd3yxN2xd6')
  // }
  // isSubmitting = false;


  //   onSubmit(): void {
  //     if (this.bookingForm.valid) {
  //       const form = document.getElementById('bookingForm') as HTMLFormElement;

  //       const dateValue = this.bookingForm.get('date')?.value;
  //       const formattedDate = dateValue ? new Date(dateValue).toLocaleDateString('en-US', { 
  //   year: 'numeric', 
  //   month: 'long', 
  //   day: 'numeric' 
  // }) : '';

  //       const templateParams = {
  //         department: this.bookingForm.get('department')?.value,
  //         date: formattedDate,
  //         name: this.bookingForm.get('name')?.value,
  //         phone: this.bookingForm.get('phone')?.value,
  //         message: this.bookingForm.get('message')?.value
  //       };


  //       console.log('Sending to EmailJS:', templateParams);

  //       emailjs.sendForm(
  //         'service_nbmy7xx',
  //         'template_8zbci91',
  //         form,
  //         'VW8QJSJtd3yxN2xd6' 
  //       ).then(
  //         (result: EmailJSResponseStatus) => {
  //           console.log('Email sent successfully:', result.text);
  //           console.log('Form values:', this.bookingForm.value); 
  //           this.bookingForm.reset();
  //         },
  //         (error) => {
  //           console.error('Failed to send email:', error.text);
  //         }
  //       );
  //     } else {
  //       console.error('Form is invalid');
  //     }
  //   }
  onSubmit(): void {
    if (this.bookingForm.valid) {
      emailjs.init('x7yLWzv27FsH4EbdD');
      emailjs.send("service_g9c3ai2", "template_b494q0l", {
        name: this.bookingForm.value.name,
        department: this.bookingForm.value.department,
        phone: this.bookingForm.value.phone,
        date: this.bookingForm.value.date,
        message: this.bookingForm.value.message
      }).then(response => {
        console.log('Email sent successfully:', response.text);
        this.bookingForm.reset();
      }).catch(error => {
        console.error('Failed to send email:', error.text);
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
// onSubmit(): void {
//   if (this.bookingForm.valid) {
//     const form = document.getElementById('bookingForm') as HTMLFormElement;
//     form.submit();
//     console.log('Form submitted');
//     this.bookingForm.reset();
//   } else {
//     console.error('Form is invalid');
//   }
//   if (this.bookingForm.valid) {
//     const form = document.getElementById('bookingForm') as HTMLFormElement;

//     const dateValue = this.bookingForm.get('date')?.value;
//     const formattedDate = dateValue ? new Date(dateValue).toLocaleDateString('en-US', { 
//       year: 'numeric', 
//       month: 'long', 
//       day: 'numeric' 
//     }) : '';

//     const templateParams = {
//       department: this.bookingForm.get('department')?.value,
//       date: formattedDate,
//       name: this.bookingForm.get('name')?.value,
//       phone: this.bookingForm.get('phone')?.value,
//       message: this.bookingForm.get('message')?.value
//     };

//     console.log('Sending to FormSubmit:', templateParams);

//     const formData = new FormData();
//     formData.append('department', templateParams.department);
//     formData.append('date', templateParams.date);
//     formData.append('name', templateParams.name);
//     formData.append('phone', templateParams.phone);
//     formData.append('message', templateParams.message);

//     this.http.post('https://formsubmit.cohttps://formsubmit.co/el/confirm/e51520afda2fa06200b65b90c0de1ca7', formData, {
//       headers: new HttpHeaders({
//         'Accept': 'application/json'
//       }),
//       responseType: 'text' 
//     }).subscribe(
//       (response) => {
//         console.log('Email sent successfully:', response);
//         this.bookingForm.reset();
//       },
//       (error) => {
//         console.error('Failed to send email:', error);
//       }
//     );
//   } else {
//     console.error('Form is invalid');
//   }
// }  onSubmit(): void {
// if (this.bookingForm.valid) {
//   const form = document.getElementById('bookingForm') as HTMLFormElement;

//   const dateValue = this.bookingForm.get('date')?.value;
//   const formattedDate = dateValue ? new Date(dateValue).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   }) : '';

//   const templateParams = {
//     department: this.bookingForm.get('department')?.value,
//     date: formattedDate,
//     name: this.bookingForm.get('name')?.value,
//     phone: this.bookingForm.get('phone')?.value,
//     message: this.bookingForm.get('message')?.value
//   };

//   console.log('Sending to FormSubmit:', templateParams);

//   const formData = new FormData();
//   formData.append('department', templateParams.department);
//   formData.append('date', templateParams.date);
//   formData.append('name', templateParams.name);
//   formData.append('phone', templateParams.phone);
//   formData.append('message', templateParams.message);

//   this.http.post('https://formsubmit.co/el/yomego', formData, {
//     headers: new HttpHeaders({
//       'Accept': 'application/json'
//     })
//   }).subscribe(
//     (response) => {
//       console.log('Email sent successfully:', response);
//       this.bookingForm.reset();
//     },
//     (error) => {
//       console.error('Failed to send email:', error);
//     }
//   );
// } else {
//   console.error('Form is invalid');
// }







