import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DogBreedsService } from './dog-breeds.service';
import { environment } from 'src/environments/environment';

describe('DogBreedsService', () => {
  let injector: TestBed;
  let service: DogBreedsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DogBreedsService]
    }).compileComponents();
    injector = getTestBed();
    service = injector.get(DogBreedsService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should return message object', () => {
    const dummyResponse = {
      message: {
        shihtzu: [],
        beagle: []
      },
      status: 'success'
    };

    service.getAllBreeds()
    .then((response) => {
      expect(Object.keys(response).length).toBe(2);
      expect(response).toBe(dummyResponse.message);
    });

    const req = httpMock.expectOne(environment.baseUrl + '/breeds/list/all');
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should throw an error if http request fails', () => {
    spyOn(console, 'error').and.callThrough();
    service.getAllBreeds()
    .then(() => {
      fail();
    });

    const req = httpMock.expectOne(environment.baseUrl + '/breeds/list/all');
    expect(req.request.method).toBe('GET');
    req.flush(null, {status: 500, statusText: 'Mocked error'});
  });
});
