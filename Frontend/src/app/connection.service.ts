
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class
    MyService {
    // private baseUrl = 'http://localhost:8080';//springBoot
    private baseUrl = 'http://127.0.0.1:8000';//python

    constructor(private http: HttpClient) { }

    getCaptions(file: any): Observable<any> {
        // console.log(file);
        const formData = new FormData();
        formData.append('file', file, file.fileName);
        return this.http.post<any>(`${this.baseUrl}/generate_captions/`, formData)
    }

}