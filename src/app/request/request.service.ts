import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export interface RenderEntity {
  [key: string]: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://render-backend-ibu1.onrender.com/api';

  async submitRequest(name: string): Promise<RenderEntity> {
    const url = `${this.baseUrl}/render-entities`;
    return firstValueFrom(
      this.http.post<RenderEntity>(url, { name }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    );
  }
}
