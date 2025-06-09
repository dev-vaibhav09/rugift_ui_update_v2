import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [NgFor],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

  aboutUsContents = [
    {
      title: 'About Us',
      content: `We strive to offer exceptional customer service and a
        user-friendly interface, making your shopping journey enjoyable and efficient. 
        Thank you for choosing us as your trusted online marketplace.`,
        img: '/img/about-us/access.gif'
    },
    {
      title: 'About Us',
      content: `We strive to offer exceptional customer service and a
        user-friendly interface, making your shopping journey enjoyable and efficient. 
        Thank you for choosing us as your trusted online marketplace.`,
        img: '/img/about-us/access.gif'
    },
    {
      title: 'About Us',
      content: `We strive to offer exceptional customer service and a
        user-friendly interface, making your shopping journey enjoyable and efficient. 
        Thank you for choosing us as your trusted online marketplace.`,
        img: '/img/about-us/access.gif'
    },
   
  ]

}
