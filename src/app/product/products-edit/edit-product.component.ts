import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllProductsComponent } from '../products-all/all-products.component';
import { PhotoService } from '../data/photo-service';
import { Subscribable, Subscription } from 'rxjs';
import { Photo } from '../data/photo';
import { NavigationComponent } from 'src/app/navigation/navigation.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogsComponent } from '../dialogs/dialogs.component';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss'],
})
export class EditProductComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  errorMessage: string | undefined;
  photo: Photo | undefined;
  delete:boolean=false;

  photoTmp:Photo|undefined;

  myForm!: FormGroup;

  // title = new FormControl('');
  // url = new FormControl('', [Validators.required]);
  // thumbnailURL = new FormControl('', [Validators.required]);
  // albumId = new FormControl('', [Validators.required]);


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private photoService: PhotoService
  ) {}

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  save(){
    if(this.photo==null) return;
    if(this.photo!=null){
      this.photo.title=this.myForm.controls['title'].value;
      this.photo.albumId=this.myForm.controls['albumId'].value;
      this.photo.url=this.myForm.controls['imageUrl'].value;
      this.photo.thumbnailUrl=this.myForm.controls['thumbnailUrl'].value;
    }
    if(this.photo?.title==this.photoTmp?.title&&
      this.photo?.albumId==this.photoTmp?.albumId&&
      this.photo?.url==this.photoTmp?.url&&
      this.photo?.thumbnailUrl==this.photoTmp?.thumbnailUrl){
        console.log('isti sa')
    } else{
      this.photoService.patchPhoto(this.photo.id,this.photo);
      const dialogRef = this.dialog.open(DialogsComponent, {
        data: {
          variable1: true,
          variable2: false,
          productId: this.photo.id
        }
      });

    }
  }


  dismiss(){
    if(this.photo!=null)
      this.router.navigate(['/products',this.photo.id]);
  }

  ngOnInit(): void {
    this.myForm = new FormGroup({
      title: new FormControl('', [Validators.required]),
      imageUrl:new FormControl('', [Validators.required]),
      thumbnailUrl : new FormControl('', [Validators.required]),
      albumId : new FormControl('', [Validators.required]),
    });

    this.myForm.controls['title'].enable();
    this.sub=this.route.params.subscribe(params=>{
      let id=params['id'];
      if(!id) id=1;
      this.photo=undefined;
      this.photoTmp=new Photo();
      this.sub=this.photoService.photos.subscribe(()=>{
        this.photo=this.photoService.getById(id);
        if(this.photo!=null && this.photoTmp!=null)
         this.photoTmp=Object.assign({}, this.photo)
        this.myForm.controls['title'].setValue(this.photo?.title);
        this.myForm.controls['albumId'].setValue(Number(this.photo?.albumId));
        this.myForm.controls['imageUrl'].setValue(this.photo?.url);
        this.myForm.controls['thumbnailUrl'].setValue(this.photo?.thumbnailUrl);
      })
    })
  }
}
