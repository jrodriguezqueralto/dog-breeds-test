import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { ListFilterPipe } from 'src/app/components/pipes/list-filter.pipe';
import { DogBreedsService } from 'src/app/services/dog-breeds/dog-breeds.service';
import { DogImagesService } from 'src/app/services/dog-images/dog-images.service';

import { DogBreedsShowcaseComponent } from './dog-breeds-showcase.component';

describe('DogBreedsShowcaseComponent', () => {
  let component: DogBreedsShowcaseComponent;
  let fixture: ComponentFixture<DogBreedsShowcaseComponent>;
  const dogBreedsServiceStud: DogBreedsService = new DogBreedsService(null);
  const dogImagesServiceStud: DogImagesService = new DogImagesService(null);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DogBreedsShowcaseComponent, ListFilterPipe ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [
        TranslateModule.forRoot(),
        ReactiveFormsModule,
        NgxPaginationModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        MatSnackBarModule
      ],
      providers: [
        { provide: DogBreedsService, useValue: dogBreedsServiceStud },
        { provide: DogImagesService, useValue: dogImagesServiceStud }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    spyOn(dogBreedsServiceStud, 'getAllBreeds').and.returnValue(new Promise((resolve) => {
      resolve({
        shihtzu: [],
        beagle: []
      });
    }));
    fixture = TestBed.createComponent(DogBreedsShowcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call getImages when breed changed if there are no subbreeds', () => {
    spyOn(dogImagesServiceStud, 'getImages').and.returnValue(new Promise((resolve) => {
      resolve([
        'https://mockedUrl',
      ]);
    }));
    component.allBreeds = {
      shihtzu: [],
      beagle: []
    };
    component.showcaseForm.get('breedControl').setValue('shihtzu');
    component.breedChanged();
    expect(dogImagesServiceStud.getImages).toHaveBeenCalled();
  });

  it('should call getImages when breed changed if there are is only one subbreed to be selected', () => {
    spyOn(dogImagesServiceStud, 'getImages').and.returnValue(new Promise((resolve) => {
      resolve([
        'https://mockedUrl',
      ]);
    }));
    component.allBreeds = {
      shihtzu: ['subbreed'],
      beagle: []
    };
    component.showcaseForm.get('breedControl').setValue('shihtzu');
    component.breedChanged();
    expect(dogImagesServiceStud.getImages).toHaveBeenCalled();
  });

  it('should not call getImages when breed changed if there are multiple subbreeds to be selected', () => {
    spyOn(dogImagesServiceStud, 'getImages').and.returnValue(new Promise((resolve) => {
      resolve([
        'https://mockedUrl',
      ]);
    }));
    component.allBreeds = {
      shihtzu: ['subbreed1', 'subreed2'],
      beagle: []
    };
    component.showcaseForm.get('breedControl').setValue('shihtzu');
    component.breedChanged();
    expect(dogImagesServiceStud.getImages).not.toHaveBeenCalled();
  });

  it('should call getImages when subbreed changed', () => {
    spyOn(dogImagesServiceStud, 'getImages').and.returnValue(new Promise((resolve) => {
      resolve([
        'https://mockedUrl',
      ]);
    }));
    component.showcaseForm.get('subbreedControl').setValue('subbreed');
    component.subbreedChanged();
    expect(dogImagesServiceStud.getImages).toHaveBeenCalled();
  });

  it('should not call getImages when empty value for subbreed is selected', () => {
    spyOn(dogImagesServiceStud, 'getImages');
    component.showcaseForm.get('subbreedControl').setValue('');
    component.subbreedChanged();
    expect(dogImagesServiceStud.getImages).not.toHaveBeenCalled();
  });
});
