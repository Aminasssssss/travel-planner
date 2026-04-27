import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './destinations.html',
  styleUrl: './destinations.css',
  encapsulation: ViewEncapsulation.None
})
export class Destinations implements OnInit {
  destinations: any[] = [];

  constructor(
    public router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.api.getDestinations().subscribe(data => {
      this.destinations = [...data];
      this.cdr.detectChanges();
    });
  }
}
