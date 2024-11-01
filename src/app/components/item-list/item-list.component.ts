import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items: any[] = [];
  filteredItems: any[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.items$.subscribe(items => {
      this.items = items;
      this.filteredItems = items;
    });

    console.log(this.items);
  }

  onFilter(filteredItems: any[]) {
    this.filteredItems = filteredItems;
  }

  public toggleFormVisibility(): void {
    this.dataService.toggleFormVisibility();
  }
}
