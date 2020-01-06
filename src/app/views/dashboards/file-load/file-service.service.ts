import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Result} from '../dashboard1/dashboard1.component';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {

  constructor(private httpClient: HttpClient) {
  }

  postFile(fileToUpload: File): Observable<any> {
    const endpoint = 'your-destination-url';
    const formData: FormData = new FormData();
    formData.append('fileKey', fileToUpload, fileToUpload.name);
    return this.httpClient
        .post(endpoint, formData);
  }

  uploadFile(url: string, key: string, data: FormData): Observable<Result[]> {
    const options = new HttpHeaders();
    options.append('Content-Type', 'multipart/form-data');
    options.append('Accept', 'application/json');

    const httpOptions = {
      headers: options
    };

    return this.httpClient.post<Result[]>(url + key, data, httpOptions);
  }

  getResults(timestamp: string): Observable<MLResult> {
    const options = new HttpHeaders();
    options.append('Content-Type', 'multipart/form-data');
    options.append('Accept', 'application/json');

    const httpOptions = {
      headers: options
    };
    const url = 'http://localhost:8080/results?timestamp=';

   return this.httpClient.get<MLResult>(url + timestamp, httpOptions);

  }





}


export interface MLResults {
  result: MLResult[];
}


export class MLResult {
 name: string;
  outcome: string;
}
