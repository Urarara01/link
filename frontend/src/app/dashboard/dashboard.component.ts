import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ApiService, WidgetCollection } from '../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  collections: WidgetCollection[] = [];
  newCollectionName = '';
  newCollectionDesc = '';
  showCreateForm = false;

  private currentUserId = 1;
  private bannerIcons = [
    'code', 'palette', 'menu_book', 'folder_open',
    'science', 'auto_awesome', 'psychology', 'language'
  ];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadCollections();
  }

  loadCollections() {
    this.apiService.getCollectionsByUser(this.currentUserId).subscribe({
      next: (data) => {
        this.collections = data;
        if (this.collections.length === 0) {
          this.showCreateForm = true;
        }
      },
      error: (err) => console.error('Failed to load collections', err)
    });
  }

  createCollection() {
    if (!this.newCollectionName.trim()) return;

    this.apiService.createCollection({
      name: this.newCollectionName,
      description: this.newCollectionDesc,
      ownerId: this.currentUserId
    }).subscribe({
      next: (newCol) => {
        this.collections.push(newCol);
        this.newCollectionName = '';
        this.newCollectionDesc = '';
        this.showCreateForm = false;
      },
      error: (err) => console.error('Failed to create collection', err)
    });
  }

  getBannerIcon(index: number): string {
    return this.bannerIcons[index % this.bannerIcons.length];
  }
}
