import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  private items = new BehaviorSubject<any[]>([]);
  items$ = this.items.asObservable();

  private formVisible = new BehaviorSubject<boolean>(true);
  formVisible$ = this.formVisible.asObservable();

  addItem(item: any) {
    const currentItems = this.items.value;
    this.items.next([...currentItems, item]);
  }

  toggleFormVisibility() {
    this.formVisible.next(!this.formVisible.value);
  }
}
