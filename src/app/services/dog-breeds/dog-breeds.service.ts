import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const _BREEDS_PATH = '/breeds/list/all';

@Injectable({
  providedIn: 'root'
})
export class DogBreedsService {

  constructor(private http: HttpClient) { }

  public getAllBreeds(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + _BREEDS_PATH , { responseType: 'json' })
      .toPromise()
      .then((response: any) => {
        if (response.status === 'success') {
          resolve(response.message);
        } else {
          console.error(response);
          reject();
        }
      })
      .catch((error: HttpErrorResponse) => {
        console.error(error);
        reject();
      });
    });
  }
}
