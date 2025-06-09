import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatCard, MatCardContent} from "@angular/material/card";
import {NgClass, NgIf} from "@angular/common";

@Component({
  selector: 'app-offer-modal',
  standalone: true,
  imports: [
    NgIf,
    NgClass
  ],
  templateUrl: './offer-modal.component.html',
  styleUrl: './offer-modal.component.scss'
})
export class OfferModalComponent implements OnInit {
  selectedCard: number = 1; // Default selected card (Corporate Gifting)

  constructor() { }

  ngOnInit(): void {
    // Initialize component
  }

  selectCard(index: number): void {
    this.selectedCard = index;
  }
}
