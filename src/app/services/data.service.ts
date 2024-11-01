import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private itemsSource = new BehaviorSubject<any[]>([]);
  items$ = this.itemsSource.asObservable();

  private formVisibleSource = new BehaviorSubject<boolean>(true);
  formVisible$ = this.formVisibleSource.asObservable();

  addItem(item: any) {
    const currentItems = this.itemsSource.value;
    this.itemsSource.next([...currentItems, item]);
  }

  toggleFormVisibility() {
    const currentVisibility = this.formVisibleSource.value;
    this.formVisibleSource.next(!currentVisibility);
  }
}
