import { Injectable } from '@angular/core';
import { enviroments } from '../../enviroments';
import { HttpClient } from '@angular/common/http';
import { CreateAdminDTO } from '../../interfaces/CreateAdminDTO';
import { Observable } from 'rxjs';
import { AdminDTO } from '../../interfaces/AdminDTO';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private urlRequest = `${enviroments.baseURL}/admistradores`;
  constructor(private req: HttpClient) {}

  createAdmin(admin: CreateAdminDTO): Observable<AdminDTO> {
    return this.req.post<AdminDTO>(`${this.urlRequest}`, admin);
  }

  getAdmin(id: number): Observable<AdminDTO> {
    return this.req.get<AdminDTO>(`${this.urlRequest}/${id}`);
  }

  getAllAdmin(): Observable<AdminDTO[]> {
    return this.req.get<AdminDTO[]>(`${this.urlRequest}`);
  }

  updateAdmin(id: number, admin: Partial<AdminDTO>): Observable<AdminDTO> {
    return this.req.patch<AdminDTO>(`${this.urlRequest}/${id}`, admin);
  }

  deleteAdmin(id: number) {
    return this.req.delete(`${this.urlRequest}/${id}`);
  }
}
