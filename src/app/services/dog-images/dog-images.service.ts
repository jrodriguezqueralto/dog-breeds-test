import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const _BREED_PATH = '/breed/';
const _IMAGE_PATH = '/images';

@Injectable({
  providedIn: 'root'
})
export class DogImagesService {

  constructor(private http: HttpClient) { }

  public getImages(breed: string, subbreed?: string): Promise<string[]> {
    const breedPath: string = subbreed ? breed + '/' + subbreed : breed;
    return new Promise((resolve, reject) => {
      this.http.get(environment.baseUrl + _BREED_PATH + breedPath + _IMAGE_PATH, { responseType: 'json' })
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
