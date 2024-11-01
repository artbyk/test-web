import { Component } from '@angular/core';
import { DataService } from './services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  formVisible: Observable<boolean>;

  constructor(private dataService: DataService) {
    this.formVisible = this.dataService.formVisible$;
  }
}
