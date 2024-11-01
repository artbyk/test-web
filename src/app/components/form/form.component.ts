import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  myForm: FormGroup;
  options = ['My company', 'His company', 'Her company']; 
  
  constructor(private fb: FormBuilder, private dataService: DataService) {
    this.myForm = this.fb.group({
      selectOption: [this.options[0], Validators.required],
      textInput: ['', [
        Validators.required,
        Validators.minLength(3),
        this.disallowedCharactersValidator("$@!%^&*()_+=\\|/\\-.'")
      ]],
      symbol: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Za-z])[^\s]+$/),
        this.disallowedCharactersValidator("$@!%^&*()_+=\\|/\\-.'")
      ]],
      numberInput: ['', [
        Validators.required,
      ]],
      radioOption: ['', Validators.required],
      checkboxes: this.fb.group(
        {
          optionA: false
        },
        { validators: Validators.required }
      ),
    });
  }

  disallowedCharactersValidator(chars: string): ValidatorFn {
    const escapedChars = chars.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    const regex = new RegExp(`[${escapedChars}]`);
    return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) {
        return null; // Позволяем валидатору 'required' обработать пустые значения
      }
      const hasDisallowedChars = regex.test(control.value);
      return hasDisallowedChars ? { 'disallowedCharacters': { value: control.value } } : null;
    };
  }

  onSymbolInput() {
    const symbolControl = this.myForm.get('symbol');
    if (symbolControl) {
      const value = symbolControl.value;
      if (value) {
        symbolControl.setValue(value.toUpperCase(), { emitEvent: false });
      }
    }
  }

  onNumberInput() {
    const numberControl = this.myForm.get('numberInput');
    if (numberControl) {
      let value = numberControl.value;
      // Удаляем все символы, кроме цифр
      value = value.replace(/\D/g, '');
      // Преобразуем строку в число
      const numericValue = parseInt(value, 10);
      if (!isNaN(numericValue)) {
        // Форматируем число с пробелами каждые три цифры
        const formattedValue = numericValue.toLocaleString('ru-RU').replace(/,/g, ' ');
        numberControl.setValue(formattedValue, { emitEvent: false });
      } else {
        numberControl.setValue('', { emitEvent: false });
      }
    }
  }

  onSubmit() {
    if (this.myForm.valid) {
      const formData = { ...this.myForm.value };      
      // Убираем пробелы из 'numberInput' перед отправкой данных
      formData.numberInput = formData.numberInput.replace(/\s/g, '');
      this.dataService.addItem(formData);
      this.dataService.toggleFormVisibility();
    }
  }
}
