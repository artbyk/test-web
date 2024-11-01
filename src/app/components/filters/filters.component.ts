import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnChanges {
  @Input() items: any[] = [];
  @Output() filter = new EventEmitter<any[]>();

  searchTerm: string = '';
  supplyChainOption: string = '';

  constructor(private dataService: DataService) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {
      this.applyFilters();
    }
  }

  applyFilters() {
    let filtered = this.items;

    if (this.searchTerm) {
      filtered = filtered.filter(item =>
        item.textInput.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
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
    }
  }
}
