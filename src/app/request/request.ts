import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './request.html',
  styleUrl: './request.scss'
})
export class RequestPage {
  inputValue = '';

  onSubmit() {
    console.log('Request submitted with value:', this.inputValue);
  }
}