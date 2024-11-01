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

  // Переменные фильтров
  searchTerm: string = '';
  supplyChainOption: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.items$.subscribe(items => {
      this.items = items;
      this.applyFilters(); // Применяем фильтры при каждом обновлении списка
    });
  }

  applyFilters() {
    this.filteredItems = this.items.filter(item => {
      // Проверка поиска по имени
      const matchesName = item.textInput.toLowerCase().includes(this.searchTerm.toLowerCase());

      // Проверка фильтрации по Supply/Chain
      const matchesSupplyChain = this.supplyChainOption
        ? item.radioOption === this.supplyChainOption
        : true;

      
      return matchesName && matchesSupplyChain;
    });
  }

  onFilter(filtered: any[]) {
    this.filteredItems = filtered;
  }

  toggleFormVisibility() {
    this.dataService.toggleFormVisibility();
  }
}
