import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RequestService } from './request.service';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request.html',
  styleUrls: ['./request.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RequestPage {
  private readonly requestService = inject(RequestService);
  
  inputValue = signal('');
  isLoading = signal(false);
  responseMessage = signal('');
  errorMessage = signal('');

  clearError() {
    this.errorMessage.set('');
  }

  async onSubmit() {
    this.responseMessage.set('');
    this.errorMessage.set('');
    this.isLoading.set(true);

    try {
      const data = await this.requestService.submitRequest(this.inputValue());
      this.responseMessage.set(JSON.stringify(data, null, 2));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed';
      this.errorMessage.set(message);
      // Auto-dismiss error after 5 seconds
      setTimeout(() => this.errorMessage.set(''), 5000);
    } finally {
      this.isLoading.set(false);
    }
  }
}