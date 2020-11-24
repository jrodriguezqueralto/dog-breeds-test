import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { DogBreedsService } from 'src/app/services/dog-breeds/dog-breeds.service';
import { DogImagesService } from 'src/app/services/dog-images/dog-images.service';

const _SNACK_DURATION = 5000;

@Component({
  selector: 'app-dog-breeds-showcase',
  templateUrl: './dog-breeds-showcase.component.html',
  styleUrls: ['./dog-breeds-showcase.component.scss']
})
export class DogBreedsShowcaseComponent implements OnInit {
  allBreeds: any;
  breeds: string[];
  subbreeds: string[];
  imageSources: string[];

  pagination = {
    page: 0,
    total: 0,
    pageSize: 1,
    pageSizes: [1, 2, 3, 5]
  };

  showcaseForm = new FormGroup({
    breedControl: new FormControl(''),
    subbreedControl: new FormControl(''),
    pageSizeControl: new FormControl(this.pagination.pageSize)
  });

  constructor(
    private breedsService: DogBreedsService,
    private imagesService: DogImagesService,
    private snackbar: MatSnackBar,
    private translate: TranslateService
    ) { }

  ngOnInit() {
    this.getAllBreeds();
  }

  getAllBreeds() {
    this.breedsService.getAllBreeds()
    .then((response: any) => {
      if (response) {
        this.allBreeds = response;
        this.breeds = Object.keys(this.allBreeds);
      }
    })
    .catch(() => {
      this.snackbar.open(
        this.translate.instant('ALL_BREEDS_REQUEST_ERROR'), null, {
        duration: _SNACK_DURATION,
        panelClass: 'error-message'
      });
    });
  }

  breedChanged() {
    const newSelection: string = this.showcaseForm.get('breedControl').value;
    if (newSelection) {
      this.subbreeds = this.allBreeds[newSelection];
      if (this.subbreeds.length === 1) {
        this.showcaseForm.get('subbreedControl').setValue(this.subbreeds[0]);
        this.getImages();
      } else {
        this.showcaseForm.get('subbreedControl').reset();
        if (this.subbreeds.length === 0) {
          this.getImages();
        } else {
          this.imageSources = [];
        }
      }
    } else {
      this.subbreeds = [];
      this.imageSources = [];
    }
  }

  subbreedChanged() {
    const newSelection: string = this.showcaseForm.get('subbreedControl').value;
    if (newSelection) {
      this.getImages();
    } else {
      this.imageSources = [];
    }
  }

  getImages() {
    this.imagesService.getImages(
      this.showcaseForm.get('breedControl').value,
      this.showcaseForm.get('subbreedControl').value)
    .then((response: string[]) => {
      this.imageSources = response;
      this.pagination = {
        page: 1,
        total: this.imageSources.length,
        pageSize: 1,
        pageSizes: [1, 2, 3, 5]
      };
    })
    .catch(() => {
      this.imageSources = [];
      this.snackbar.open(
        this.translate.instant('BREED_IMAGE_REQUEST_ERROR'), null, {
        duration: _SNACK_DURATION,
        panelClass: 'error-message'
      });
    });
  }

  pageChanged($event: number) {
    this.pagination.page = $event;
  }

  pageSizeChanged() {
    this.pagination.pageSize = this.showcaseForm.get('pageSizeControl').value;
  }
}
