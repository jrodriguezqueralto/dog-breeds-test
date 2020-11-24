import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DogImagesService } from './dog-images.service';
import { environment } from 'src/environments/environment';

describe('DogImagesService', () => {
  let injector: TestBed;
  let service: DogImagesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogImagesService]
    }).compileComponents();
    injector = getTestBed();
    service = injector.get(DogImagesService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should return message object', () => {
    const dummyResponse = {
      message: [
        'https://mockedUrl1',
        'https://mockedUrl2'
      ],
      status: 'success'
    };

    service.getImages('shihtzu')
    .then((response) => {
      expect(response.length).toBe(2);
      expect(response).toBe(dummyResponse.message);
    });

    const req = httpMock.expectOne(environment.baseUrl + '/breed/shihtzu/images');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should throw an error if http request fails', () => {
    spyOn(console, 'error').and.callThrough();
    service.getImages('shihtzu')
    .then(() => {
      fail();
    });

    const req = httpMock.expectOne(environment.baseUrl + '/breed/shihtzu/images');
    expect(req.request.method).toBe('GET');
    req.flush(null, {status: 500, statusText: 'Mocked error'});
  });
});
