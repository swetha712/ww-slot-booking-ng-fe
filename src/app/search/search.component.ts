import { Component, inject, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Apiservice } from '../../services/apiservice.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
  ],
})
export class SearchComponent implements OnInit {
  turfs: any[] = [];
  filteredTurfs: any[] = [];
  query: string = '';

  apiService = inject(Apiservice);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.query = params['q'] || '';
      this.fetchTurfs();
    });
  }

  fetchTurfs(): void {
    this.apiService
      .getTurfDetails()
      .pipe(
        catchError((error: any) => {
          console.error('Error fetching turfs:', error);
          return of([]);
        })
      )
      .subscribe((data) => {
        this.turfs = data;
        this.filterTurfs();
      });
  }

  filterTurfs(): void {
    this.filteredTurfs = this.turfs.filter((turf) =>
      turf.turfname.toLowerCase().includes(this.query.toLowerCase())
    );
  }
}

