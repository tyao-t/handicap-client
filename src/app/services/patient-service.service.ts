import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patient } from '../models/patient.model';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PatientServiceService {

    constructor(private http: HttpClient) { }

    getAll(): Observable<any> {
        return this.http.get<any>(baseUrl);
    }

    create(data: any): Observable<any> {
        return this.http.post(baseUrl, data);
    }
}
