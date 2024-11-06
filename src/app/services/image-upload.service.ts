import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageUploadService {

    private apiUrl = 'api/yolo/detect'; // Correct URL


  constructor(private http: HttpClient) { }

  uploadImage(image: Blob): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, 'photo.jpg');

    const headers = new HttpHeaders();
    headers.append('Accept', 'application/json');

    return this.http.post<any>(this.apiUrl, formData, { headers });
  }
}
