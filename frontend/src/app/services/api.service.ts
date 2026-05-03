import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  id: number;
  username: string;
  email: string;
}

export interface WidgetCollection {
  id: number;
  name: string;
  description: string;
  ownerId: number;
}

export interface Widget {
  id: number;
  collectionId: number;
  type: string;
  timerType: string;
  expirationDate: string | null;
  isActive: boolean;
  content: any; // JSON object
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = `http://${window.location.hostname}:8080/api`;

  constructor(private http: HttpClient) { }

  // Collections
  getCollectionsByUser(userId: number): Observable<WidgetCollection[]> {
    return this.http.get<WidgetCollection[]>(`${this.apiUrl}/collections/user/${userId}`);
  }

  createCollection(collection: Partial<WidgetCollection>): Observable<WidgetCollection> {
    return this.http.post<WidgetCollection>(`${this.apiUrl}/collections`, collection);
  }

  // Widgets
  getWidgetsByCollection(collectionId: number): Observable<Widget[]> {
    return this.http.get<Widget[]>(`${this.apiUrl}/widgets/collection/${collectionId}`);
  }

  createWidget(widget: Partial<Widget>): Observable<Widget> {
    return this.http.post<Widget>(`${this.apiUrl}/widgets`, widget);
  }
}
