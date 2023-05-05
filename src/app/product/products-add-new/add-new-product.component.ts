import { Component, OnInit } from '@angular/core';
import { Photo } from '../data/photo';
import { FormControl, Validators } from '@angular/forms';
import { PhotoService } from '../data/photo-service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit {
  constructor(private dialogRef:MatDialogRef<AddNewProductComponent>,private router: Router, private photoService: PhotoService) {}

  photo!: Photo;

  title = new FormControl('', [Validators.required]);
  url = new FormControl('', [Validators.required]);
  thumbnailURL = new FormControl('', [Validators.required]);
  albumId = new FormControl('', [Validators.required]);

  getErrorMessage(formcontrol: FormControl) {
    return formcontrol.hasError('required')
      ? 'Field is required'
      : '';
  }

  save() {
    if (
      this.title.value == '' ||
      this.url.value == '' ||
      this.thumbnailURL.value == '' ||
      this.albumId.value == ''
    ) {
      this.title.hasError('required') ? 'Please enter a valid property' : '';
      return;
    }

    if (
      this.title.value != null &&
      this.url.value != null &&
      this.thumbnailURL.value != null &&
      this.albumId.valid != null
    ) {
      this.photo.title = this.title.value;
      this.photo.url = this.url.value;
      this.photo.thumbnailUrl = this.thumbnailURL.value;
      this.photo.albumId = Number(this.albumId.value);
    }
    this.saveInDataBase(this.photo);
    this.photoService
      .addPhoto(this.photo)
      .then((photo: any) => {
        this.dialogRef.close(photo);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  saveInDataBase(photo: Photo) {
    this.photoService.savePhoto(photo).subscribe((response: any) => {
      // console.log(response);
    });
  }
  dismiss() {
    this.dialogRef.close(null);
  }
  ngOnInit(): void {
    this.photo = new Photo();
  }
}
