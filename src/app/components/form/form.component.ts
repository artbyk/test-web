import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup;
  options = ['Option1', 'Option2', 'Option3']; 
  
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.myForm = this.fb.group({
      textInput: ['', [Validators.required, Validators.minLength(3)]],
      numberInput: [null, [Validators.required, Validators.min(1)]],
      radioOption: ['', Validators.required],
      checkboxes: this.fb.group(
        {
          optionA: false,
          optionB: false,
        },
        { validators: Validators.required }
      ),
      selectOption: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.myForm.valid) {
      this.dataService.addItem(this.myForm.value);
      this.dataService.toggleFormVisibility();
    }
  }
}
