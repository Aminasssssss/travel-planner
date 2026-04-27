import { Component, OnInit, ChangeDetectorRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-planner',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './planner.html',
  styleUrl: './planner.css',
  encapsulation: ViewEncapsulation.None
})
export class Planner implements OnInit {
  destinations: any[] = [];
  selectedDestination = '';
  selectedDays = 3;
  selectedBudget = 'mid';
  selectedInterests: string[] = ['nature'];
  loading = false;
  error = '';

  interests = [
    { value: 'nature', label: 'Природа' },
    { value: 'history', label: 'История' },
    { value: 'food', label: 'Еда' },
    { value: 'active', label: 'Активный' },
    { value: 'photo', label: 'Фото' },
  ];

  constructor(
    public router: Router,
    private api: ApiService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.api.getDestinations().subscribe(data => {
      this.destinations = [...data];
      if (data.length > 0) this.selectedDestination = data[0].id;
      this.cdr.detectChanges();
    });
  }

  toggleInterest(value: string) {
    if (this.selectedInterests.includes(value)) {
      this.selectedInterests = this.selectedInterests.filter(i => i !== value);
    } else {
      this.selectedInterests = [...this.selectedInterests, value];
    }
  }

  isSelected(value: string): boolean {
    return this.selectedInterests.includes(value);
  }

  generate() {
    if (!this.selectedDestination) return;
    if (this.selectedInterests.length === 0) {
      this.error = 'Выберите хотя бы один интерес';
      return;
    }
    if (!localStorage.getItem('access_token')) {
      this.router.navigate(['/login']);
      return;
    }

    this.loading = true;
    this.error = '';

    const data = {
      destination_id: Number(this.selectedDestination),
      duration_days: this.selectedDays,
      budget_level: this.selectedBudget,
      interests: this.selectedInterests
    };

    this.api.generateItinerary(data).subscribe({
      next: (result: any) => {
        this.router.navigate(['/itinerary', result.id]);
      },
      error: () => {
        this.error = 'Не удалось создать маршрут. Попробуйте ещё раз.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
}
