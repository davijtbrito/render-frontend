import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './request.html',
  styleUrls: ['./request.scss']
})
export class RequestPage {
  private readonly http = inject(HttpClient);
  inputValue = '';
  isLoading = false;
  responseMessage = '';
  errorMessage = '';

  async onSubmit() {
    this.responseMessage = '';
    this.errorMessage = '';
    this.isLoading = true;

    try {
      const url = 'https://render-backend-ibu1.onrender.com/api/render-entities';
      const data = await firstValueFrom(
        this.http.post<unknown>(url, { name: this.inputValue }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
      );

      this.responseMessage = JSON.stringify(data, null, 2);
    } catch (error) {
      this.errorMessage = error instanceof Error ? error.message : 'Request failed';
    } finally {
      this.isLoading = false;
    }
  }
}