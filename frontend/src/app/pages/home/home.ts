import { Component, OnInit, ChangeDetectorRef,ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class Home implements OnInit {
  destinations: any[] = [];
  popularPlaces: any[] = [];

  constructor(
    public router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.api.getDestinations().subscribe(data => {
      this.destinations = [...data.slice(0, 3)];
      this.cdr.detectChanges();
    });
    this.api.getPopularPlaces().subscribe(data => {
      this.popularPlaces = [...data.slice(0, 4)];
      this.cdr.detectChanges();
    });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access_token');
  }

  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  getDestImage(name: string): string {
    const map: any = {
      'Алматы': "url('images/intercontinental-almaty-9686284506-2x1.jpeg')",
      'Астана': "url('images/city-of-astana---aerial-view.png')",
      'Шымкент': "url('images/_gluster_2024_6_25_c3c7e417aae7196ad0a7efeb3e033de7_original.228547.JPG')"
    };
    return map[name] || '';
  }
}
