import { AfterViewInit, Component, OnInit } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { MatCard, MatCardContent } from '@angular/material/card';
import { NgClass, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-offer-modal',
  standalone: true,
  imports: [NgIf, NgFor, NgClass],
  templateUrl: './offer-modal.component.html',
  styleUrl: './offer-modal.component.scss',
})
export class OfferModalComponent {
  cards = [
    {
      title: 'Web Store',
      description:
        'Built Wicket longer admire do barton vanity itself do in it.',
    },
    {
      title: 'Corporate Gifting',
      description:
        'Engrossed listening. Park gate sell they west hard for the.',
    },
    {
      title: 'App Integrations',
      description:
        'Barton vanity itself do in it. Preferd to men it engrossed listening.',
    },
    {
      title: "Let's Start Your Own",
      description:
        'We deliver outsourced aviation services for military customers',
    },
  ];
  selectedCard = 0;
  selectCard(index: number) {
    this.selectedCard = index;
  }
}
