import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-pegination',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './pegination.component.html',
  styleUrl: './pegination.component.scss'
})
export class PeginationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
