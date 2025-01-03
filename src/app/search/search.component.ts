import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  turfList: any[] = []; // Complete list of turf details
  filteredTurfs: any[] = []; // Filtered turfs based on search
  searchQuery: string = ''; // Two-way binding for search input

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.fetchTurfData();
    this.route.queryParams.subscribe((params) => {
      if (params['q']) {
        this.searchQuery = params['q'];
        this.filterTurfs(); // Apply search on initialization
      }
    });
  }

  // Fetch turf data from db.json
  private fetchTurfData(): void {
    this.http.get<any[]>('http://localhost:3000/turfs').subscribe(
      (data) => {
        this.turfList = data;
        this.filteredTurfs = data; // Initially show all turfs
      },
      (error) => {
        console.error('Error fetching turf data:', error);
      }
    );
  }

  // Filter turfs based on search query
  filterTurfs(): void {
    const query = this.searchQuery.toLowerCase();
    this.filteredTurfs = this.turfList.filter((turf) =>
      turf.turfname.toLowerCase().includes(query)
    );
  }
}

