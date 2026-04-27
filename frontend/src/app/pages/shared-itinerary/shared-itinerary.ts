import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-shared-itinerary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shared-itinerary.html',
  styleUrls: ['./shared-itinerary.css'],
  encapsulation: ViewEncapsulation.None
})
export class SharedItinerary implements OnInit {
  itinerary: any = null;
  loading: boolean = true;
  error: string = '';

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.paramMap.get('token');
    if (token) {
      this.api.getSharedItinerary(token).subscribe({
        next: (data: any) => {
          this.itinerary = data;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: () => {
          this.error = 'Маршрут не найден';
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
    }
  }
}
