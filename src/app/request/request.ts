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
  private responseTimeoutId?: ReturnType<typeof setTimeout>;
  private errorTimeoutId?: ReturnType<typeof setTimeout>;
  
  inputValue = signal('');
  isLoading = signal(false);
  responseMessage = signal('');
  errorMessage = signal('');

  clearError() {
    if (this.errorTimeoutId) {
      clearTimeout(this.errorTimeoutId);
      this.errorTimeoutId = undefined;
    }
    this.errorMessage.set('');
  }

  clearResponse() {
    if (this.responseTimeoutId) {
      clearTimeout(this.responseTimeoutId);
      this.responseTimeoutId = undefined;
    }
    this.responseMessage.set('');
  }

  async onSubmit() {   
    this.clearResponse();
    this.clearError();
    this.isLoading.set(true);

    try {
      const data = await this.requestService.submitRequest(this.inputValue());
      this.responseMessage.set(JSON.stringify(data, null, 2));
      this.responseTimeoutId = setTimeout(() => {
        this.responseMessage.set('');
        this.responseTimeoutId = undefined;
      }, 2000);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Request failed';
      this.errorMessage.set(message);
      this.errorTimeoutId = setTimeout(() => {
        this.errorMessage.set('');
        this.errorTimeoutId = undefined;
      }, 5000);
    } finally {
      this.isLoading.set(false);
    }
  }
}