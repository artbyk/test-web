import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent {
  @Input() items: any[] = [];
  @Output() filter = new EventEmitter<any[]>();

  searchTerm: string = '';
  supplyChainOption: string = '';

  constructor(private dataService: DataService) {}

  applyFilters() {
    let filtered = this.items;

    if (this.searchTerm) {
      filtered = filtered.filter(item => item.textInput.includes(this.searchTerm));
    }

    if (this.supplyChainOption) {
      filtered = filtered.filter(item => item.radioOption === this.supplyChainOption);
    }

    this.filter.emit(filtered);
  }

  duplicateItem() {
    if (this.items.length > 0) {
      const itemToDuplicate = this.items[0];
      const duplicatedItem = { ...itemToDuplicate };
      this.dataService.addItem(duplicatedItem);
      this.applyFilters();
    }
  }
}
